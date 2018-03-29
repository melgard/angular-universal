import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {Area, SubArea} from '../models/index.models';

@Injectable()
export class AreaService {

  constructor() {
  }

  getAreas(): Observable<Area[]> {
    // TODO: Quitar harcode
    const mockedAreas: any[] = [
      {id: '1', value: 'Administración y contabilidad'},
      {id: '2', value: 'Almacenamiento / Logística / Distribución'},
      {id: '3', value: 'Arquitectura'},
      {id: '4', value: 'Atención al cliente / Call center / Telemarketing'},
      {id: '5', value: 'Comercial / Ventas / Negocios'},
      {id: '6', value: 'Marketing'},
    ];

    return Observable.of(mockedAreas);
  }

  getSubAreas(area_id): Observable<SubArea[]> {
    // TODO: Quitar harcode
    const mockedSubAreas: any[] = [
      {id: '1', name: 'Business Intelligence'},
      {id: '2', name: 'Community Management'},
      {id: '3', name: 'Investigación de Mercado'},
      {id: '4', name: 'Marketing'},
      {id: '5', name: 'Marketing Online / Digital'},
      {id: '6', name: 'Producto'},
      {id: '7', name: 'Publicidad'}
    ];

    return Observable.of(mockedSubAreas);

  }

}
