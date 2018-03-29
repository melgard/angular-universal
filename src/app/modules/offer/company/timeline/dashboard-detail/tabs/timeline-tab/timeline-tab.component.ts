import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-timeline-tab',
  templateUrl: './timeline-tab.component.html',
  styleUrls: ['./timeline-tab.component.scss'],
})
export class TimelineTabComponent {

  @Input() title: string;
  @Input() dataTarget: string;
  @Input() selected = false;
  @Input() badge: number;
  @Input() cssId: string;
  @Input() isSpecial: boolean;
  @Input() status: string;

}
