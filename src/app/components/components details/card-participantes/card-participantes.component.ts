import { Component, Input, OnInit } from '@angular/core';
import { Cast } from 'src/app/model/Participantes';

@Component({
  selector: 'app-card-participantes',
  templateUrl: './card-participantes.component.html',
  styleUrls: ['./card-participantes.component.scss'],
})
export class CardParticipantesComponent implements OnInit {
  @Input() participante?: Cast;

  constructor() {}

  ngOnInit(): void {}
}
