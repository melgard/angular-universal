import {AfterContentInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {TimelineService} from '../../../../../../../services/index.services';
import {Observable} from 'rxjs/Observable';
import {itemsAnimated} from '../../../../../../shared/animations/animations';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-tab-adquiridos',
  templateUrl: './tab-adquiridos.component.html',
  styleUrls: ['../tabs.scss'],
  animations: [itemsAnimated],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabAdquiridosComponent implements AfterContentInit {

  public profiles$: Observable<any[]>;

  constructor(private _timelineService: TimelineService) {
  }

  ngAfterContentInit() {
    this.profiles$ = this._timelineService.getPerfilesAdquiridos();
  }

}
