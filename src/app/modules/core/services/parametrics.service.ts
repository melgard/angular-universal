import {Inject, Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';


import {
  API,
  BusinessCategory,
  BusinessPosition,
  Career,
  Cluster,
  EmployeesCount,
  ParametricPerk,
  PositionType,
  Skill
} from '@app/models/index.models';


@Injectable()
export class ParametricsService {

  constructor(@Inject('environment') private environment,
              private http: Http) {

  }

  getClusters(): Observable<Cluster[]> {
    return this.http
      .get(`${API.PARAMETRIC}clusters`)
      .map(response => response.json().map(c => new Cluster(c)));
  }

  getCareers(): Observable<Career[]> {
    return this.http
      .get(`${API.PARAMETRIC}careers`)
      .map(response => response.json().map(c => new Career(c)));
  }

  getBusinessCategories(): Observable<BusinessCategory[]> {
    return this.http
      .get(`${API.PARAMETRIC}businessCategories`)
      .map(response => response.json().map(c => new BusinessCategory(c)));
  }

  getBusinessPositions(): Observable<BusinessPosition[]> {
    return this.http
      .get(`${API.PARAMETRIC}businessPositions`)
      .map(response => response.json().map(c => new BusinessPosition(c)));
  }

  getPositionType(): Observable<PositionType[]> {
    return this.http
      .get(`${API.PARAMETRIC}positionTypes`)
      .map(response => response.json().map(c => new PositionType(c)));
  }

  getEmployeesCounts(): Observable<EmployeesCount[]> {
    return this.http
      .get(`${API.PARAMETRIC}employeesCounts`)
      .map(response => response.json().map(c => new EmployeesCount(c)));
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
