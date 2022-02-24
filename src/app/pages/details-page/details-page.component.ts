import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent implements OnInit {
  id: string = '1';

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.getId();
  }

  getId() {
    const i = this.route.snapshot.paramMap.get('id');
    if (i) {
      this.id = i;
    }
    console.log(this.id);
  }
}
