import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardMovieProps, Result } from 'src/app/model/Filmes';
import { TmdbApiService } from '../service/tmdb-api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  filme1: CardMovieProps = {
    img: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    title: 'Miranha',
    time: '12 Nov 2021',
  };

  filmes$?: Observable<Result[]>;

  constructor(public tmdbapiService: TmdbApiService) {
    this.tmdbapiService.getPopulares();
    this.filmes$ = this.tmdbapiService.filmes$;
    console.log(this.filmes$);
  }

  ngOnInit(): void {}
}
