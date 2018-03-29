import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-desbloquear-perfil',
  templateUrl: './desbloquear-perfil.component.html',
  styleUrls: ['./desbloquear-perfil.component.scss']
})
export class DesbloquearPerfilComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) {
  }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

}
