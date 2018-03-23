import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-traffic-light',
  templateUrl: './traffic-light.component.html',
  styleUrls: ['./traffic-light.component.scss']
})
export class TrafficLightComponent implements AfterContentInit {

  // Salidas
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAlert: EventEmitter<string> = new EventEmitter<string>();

  // Entradas
  @Input() initValue: string = null;
  @Input() isEnabled: boolean = false;
  @Input() isRead_only: boolean = false;
  @Input() spanSize: number = 20;

  public lights: any[] = [
    {name: 'ok', status: 0},
    {name: 'warning', status: 0},
    {name: 'out', status: 0}
  ];


  constructor() {
  }


  ngAfterContentInit() {
    if (this.initValue) {
      const luces = this.lights.filter(l => l.name === this.initValue);
      if (luces.length > 0) {
        luces[0].status = 1;
      }
    }
  }


  changeLight(light) {
    if (this.isEnabled === true) {
      this.lights.forEach((l: any) => {
        l.status = 0;
      });
      light.status = 1;
      this.onChange.emit(light.name);
    } else {
      if (!this.isRead_only) {
        this.onAlert.emit('Complete el comentario');
      }
    }
  }


}
