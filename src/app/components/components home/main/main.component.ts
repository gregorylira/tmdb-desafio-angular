import { Component, OnInit, Input } from '@angular/core';
import { root } from 'cheerio/lib/static';
import { Observable } from 'rxjs';
import { CardMovieProps, Result, RootObject } from 'src/app/model/Filmes';
import { TmdbApiService } from '../../../service/tmdb-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  filmes$?: Observable<Result[]>;
  quantidadepaginas: number = 0;
  offset?: number;
  root$?: Observable<RootObject>;
  @Input() filtros: string[] = [];

  constructor(public tmdbapiService: TmdbApiService) {
    this.tmdbapiService.currentFilmes$.subscribe(
      (filmes) => (this.filmes$ = filmes)
    );
    this.tmdbapiService.currentRoot.subscribe((root) => {
      this.root$ = root;
    });
  }

  ngOnInit(): void {
    this.getOffset();
    console.log(this.offset);
  }

  nextPage(): void {
    this.tmdbapiService.setPaginas(this.tmdbapiService.getPaginas() + 1);
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

  getOffset() {
    if (this.root$)
      this.root$.subscribe((root) => {
        this.offset = root.total_results;
        console.log(this.offset);
      });
  }
}
