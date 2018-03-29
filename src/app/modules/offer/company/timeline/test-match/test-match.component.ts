import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppConfig} from '@app/app-config';
import {ToastrService} from 'ngx-toastr';
import {TimelineService, UserService} from '@app/services/index.services';
import {Offer} from '@app/models/offer.model';

@Component({
  selector: 'app-test-match',
  templateUrl: './test-match.component.html',
  styleUrls: ['./test-match.component.scss']
})
export class TestMatchComponent implements OnInit {

  public loading = true;
  public chartsData: number[] = [0, 0, 0, 2];
  public data: any[] = [];
  public offer: Offer;
  public error: any;
  public noImage = AppConfig.USER_NO_IMAGE;
  public buscar: string;
  private offerId: number;

  constructor(private _actRoute: ActivatedRoute,
              private _tl: TimelineService,
              private _userService: UserService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this._actRoute.params.subscribe(params => {
      this.offerId = params.offerId;
      this.getTestMatchData(this.offerId);
    });
  }

  refresh(buttonClick: boolean = false) {
    this.getTestMatchData(this.offerId, buttonClick);
  }

  getTestMatchData(offerId: number, showMessage: boolean = false) {
    const companyId = this._userService.getCompanyId();
    this._tl.getTestMatchData(companyId, offerId)
      .subscribe(data => {
        this.offer = new Offer(data.offer);
        const datosOrdenados = data.histories;
        this.data = datosOrdenados;
        this.chartsData = [data.chartData.ok, data.chartData.warning, data.chartData.out, data.chartData.waiting];
        if (showMessage === true) {
          this.toastr.success('Datos actualizados correctamente.', 'Sincronizados.');
        }
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.error = error;
      });
  }


  private compare(a, b) {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    // a debe ser igual b
    return 0;
  }

}
