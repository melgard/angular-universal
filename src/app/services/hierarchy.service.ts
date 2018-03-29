import {Observable} from 'rxjs/Observable';

import {Injectable} from '@angular/core';
import {Hierarchy} from '@app/models/index.models';

/**
 * Created by Kevin on 13/9/2017.
 */
@Injectable()
export class HierarchyService {

  constructor() {
  }

  getHierarchies(): Observable<Hierarchy[]> {

    const mockedZones: any[] = [
      {id: '1', value: 'Presidencia'},
      {id: '2', value: 'Dirección'},
      {id: '3', value: 'Gerencia'},
      {id: '4', value: 'Jefatura - Supervisión'},
      {id: '5', value: 'Analista Senior'},
      {id: '6', value: 'Analista semi-Senior'},
      {id: '7', value: 'Analista junior'},
      {id: '8', value: 'Profesional'},
      {id: '9', value: 'Administrativo - Operativo'}
    ];

    return Observable.of(mockedZones);
  }

}
