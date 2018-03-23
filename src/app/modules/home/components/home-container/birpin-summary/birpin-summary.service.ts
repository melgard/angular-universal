import {Injectable} from '@angular/core';

@Injectable()
export class BirpinSummaryService {

  summary = [
    {description: 'Busquedas Abiertas', value: 20548},
    {description: 'Empresas', value: 563},
    {description: 'Postulantes Activos', value: 3097}
  ];

  constructor() {
  }

}
