import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Offer} from '@app/models/index.models';

@Component({
  selector: 'app-refine-offer-filters',
  templateUrl: './refine-offer-filters.component.html',
  styleUrls: ['./refine-offer-filters.component.scss']
})
export class RefineOfferViewComponent implements OnInit {
  form: FormGroup;
  offer: Offer;
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
