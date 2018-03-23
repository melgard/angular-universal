import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-observable-error',
  templateUrl: './observable-error.component.html',
  styleUrls: ['./observable-error.component.scss']
})
export class ObservableErrorComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  constructor() {
  }

  ngOnInit() {
  }

}
