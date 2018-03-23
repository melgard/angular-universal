import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {API as companyRoutes} from './routes';
import {Privacy} from '@app/models/privacy.model';
import {Company} from '@app/models/company.model';
import {CompanyInfo} from '@app/models/company-info.model';
import {Selector} from '@app/models/selector.model';
import {Email} from '@app/models/email.model';
import {Phone} from '@app/models/phone.model';
import {Address} from '@app/models/address.model';
import {FastContactEmail} from '@app/models/fast-contact-email.model';
import {FastContactEmailVariable} from '@app/models/fast-contact-email-variable.model';
import {CreateSelector} from '@app/models/create-selector.model';
import {SelectorToAdd} from '@app/models/selector-to-add.model';
import {Perk} from '@app/models/perk.model';
import {Website} from '@app/models/website.model';


@Injectable()
export class CompanyService {

  private PAGE_LIMIT = 10;

  constructor(@Inject('environment') private environment,
              private http: Http) {

  }

  // ***************
  // ***** GET *****
  // ***************
  getPrivacies(): Observable<Privacy[]> {
    return this.http
      .get(companyRoutes.get.privacies())
      .map((res: Response) => res.json().map(p => new Privacy(p)));
  }

  getCompany(companyId: number): Observable<Company> {
    return this.http
      .get(companyRoutes.get.company(companyId))
      .map((res: Response) => new Company(res.json()));
  }

  getCompanyInfo(companyId: number): Observable<CompanyInfo> {
    return this.http
      .get(companyRoutes.get.companyInfo(companyId))
      .map((res: Response) => new CompanyInfo(res.json()));
  }

  getCompanySelectors(companyId: number): Observable<Selector[]> {
    return this.http
      .get(companyRoutes.get.companySelectors(companyId))
      .map((res: Response) => res.json().map(s => new Selector(s)));
  }

  getCompanyEmails(companyId: number): Observable<Email[]> {
    return this.http
      .get(companyRoutes.get.companyEmails(companyId))
      .map((res: Response) => res.json().map(e => new Email(e)));
  }

  getCompanyPhones(companyId: number): Observable<Phone[]> {
    return this.http
      .get(companyRoutes.get.companyPhones(companyId))
      .map((res: Response) => res.json().map(e => new Phone(e)));
  }

  getCompanyAddresses(companyId: number): Observable<Address[]> {
    return this.http
      .get(companyRoutes.get.companyAddresses(companyId))
      .map((res: Response) => res.json().map(e => new Address(e)));
  }

  getCompanyPerks(companyId: number): Observable<Perk[]> {
    return this.http.get(companyRoutes.get.companyPerks(companyId)).map((res: Response) => res.json().map(p => new Perk(p)));
  }

  getCompanyPrivacies(companyId: number): Observable<Privacy[]> {
    return this.http
      .get(companyRoutes.get.companyPrivacies(companyId))
      .map((res: Response) => res.json().map(p => new Privacy(p)));
  }

  getCompanyFastContactEmail(companyId: number): Observable<FastContactEmail[]> {
    return this.http
      .get(companyRoutes.get.companyFastContactEmail(companyId))
      .map((res: Response) => res.json().map(p => {
        p.variables = p.variables.map(v => new FastContactEmailVariable(v));
        return new FastContactEmail(p);
      }));
  }

  // ***************
  // **** POST *****
  // ***************
  postCompanySelector(companyId: number, createSelectors: CreateSelector[]): Observable<Response> {
    return this.http.post(companyRoutes.post.companySelectors(companyId), createSelectors);
  }

  postCompanySelectorToAdd(companyId: number, selectorsToAdd: SelectorToAdd[]): Observable<Response> {
    return this.http.post(companyRoutes.post.companySelectorsToAdd(companyId), selectorsToAdd);
  }

  postCompanyEmail(companyId: number, email: Email): Observable<Response> {
    return this.http.post(companyRoutes.post.companyEmails(companyId), email);
  }

  postCompanyPhone(companyId: number, phone: Phone): Observable<Response> {
    return this.http.post(companyRoutes.post.companyPhones(companyId), phone);
  }

  postCompanyAddress(companyId: number, address: Address): Observable<Response> {
    return this.http.post(companyRoutes.post.companyAddresses(companyId), address);
  }

  postCompanyPerks(companyId: number, perkId: number): Observable<Response> {
    return this.http.post(companyRoutes.post.companyPerks(companyId, perkId), {});
  }

  postCompanyPrivacies(companyId: number, privacyId: number): Observable<Response> {
    return this.http.post(companyRoutes.post.companyPrivacies(companyId, privacyId), {});
  }

  postCompanyFastContactEmail(companyId: number, fastContactEmail: FastContactEmail): Observable<Response> {
    return this.http.post(companyRoutes.post.companyFastContactEmail(companyId), fastContactEmail);
  }

  // ***************
  // ***** PUT *****
  // ***************
  putCompany(companyId, company: Company): Observable<Response> {
    if (!company.id) throw new Error('didn\'t supply company ID');

    return this.http.put(companyRoutes.put.company(companyId), company);
  }

  putCompanyEmail(companyId, email: Email): Observable<Response> {
    if (!email.id) throw new Error('didn\'t supply email ID');

    return this.http.put(companyRoutes.put.companyEmails(companyId, email.id), email);
  }

  putCompanyPhone(companyId, phone: Phone): Observable<Response> {
    if (!phone.id) throw new Error('didn\'t supply phone ID');

    return this.http.put(companyRoutes.put.companyPhones(companyId, phone.id), phone);
  }

  putCompanyAddress(companyId, address: Address): Observable<Response> {
    if (!address.id) throw new Error('didn\'t supply address ID');

    return this.http.put(companyRoutes.put.companyAddresses(companyId, address.id), address);
  }

  putCompanyWebsite(companyId, website: Website): Observable<Response> {
    return this.http.put(companyRoutes.put.companyWebsite(companyId), website);
  }

  putCompanyFastContactEmail(companyId: number, fastContactEmailId: number, fastContactEmail: FastContactEmail): Observable<Response> {
    return this.http.put(companyRoutes.put.companyFastContactEmail(companyId, fastContactEmailId), fastContactEmail);
  }

  // ***************
  // *** DELETE ****
  // ***************
  deleteCompanySelector(companyId: number, selectorId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companySelectors(companyId, selectorId));
  }

  deleteCompanySelectorToAdd(companyId: number, selectorToAddId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companySelectorsToAdd(companyId, selectorToAddId));
  }

  deleteCompanyEmail(companyId: number, emailId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companyEmails(companyId, emailId));
  }

  deleteCompanyPhone(companyId: number, phoneId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companyPhones(companyId, phoneId));
  }

  deleteCompanyAddress(companyId: number, addressId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companyAddresses(companyId, addressId));
  }

  deleteCompanyLogo(companyId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companyLogo(companyId));
  }

  deleteCompanyWebsite(companyId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companyWebsite(companyId));
  }

  deleteCompanyPerks(companyId: number, perkId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companyPerks(companyId, perkId));
  }

  deleteCompanyPrivacies(companyId: number, privacyId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companyPrivacies(companyId, privacyId));
  }

  deleteCompanyFastContactEmail(companyId: number, fastContactEmailId: number): Observable<Response> {
    return this.http.delete(companyRoutes.delete.companyFastContactEmail(companyId, fastContactEmailId));
  }
}
