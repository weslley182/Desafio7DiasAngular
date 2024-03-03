import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule  } from '@angular/material/form-field';
import { MatInputModule  } from '@angular/material/input';
import { MatPaginatorModule   } from '@angular/material/paginator';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { FilmesComponent } from './pages/filmes/filmes.component';
import { NaveComponent } from './pages/nave/nave.component';
import { BaseLayoutComponent } from './components/base-layout/base-layout.component';
import { FormsModule } from '@angular/forms';
import { NavesComponent } from './pages/naves/naves.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'filmes', component: FilmesComponent },
  { path: 'nave', component: NaveComponent },
  { path: 'naves', component: NavesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' } // redireciona para Home se nenhum caminho for especificado
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FilmesComponent,
    NaveComponent,
    BaseLayoutComponent,
    NavesComponent
  ],
  imports: [
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
