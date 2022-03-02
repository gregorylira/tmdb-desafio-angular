import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Result, RootObject } from 'src/app/model/Filmes';
import { TmdbApiService } from '../../../service/tmdb-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  filmes$?: Observable<Result[]>;
  quantidadepaginas?: number;
  offset?: number;
  root$?: Observable<RootObject>;
  @Input() filtros: string[] = [];

  constructor(public tmdbapiService: TmdbApiService) {
    this.tmdbapiService.currentFilmes$.subscribe(
      (filmes) => (this.filmes$ = filmes)
    );
  }

  ngOnInit(): void {}

  nextPage(): void {
    this.tmdbapiService.setPaginas(this.tmdbapiService.getPaginas() + 1);
    this.tmdbapiService.getPopulares([]);
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
    this.tmdbapiService.getPopulares([]);
    this.tmdbapiService.currentFilmes$.subscribe(
      (filmes) => (this.filmes$ = filmes)
    );
  }

  setOffset = (offset: number) => {
    this.offset = offset;
    if (offset) {
      this.tmdbapiService.setPaginas(offset / 10);
    } else {
      this.tmdbapiService.setPaginas(1);
    }
    // console.log(offset);
  };
}
