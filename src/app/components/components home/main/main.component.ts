import { Component, OnInit, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Result, RootObject } from 'src/app/model/Filmes';
import { TmdbApiService } from '../../../service/tmdb-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  filmes$?: Observable<Result[]>;
  quantidadepaginas?: Observable<number>;
  offset?: number;
  root$?: Observable<RootObject>;
  total_pages?: number;
  paginaAtual?: number;
  @Input() filtros: string[] = [];

  constructor(public tmdbapiService: TmdbApiService) {
    this.tmdbapiService.currentFilmes$.subscribe(
      (filmes) => (this.filmes$ = filmes)
    );
    this.tmdbapiService.currentRoot$.subscribe((root) => (this.root$ = root));

    this.tmdbapiService.quantidadepaginas.subscribe(
      (quantidade) => (this.quantidadepaginas = quantidade)
    );
  }

  ngOnInit(): void {
    // this.quantiPaginas();
  }

  nextPage(): void {
    this.tmdbapiService.setPaginas(this.tmdbapiService.getPaginas() + 1);
    this.paginaAtual = this.tmdbapiService.getPaginas();
    this.tmdbapiService.getFiltros();
    this.tmdbapiService.getPopulares(this.tmdbapiService.contentFiltros);
    this.tmdbapiService.currentFilmes$.subscribe(
      (filmes) => (this.filmes$ = filmes)
    );
  }

  forIn(number: number | null) {
    let minValue = number;
    if (minValue === null) {
      minValue = 1;
      return Array(minValue);
    }
    if (minValue > 9) {
      minValue = 9;
    }
    return Array(minValue);
  }

  changePage(page: number): void {
    this.tmdbapiService.setPaginas(page);
    this.paginaAtual = this.tmdbapiService.getPaginas();
    this.tmdbapiService.getFiltros();
    this.tmdbapiService.getPopulares(this.tmdbapiService.contentFiltros);
    this.tmdbapiService.currentFilmes$.subscribe(
      (filmes) => (this.filmes$ = filmes)
    );
  }

  previousPage(): void {
    this.tmdbapiService.setPaginas(
      this.tmdbapiService.getPaginas() > 1
        ? this.tmdbapiService.getPaginas() - 1
        : 1
    );
    this.paginaAtual = this.tmdbapiService.getPaginas();
    this.tmdbapiService.getFiltros();
    this.tmdbapiService.getPopulares(this.tmdbapiService.contentFiltros);
    this.tmdbapiService.currentFilmes$.subscribe(
      (filmes) => (this.filmes$ = filmes)
    );
  }
}
