import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-featured-job',
  templateUrl: './featured-job.component.html',
  styleUrls: ['./featured-job.component.scss']
})
export class FeaturedJobComponent {

  @Input() featuredJob;

}
