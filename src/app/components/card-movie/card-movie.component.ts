import { Component, OnInit, Input } from '@angular/core';
import { Result } from 'src/app/model/Filmes';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
})
export class CardMovieComponent implements OnInit {
  @Input() movie?: Result;
  imagem?: string;

  constructor() {}

  ngOnInit(): void {}
}
