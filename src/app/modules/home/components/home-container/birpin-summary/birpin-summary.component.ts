import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-birpin-summary',
  templateUrl: './birpin-summary.component.html',
  styles: []
})
export class BirpinSummaryComponent {

  @Input() birpinSummary;

}
