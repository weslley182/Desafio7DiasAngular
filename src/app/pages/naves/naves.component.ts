import { Component, OnInit } from '@angular/core';
import { Starship } from '../../models/starships.model';
import { StarshipsService } from '../../services/starships.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-naves',
  templateUrl: './naves.component.html',
  styleUrl: './naves.component.css'
})
export class NavesComponent implements OnInit {

  resultStarShips: Starship[] = [];

  colunas: string[] = ['name', 'model', 'manufacturer', 'hyperdrive_rating'];
  showSpinner = false;

  totalStarships!: number;
  paginaAtual = 1;

  detailsStarships: Starship[] = [];

  constructor(private swapiService: StarshipsService) {}
  ngOnInit(){
    this.getStarShips();
  }

  getStarShips(page = 1) {
    this.showSpinner = true;
    this.swapiService.getStarShips(page).subscribe((res) => {
      this.totalStarships = res.count;
      console.log(this.totalStarships);

      this.resultStarShips = res.results;
      this.showSpinner = false;
    });
  }
  
  changePagination(e: PageEvent){
    this.paginaAtual = e.pageIndex + 1;
    this.getStarShips(this.paginaAtual);
  }

  clickedRow(row: Starship){
    if(this.detailsStarships){
      this.detailsStarships = [];
      this.detailsStarships.push(row);
      console.log(row);
    }
  }
}
