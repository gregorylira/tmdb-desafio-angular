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
  details$?: Observable<RootDetail>;
  @Input() id: string = '1';

  constructor(public tmdApiService: TmdbApiService) {}

  ngOnInit(): void {
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
      this.details$ = detalhes;
    });
  }
}
