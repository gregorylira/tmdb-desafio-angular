import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Result, RootObject } from 'src/app/model/Filmes';
import { map, Observable, of, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast, Crew, ParticipantesRoot } from '../model/Participantes';
import { RootDetail } from '../model/Details';
import { TrailerRoot } from '../model/Trailer';

@Injectable({
  providedIn: 'root',
})
export class TmdbApiService {
  private filmesSource = new BehaviorSubject<Observable<Result[]>>(
    {} as Observable<Result[]>
  );
  private participantesSource = new BehaviorSubject<Observable<Cast[]>>(
    {} as Observable<Cast[]>
  );

  private producaoSource = new BehaviorSubject<Observable<Crew[]>>(
    {} as Observable<Crew[]>
  );

  private detailsSource = new BehaviorSubject<Observable<RootDetail>>(
    {} as Observable<RootDetail>
  );

  currentFilmes$ = this.filmesSource.asObservable();
  filmes$?: Observable<Result[]>;
  root$?: Observable<RootObject>;

  currentParticipantes$ = this.participantesSource.asObservable();
  participantes$?: Observable<Cast[]>;
  rootParticipantes$?: Observable<ParticipantesRoot>;

  currentProcucao$ = this.producaoSource.asObservable();
  producao$?: Observable<Crew[]>;

  currentDetail$ = this.detailsSource.asObservable();
  detail$?: Observable<RootDetail>;

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

  getParticipantes(id: string): void {
    this.rootParticipantes$ = this.http.get<ParticipantesRoot>(
      this.base_URL +
        `movie/${id}/credits?api_key=${environment.API_KEY}&language=en-US`
    );
    this.participantes$ = this.rootParticipantes$.pipe(
      map((root) => root.cast)
    );
    this.producao$ = this.rootParticipantes$.pipe(map((root) => root.crew));

    this.participantesSource.next(this.participantes$);
    this.producaoSource.next(this.producao$);
  }

  getDetails(id: string): void {
    this.detail$ = this.http.get<RootDetail>(
      this.base_URL +
        `movie/${id}?api_key=${environment.API_KEY}&language=pt-BR`
    );
    this.detail$ = this.detail$.pipe(map((root) => root));
    this.detailsSource.next(this.detail$);
  }

  getTrailer(id: string): Observable<String> {
    const trailerRoot = this.http.get<TrailerRoot>(
      this.base_URL +
        `movie/${id}/videos?api_key=${environment.API_KEY}&language=en-US`
    );
    return trailerRoot.pipe(map((root) => root.results[0].key));
  }

  getRecomendacoes(id: string) {
    return this.http.get<RootObject>(
      this.base_URL +
        `movie/${id}/recommendations?api_key=${environment.API_KEY}&language=en-US&page=1`
    );
  }

  getPaginas(): number {
    return this.paginas;
  }
  setPaginas(paginas: number): void {
    this.paginas = paginas;
    console.log(this.paginas);
  }
}
