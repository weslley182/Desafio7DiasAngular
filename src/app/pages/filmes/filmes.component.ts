import { Component, OnInit } from '@angular/core';
import { Film } from '../../models/Film.model';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.css'
})

export class FilmesComponent implements OnInit{
  displayedColumns: string[] = ['title', 'director', 'release_date']; // Colunas para exibir
  dataSource: Film[] = [];

  constructor(private filmsService: FilmsService) { }

  isLoading = true;

  ngOnInit() {
    this.filmsService.getFilms().subscribe(apiReturn  => {
      this.dataSource = apiReturn.results;
      this.isLoading = false;
    });
  }

}
