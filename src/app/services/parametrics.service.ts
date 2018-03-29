import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';


import {Career, Parametric, ParametricPerk, Skill} from 'app/models/index.models';
import {API} from 'app/modules/core/api.constants';


@Injectable()
export class ParametricsService {

  constructor(@Inject('environment') private environment,
              private http: Http) {

  }

  getClusters(): Observable<Parametric[]> {
    return this.http
      .get(`${API.PARAMETRIC}clusters`)
      .map(response => response.json().map(c => new Parametric(c)));
  }

  getCareers(): Observable<Career[]> {
    return this.http
      .get(`${API.PARAMETRIC}careers`)
      .map(response => response.json().map(c => new Career(c)));
  }

  getBusinessCategories(): Observable<Parametric[]> {
    return this.http
      .get(`${API.PARAMETRIC}businessCategories`)
      .map(response => response.json().map(c => new Parametric(c)));
  }

  getBusinessPositions(): Observable<Parametric[]> {
    return this.http
      .get(`${API.PARAMETRIC}businessPositions`)
      .map(response => response.json().map(c => new Parametric(c)));
  }

  getPositionType(): Observable<Parametric[]> {
    return this.http
      .get(`${API.PARAMETRIC}positionTypes`)
      .map(response => response.json().map(c => new Parametric(c)));
  }

  getEmployeesCounts(): Observable<Parametric[]> {
    return this.http
      .get(`${API.PARAMETRIC}employeesCounts`)
      .map(response => response.json().map(c => new Parametric(c)));
  }

  getPerks(): Observable<ParametricPerk[]> {
    return this.http
      .get(`${API.PARAMETRIC}perks`)
      .map(response => response.json().map(p => new ParametricPerk(p)));
  }

  getSkills(): Observable<Skill[]> {
    return this.http
      .get(`${API.PARAMETRIC}skills`)
      .map(response => response.json().map(s => new Skill(s)));
  }

}
