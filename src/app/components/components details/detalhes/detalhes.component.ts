import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cast } from 'src/app/model/Participantes';
import { TmdbApiService } from 'src/app/service/tmdb-api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RootDetail } from 'src/app/model/Details';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
})
export class DetalhesComponent implements OnInit {
  participantes$?: Observable<Cast[]>;
  detail$?: RootDetail;
  @Input() id: string = '1';

  constructor(public tmdApiService: TmdbApiService) {}

  ngOnInit(): void {
    this.getDetalhes();
    this.getParticipantes();
  }

  getParticipantes() {
    this.tmdApiService.getParticipantes(this.id);
    this.tmdApiService.currentParticipantes$.subscribe(
      (participantes) => (this.participantes$ = participantes)
    );
  }

  getDetalhes() {
    this.tmdApiService.getDetails(this.id);
    this.tmdApiService.currentDetail$.subscribe((detalhes) => {
      detalhes.subscribe((detail) => {
        this.detail$ = detail;
      });
    });
  }

  getGenres() {
    if (this.detail$) {
      return this.detail$.genres.map((genre) => genre.name).join(', ');
    }
    return;
  }
}
