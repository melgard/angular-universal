import {Component, OnInit} from '@angular/core';
import {TimelineService} from '../../../../../../services/index.services';
import {IHistorical} from '../../../interfaces/historical.interface';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../../services/user.service';

@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.scss']
})
export class UserTimelineComponent implements OnInit {

  public profile: any = {};
  public historial: IHistorical[];
  public loading = true;
  public error: any;
  private offerId: number;
  private profileId: number;

  constructor(private timelineService: TimelineService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.offerId = params.offerId;
      this.profileId = params.profileId;
      this.getHistorical();
    });
  }

  getHistorical() {
    const companyId = this.userService.getCompanyId();
    this.timelineService.getHistoricalByOfferIdAndProfileId(companyId, this.offerId, this.profileId)
      .subscribe((data) => {
        this.profile = data.profile;
        this.historial = data.historial.filter((h: IHistorical) => h.comment != null);
        this.loading = false;
      }, (error) => {
        this.error = error;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }

}
