import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Offer} from '@app/models/index.models';

@Component({
  selector: 'app-new-offer-view',
  templateUrl: './new-offer-view.component.html',
  styleUrls: ['./new-offer-view.component.scss']
})
export class NewOfferViewComponent implements OnInit {
  form: FormGroup;
  offer: Offer = new Offer({});
  groupId = null;

  constructor(public formBuilder: FormBuilder, public router: Router, private activatedRoute: ActivatedRoute) {
    this.form = this.formBuilder.group({});
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.groupId = params['groupId'];
    });
  }
}
