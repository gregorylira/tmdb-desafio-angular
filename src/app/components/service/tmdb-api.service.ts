import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Result, RootObject } from 'src/app/model/Filmes';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  filmes$?: Observable<Result[]>;
  root$?: Observable<RootObject>;
  private readonly base_URL = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) {}

  getPopulares(): void {
    this.root$ = this.http.get<RootObject>(
      this.base_URL +
        `movie/popular?api_key=${environment.API_KEY}&language=en-US&page=1`
    );
    this.filmes$ = this.root$.pipe(map((root) => root.results));
  }
}
