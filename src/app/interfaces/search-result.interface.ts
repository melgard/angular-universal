import {UserSearchResult} from '@app/models/search-result-user.model';
import {CompanySearchResult} from '@app/models/search-result-company.model';
import {OfferSearchResult} from '@app/models/search-result-offer.model';


export type SearchResult = UserSearchResult | CompanySearchResult | OfferSearchResult;

export interface ISearchResult {
  id: string;
  image_url: string;
  title: string;
  subtitle: string;
  since: string;
  description: string;
  location: string;
  action_button_text?: string;
  action_button_active?: boolean;

  getKind(): string;
}
