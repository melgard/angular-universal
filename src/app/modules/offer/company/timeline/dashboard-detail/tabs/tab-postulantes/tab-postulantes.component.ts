import {AfterContentInit, ChangeDetectionStrategy, Component} from '@angular/core';
import {itemsAnimated} from '../../../../../../shared/animations/animations';
import {TimelineService} from '../../../../../../../services/index.services';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-tab-postulantes',
  templateUrl: './tab-postulantes.component.html',
  styleUrls: ['../tabs.scss'],
  animations: [itemsAnimated],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TabPostulantesComponent implements AfterContentInit {

  public profiles$: Observable<any[]>;
  public subscription: Subscription;

  constructor(private _timelineService: TimelineService) {
  }

  ngAfterContentInit() {
    this.profiles$ = this._timelineService.getPostulantes();
  }

}
