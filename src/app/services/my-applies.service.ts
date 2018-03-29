import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
import {UserService} from './user.service';
import {Http} from '@angular/http';


@Injectable()
export class MyAppliesService {


  public totalItems: number = 0;
  private postulacionesSubject = new BehaviorSubject([]);
  private postulaciones: any[];
  private skip: number = 0;
  private take: number = 1;

  constructor(@Inject('environment') private environment,
              private _user: UserService,
              private apiService: Http) {
    this.postulaciones = [];
  }

  getPostulaciones(): Observable<any[]> {
    return this.postulacionesSubject.asObservable();
  }

  getData(kind: string) {
    const url: string = `${this.environment.api_url}/api/timelines/my-applies`;
    this.apiService.get(url)
      .map(res => {
        return res;
      })
      .subscribe((data: any) => {
          // this.totalItems = data.count;
          this.postulaciones = data.data;
          this.updatePostulaciones();
        }, (err: any) => console.error('ERROR', err)
        , () => {

        });
  }

  getItemsCount(): number {
    if (!this.postulaciones) {
      this.postulaciones = [];
    }
    return this.postulaciones.length || 0;
  }

  updatePostulaciones() {
    this.postulacionesSubject.next(this.postulaciones);
  }

}
