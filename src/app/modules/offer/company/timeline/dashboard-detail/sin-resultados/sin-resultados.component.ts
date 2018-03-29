import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sin-resultados',
  templateUrl: './sin-resultados.component.html',
  styles: []
})
export class SinResultadosComponent {

  @Input() title: string;

}
