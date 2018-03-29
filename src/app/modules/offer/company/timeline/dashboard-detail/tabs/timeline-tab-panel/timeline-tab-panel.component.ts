import {AfterContentInit, Component, ContentChildren, QueryList} from '@angular/core';
import {TimelineTabComponent} from '../timeline-tab/timeline-tab.component';
import {fadeIn, tabSelected} from '../../../../../../shared/animations/animations';

@Component({
  selector: `app-timeline-tab-panel`,
  templateUrl: './timeline-tab-panel.component.html',
  styleUrls: ['./timeline-tab-panel.component.scss'],
  animations: [fadeIn, tabSelected]
})
export class TimelineTabPanelComponent implements AfterContentInit {

  @ContentChildren(TimelineTabComponent) tabs: QueryList<TimelineTabComponent>;

  ngAfterContentInit() {
    this.tabs.map(tab => tab.status = 'normal');
    const selectedTab = this.tabs.find(tab => tab.selected);
    if (!selectedTab) {
      this.tabs.first.status = 'selected';
      this.tabs.first.selected = true;
    }
  }

  selectTab(tab: TimelineTabComponent) {
    this.tabs.map(t => {
      t.selected = false;
      t.status = 'normal';
    });
    tab.status = 'selected';
    tab.selected = true;
  }

}
