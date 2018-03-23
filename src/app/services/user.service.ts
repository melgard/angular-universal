import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {CompanyStat} from '@app/models/company-stat.model';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {UserSession} from '@app/models/user-session.model';


@Injectable()
export class UserService {
  public loggedIn = new BehaviorSubject<UserSession>(new UserSession());

  constructor(@Inject('environment') private environment,
              private router: Router,
              private http: Http) {
  }

  public fetchUser() {
    this
      .http
      .get(`${this.environment.api_url}/me`)
      .map((res: Response) => res.json())
      .subscribe(resultJson => {
        const userSession = new UserSession(
          resultJson.signedIn,
          resultJson.firstName,
          resultJson.lastName,
          resultJson.companies,
          resultJson.username
        );

        this.loggedIn.next(userSession);
      })
    ;
  }

  isLoggedIn() {
    return this.loggedIn.value.signedIn;
  }

  getUser(): UserSession {
    return this.loggedIn.value;
  }

  getCompanyId() {
    const companies = this.loggedIn.value.companies;
    if (companies && companies.length !== 0) {
      return companies[0].id;
    } else {
      return null;
    }
  }

  logout() {
    this.http
      .get(`${this.environment.api_url}/logout`)
      // .map( (res:Response) => res.json())
      .subscribe(_ => {
        this.loggedIn.next(new UserSession());
      });
  }

  getCredits() {
    // TODO: quitar.
    return 2000;
  }

  public getStats(): Observable<CompanyStat[]> {

    const mockedStats: CompanyStat[] = [
      new CompanyStat('Avisos publicados', 32),
      new CompanyStat('En proceso', 12),
      new CompanyStat('Finalizados', 33),
      new CompanyStat('Postulaciones', 330),
      new CompanyStat('Recomendaciones', 2345),
    ];

    return Observable.of(mockedStats);
  }

  public setStatus(statusId: number) {
    return this.http.post(`${this.environment.api_url}/api/users/status/${statusId}`, {});
  }

  public getStatus() {
    return this.http.get(`${this.environment.api_url}/api/users/status`, {})
      .map((res) => res.json());
  }

  private redirectUser(userSession: UserSession) {
    if (userSession.companies && userSession.companies.length) {
      const firstCompany = userSession.companies[0];
      this.router.navigate(['/wall/company', firstCompany.id]);
    } else {
      this.router.navigate(['/wall/user/me']);
    }
  }
}
