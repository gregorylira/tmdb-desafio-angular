import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/model/Filmes';
import { TmdbApiService } from '../../../service/tmdb-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  filter: string[] = [];
  filmes$?: Observable<Result[]>;

  constructor(public tmdbapiService: TmdbApiService) {
    this.tmdbapiService.filtros.subscribe((filtros) => {
      this.filter = filtros;
    });
    this.tmdbapiService.getPopulares([...this.filter]);
    this.filmes$ = this.tmdbapiService.filmes$;
    console.log(this.filter);
  }

  ngOnInit(): void {}

  filtros(novofiltro: string) {
    if (this.filter.find((genre) => genre === novofiltro)) {
      this.filter = this.filter.filter((item) => item !== novofiltro);
    } else {
      this.tmdbapiService.setPaginas(1);
      this.filter = [...this.filter, novofiltro];
    }
    this.tmdbapiService.getPopulares(this.filter);
    this.tmdbapiService.currentFilmes$.subscribe(
      (filmes) => (this.filmes$ = filmes)
    );
  }

  inFilter(filtro: string) {
    return this.filter.find((genre) => genre === filtro);
  }
}
