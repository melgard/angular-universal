import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {MyAppliesService} from '@app/services/index.services';
import {IApply} from '@app/interfaces/apply.interface';

@Component({
  selector: 'app-my-applies',
  templateUrl: './my-applies.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyAppliesComponent implements OnInit {

  public applies$: Observable<IApply[]>;
  public kindOptionsSort: any[] = [
    {name: 'updatedAt', label: 'Última actualización'},
    {name: 'progress', label: 'Proceso más avanzado'}
  ];

  public kindSort: string = 'updatedAt';

  constructor(private myAppliesService: MyAppliesService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.applies$ = this.myAppliesService.getPostulaciones();
    this.myAppliesService.getData(this.kindSort);
  }

  loadMore(event) {
    if (this.myAppliesService.getItemsCount() < this.myAppliesService.totalItems) {
      this.getData();
    } else {
      console.log('no hay más registros');
    }
  }


}
