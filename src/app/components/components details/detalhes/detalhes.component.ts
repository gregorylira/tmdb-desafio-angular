import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Cast, Crew } from 'src/app/model/Participantes';
import { TmdbApiService } from 'src/app/service/tmdb-api.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { RootDetail } from 'src/app/model/Details';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss'],
})
export class DetalhesComponent implements OnInit {
  participantes$?: Observable<Cast[]>;
  producao$?: Observable<Crew[]>;
  fiveParticipantes$?: Cast[];
  fiveProducao$?: Crew[];
  detail$?: RootDetail;
  trailer$?: Observable<String>;
  linkVideo: string = 'a';
  safeUrl: any;
  @Input() id: string = '1';

  constructor(
    public tmdApiService: TmdbApiService,
    private _sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getDetalhes();
    this.getParticipantes();
    this.getFiveParticipantes();
    this.getFiveProducao();
    this.getTrailer();
  }

  getParticipantes() {
    this.tmdApiService.getParticipantes(this.id);
    this.tmdApiService.currentParticipantes$.subscribe(
      (participantes) => (this.participantes$ = participantes)
    );
    this.tmdApiService.currentProcucao$.subscribe(
      (producao) => (this.producao$ = producao)
    );
  }

  getDetalhes() {
    this.tmdApiService.getDetails(this.id);
    this.tmdApiService.currentDetail$.subscribe((detalhes) => {
      detalhes.subscribe((detail) => {
        this.detail$ = detail;
        console.log(this.detail$);
      });
    });
  }

  getGenres() {
    if (this.detail$) {
      return this.detail$.genres.map((genre) => genre.name).join(', ');
    }
    return;
  }

  getFiveParticipantes() {
    this.participantes$?.subscribe((participantes) => {
      this.fiveParticipantes$ = participantes.slice(0, 5);
    });
  }
  getFiveProducao() {
    this.producao$?.subscribe((producao) => {
      this.fiveProducao$ = producao.slice(0, 5);
    });
  }

  getTrailer() {
    this.trailer$ = this.tmdApiService.getTrailer(this.id);
    this.trailer$.subscribe((link) => {
      this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' + link
      );
    });
  }
}
