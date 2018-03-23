import {Injectable} from '@angular/core';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import * as _ from 'lodash';

/**
 * Created by Kevin on 22/9/2017.
 */
@Injectable()
export class ApiService {

  constructor(private http: Http) {

  }

  post(url, data?, options?) {
    return this.call('post', url, data, options);
  }

  get(url, data?, options?) {

    const requestParams = new RequestOptions();

    let index = 0;
    _.forEach(data, (value, key) => {
      if (index === 0) {
        url += '?';
      } else {
        url += '&';
      }
      url += key + '=' + value;
      index++;
    });

    return this.call('get', url, requestParams, options);
  }

  put(url, data?, options?) {
    return this.call('put', url, data, options);
  }

  delete(url, data?, options?) {

    const requestParams = new RequestOptions();

    _.forEach(data, (value, key) => {
      requestParams[key] = value;
    });

    return this.call('delete', url, requestParams, options);
  }

  private call(method, url, data?, options?) {

    if (!data) {
      data = {};
    }

    const headers = new Headers();

    if (options && options['groupId']) {
      headers.append('x-group-id', options['groupId']);
    }

    if (method === 'get' || method === 'delete') {
      data.headers = headers;
    }

    return this.http[method](url, data, {'headers': headers}).map((res: Response) => {
      if (!res || !res['_body'] || res['_body'] === '') {
        return {};
      }

      return res.json();
    }).catch((err: any) => {
      console.log(err);
      return err;
    });

  }

}
