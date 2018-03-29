import {Component, Input, OnInit} from '@angular/core';
import {nameAnimated} from '../../../../../../shared/animations/animations';

@Component({
  selector: 'app-nombre-animado',
  templateUrl: './nombre-animado.component.html',
  styleUrls: ['./nombre-animado.component.scss'],
  animations: [
    nameAnimated
  ]
})
export class NombreAnimadoComponent implements OnInit {

  @Input() nombre: string;
  @Input('mouseOver') mouseOver;
  public letters: string[] = [];

  constructor() {
  }

  ngOnInit() {
    this.setLetters();
  }

  setLetters() {
    if (!this.nombre) {
      return;
    }
    for (let i = 0, len = this.nombre.length; i < len; i++) {
      const letra: string = this.nombre.charAt(i);
      this.letters.push(letra);
    }
  }

  onEnd(event) {
  }

}
