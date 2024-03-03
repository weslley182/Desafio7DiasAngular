import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Starship } from '../../models/starships.model';
import { StarshipsService } from '../../services/starships.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-nave',
  templateUrl: './nave.component.html',
  styleUrl: './nave.component.css'
})

export class NaveComponent implements OnInit, AfterViewInit  {
  displayedColumns: string[] = ['name', 'model', 'starship_class', 'manufacturer'];  
  dataSource = new MatTableDataSource<Starship>([]); // Inicialize com um array vazio ou seus dados
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  isLoading = true;
  searchTerm: string = '';
  pageSize = 10; // Definir o tamanho da página
  currentPage = 1; // Definir a página atual
  totalDeNaves!: number;

  constructor(private starshipsService: StarshipsService) { }

  ngOnInit() {
    this.loadStarships();
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(
      tap(() => this.loadStarships(this.paginator.pageIndex + 1))
    ).subscribe();
  }
  

  loadPage(): void {
    if (this.paginator) {
      this.loadStarships(this.paginator.pageIndex + 1);
    }
  }
  

  loadStarships(page: number = this.currentPage): void {
    this.isLoading = true;
    this.starshipsService.getStarships2(this.searchTerm, page)
      .subscribe(apiResponse => {
        this.dataSource.data = apiResponse.results;
        this.totalDeNaves = apiResponse.count; // Definindo o total de naves
        this.paginator.length = this.totalDeNaves;        
        this.isLoading = false;
      });
  }

  searchStarships() {
    this.currentPage = 1; // Reset para a primeira página
    this.loadStarships();
  }
}