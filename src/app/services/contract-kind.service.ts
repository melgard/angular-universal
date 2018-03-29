import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ContractKind} from '../models/contract-kind.model';

/**
 * Created by Kevin on 13/9/2017.
 */
@Injectable()
export class ContractKindService {

  constructor() {
  }

  getContractKinds(): Observable<ContractKind[]> {

    const mockedPositions: any[] = [
      {id: 'fullTime', value: 'Full Time'},
      {id: 'partTime', value: 'Part Time'},
      {id: 'remote', value: 'A Distancia'},
      {id: 'temporary', value: 'Temporal'}
    ];

    return Observable.of(mockedPositions);
  }

}
