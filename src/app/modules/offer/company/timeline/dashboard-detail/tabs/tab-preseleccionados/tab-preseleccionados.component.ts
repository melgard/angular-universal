import {AfterContentInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {TimelineService} from '../../../../../../../services/index.services';
import {Observable} from 'rxjs/Observable';
import {itemsAnimated} from '../../../../../../shared/animations/animations';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-tab-preseleccionados',
  templateUrl: './tab-preseleccionados.component.html',
  styleUrls: ['../tabs.scss'],
  animations: [itemsAnimated],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabPreseleccionadosComponent implements AfterContentInit {

  public preselectos$: Observable<any[]>;
  public subscription: Subscription;

  constructor(private _timelineService: TimelineService) {
  }

  ngAfterContentInit() {
    this.preselectos$ = this._timelineService.getPreselectos();
  }

}
