import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Result, RootObject } from 'src/app/model/Filmes';
import { map, Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  private filmesSource = new BehaviorSubject<Observable<Result[]>>(
    {} as Observable<Result[]>
  );
  currentFilmes$ = this.filmesSource.asObservable();
  filmes$?: Observable<Result[]>;
  root$?: Observable<RootObject>;
  private readonly base_URL = 'https://api.themoviedb.org/3/';
  paginas: number = 1;

  constructor(private http: HttpClient) {}

  getPopulares(filtro: string[]): void {
    if (filtro?.length) {
      console.log(filtro);
      this.root$ = this.http.get<RootObject>(
        this.base_URL +
          `discover/movie?api_key=${environment.API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.paginas}&with_genres=${filtro}&with_watch_monetization_types=flatrate`
      );
    } else {
      this.root$ = this.http.get<RootObject>(
        this.base_URL +
          `movie/popular?api_key=${environment.API_KEY}&language=en-US&page=${this.paginas}`
      );
    }
    this.filmes$ = this.root$.pipe(map((root) => root.results));
    this.filmesSource.next(this.filmes$);
  }

  getPaginas(): number {
    return this.paginas;
  }
  setPaginas(paginas: number): void {
    this.paginas = paginas;
    console.log(this.paginas);
  }
}
