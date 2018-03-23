import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-ratings-with-stars',
  templateUrl: './ratings-with-stars.component.html',
  styleUrls: ['./ratings-with-stars.component.scss']
})
export class RatingsWithStarsComponent implements OnInit {


  @Input() rating: number;
  @Input() totalStars = 5;
  @Input() mouseState: string;

  public stars: any = {
    full: [],
    half: false,
    empty: []
  };

  constructor() {
  }

  ngOnInit() {
    this.setStars();
  }

  setStars() {

    const full: number[] = [];
    const empty: number[] = [];
    let half = 0;
    for (let index = 0; index < this.rating; index++) {
      full.push(index);
    }
    const resto = (this.rating - full.length);
    if (resto > 0 && resto < 1) {
      half = 1;
    }
    for (let index = full.length + half; index < this.totalStars; index++) {
      empty.push(index);
    }
    this.stars.full = full;
    this.stars.half = (half === 1);
    this.stars.empty = empty;
  }
}
