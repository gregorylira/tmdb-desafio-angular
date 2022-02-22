import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Result, RootObject } from 'src/app/model/Filmes';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  filmes$?: Observable<Result[]>;
  root$?: Observable<RootObject>;
  base_URL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) {}

  getPopulares(): void {
    this.root$ = this.http.get<RootObject>(
      this.base_URL + `movie/popular?api_key=&language=en-US&page=1`
    );
    this.filmes$ = this.root$.pipe(map((root) => root.results));
  }
}
