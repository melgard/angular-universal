import {Component, Input, OnInit} from '@angular/core';
import {ISearchResult} from '@app/interfaces/search-result.interface';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  @Input() offer: ISearchResult;

  constructor() {
  }

  ngOnInit() {
  }

}
