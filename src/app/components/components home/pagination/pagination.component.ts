import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  MAX_ITEMS: number = 9;
  MAX_LEFT: number = (this.MAX_ITEMS - 1) / 2;

  Minimo?: number;

  @Input() limit: number = -1;
  @Input() total: number | null = -1;
  @Input() offset: number | null = -1;
  @Input() setOffset?: (offset: number) => void;

  current: number = 1;
  pages: number = 1;
  first: number = 1;

  constructor() {
    this.Minimo = Math.min(this.MAX_ITEMS, this.pages);
  }

  ngOnInit(): void {
    this.current = Math.floor(this.offset ? this.offset / this.limit + 1 : 1);
    this.pages = Math.ceil(this.total / this.limit);
    this.first = Math.max(this.current - this.MAX_LEFT, 1);
  }

  OnPageChange(page: number) {
    if (this.setOffset) {
      this.setOffset(this.limit * (page - 1));
    }
  }
}
