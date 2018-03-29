import {Component, Input, OnInit} from '@angular/core';
import {AppConfig} from '../../../../../../app-config';

@Component({
  selector: 'app-timeline-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {

  @Input() perfil: any;
  public noImage = AppConfig.USER_NO_IMAGE;

  constructor() {
  }

  ngOnInit() {
  }

}
