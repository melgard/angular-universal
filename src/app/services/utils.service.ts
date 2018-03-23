import {Injectable} from '@angular/core';

/**
 * Created by Kevin on 22/9/2017.
 */
@Injectable()
export class UtilsService {

  constructor() {

  }

  getModelNameById(id, array: any[], nameAttr) {
    const values = array.filter((elem) => {
      return elem.id === id;
    }).map((elem) => {
      return elem[nameAttr];
    });

    if (values.length === 0) {
      return '';
    }

    return values.shift();

  }

}
