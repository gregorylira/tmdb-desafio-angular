import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Result, RootObject } from 'src/app/model/Filmes';
import { map, Observable, of, BehaviorSubject, find } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cast, Crew, ParticipantesRoot } from '../model/Participantes';
import { RootDetail } from '../model/Details';
import { TrailerRoot } from '../model/Trailer';
import { IdadeRoot } from '../model/IdadeMinima';

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

  private listaFiltros = new BehaviorSubject<string[]>([]);
  filtros = this.listaFiltros.asObservable();
  contentFiltros: string[] = [];

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
      this.root$ = this.http.get<RootObject>(
        this.base_URL +
          `discover/movie?api_key=${environment.API_KEY}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.paginas}&with_genres=${filtro}&with_watch_monetization_types=flatrate`
      );

      this.listaFiltros.next(filtro);
    } else {
      this.root$ = this.http.get<RootObject>(
        this.base_URL +
          `movie/popular?api_key=${environment.API_KEY}&language=en-US&page=${this.paginas}`
      );
    }
    this.filmes$ = this.root$.pipe(map((root) => root.results));
    this.filmesSource.next(this.filmes$);
  }

  getRecomendacoes(id: string) {
    this.root$ = this.http.get<RootObject>(
      this.base_URL +
        `movie/${id}/recommendations?api_key=${environment.API_KEY}&language=en-US&page=1`
    );
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

  getIdadeMinima(id: string): Observable<String> {
    const idadeMinimaRoot = this.http.get<IdadeRoot>(
      this.base_URL + `movie/${id}/release_dates?api_key=${environment.API_KEY}`
    );
    // procurar o Brasil no is_3166_1
    const idadeMinimaResults = idadeMinimaRoot.pipe(
      map((root) => root.results.filter((result) => result.iso_3166_1 === 'BR'))
    );
    return idadeMinimaResults.pipe(
      map((results) => results[0].release_dates[0].certification)
    );
  }

  getTrailer(id: string): Observable<String> {
    const trailerRoot = this.http.get<TrailerRoot>(
      this.base_URL +
        `movie/${id}/videos?api_key=${environment.API_KEY}&language=en-US`
    );
    return trailerRoot.pipe(map((root) => root.results[0].key));
  }

  getPaginas(): number {
    return this.paginas;
  }
  setPaginas(paginas: number): void {
    this.paginas = paginas;
  }
}
