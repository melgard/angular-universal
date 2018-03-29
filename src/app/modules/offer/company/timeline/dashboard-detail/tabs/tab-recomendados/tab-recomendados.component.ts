import {AfterContentInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {TimelineService} from '../../../../../../../services/index.services';
import {Observable} from 'rxjs/Observable';
import {itemsAnimated} from '../../../../../../shared/animations/animations';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Subscription} from 'rxjs/Subscription';

@AutoUnsubscribe()
@Component({
  selector: 'app-tab-recomendados',
  templateUrl: './tab-recomendados.component.html',
  styleUrls: ['./tab-recomendados.component.scss'],
  animations: [itemsAnimated],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabRecomendadosComponent implements AfterContentInit {

  public profiles$: Observable<any[]>;
  public subscription: Subscription;

  constructor(private _timelineService: TimelineService) {
  }

  ngAfterContentInit() {
    this.profiles$ = this._timelineService.getRecomendados();
  }

}
