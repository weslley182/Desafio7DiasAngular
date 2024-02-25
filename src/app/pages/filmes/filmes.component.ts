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
  searchTerm: string = '';
  
  constructor(private filmsService: FilmsService) { }

  isLoading = true;

  ngOnInit() {
    this.loadFilms();
  }

  loadFilms() {
    this.isLoading = true;
    this.filmsService.getFilms(this.searchTerm).subscribe(apiReturn => {
      this.dataSource = apiReturn.results;
      this.isLoading = false;
    });
  }

  searchFilms() {
    this.loadFilms(); // Reutiliza a lógica de carregamento com o termo de busca atual
  }

}
