import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CardMovieProps, Result } from 'src/app/model/Filmes';
import { TmdbApiService } from '../service/tmdb-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  filmes$?: Observable<Result[]>;
  @Input() filtros: string[] = [];

  constructor(public tmdbapiService: TmdbApiService) {
    this.tmdbapiService.getPopulares([...this.filtros]);
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
}
