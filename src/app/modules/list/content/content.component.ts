import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISearchResult} from '@app/interfaces/search-result.interface';
import {OfferService} from '@app/services/index.services';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  @Input() result: { type: string, values: ISearchResult[] };
  @Output() onFilterBy = new EventEmitter<string>();

  public appliedOfferIds: number[] = [];
  public ready: boolean;

  constructor(private offerService: OfferService) {

  }

  ngOnInit() {
    this.ready = false;

    this.offerService.getConnectedUserApplies()
      .finally(() => this.ready = true)
      .subscribe(applies => this.appliedOfferIds = applies.map(a => a.offerId));
  }

  getResultTitle() {
    switch (this.result.type) {
      case 'offer':
        return 'Empleos';
      case 'company':
        return 'Empresas';
      case 'user':
        return 'Personas';
    }
  }

  emitFilterBy() {
    this.onFilterBy.emit(this.result.type);
  }
}
