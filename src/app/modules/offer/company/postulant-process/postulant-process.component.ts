import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-postulant-process',
  templateUrl: './postulant-process.component.html',
  styleUrls: ['./postulant-process.component.scss']
})
export class PostulantProcessComponent implements OnInit {

  @Input('preselected') preselected: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
