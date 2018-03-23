import {ISearchResult} from '@app/interfaces/search-result.interface';

export class UserSearchResult implements ISearchResult {
  constructor(public id: string,
              public image_url: string,
              public title: string,
              public subtitle: string,
              public since: string,
              public description: string,
              public location: string,
              public currentWork: string,
              public action_button_text?: string,
              public action_button_active?: boolean) {

  }

  getKind(): string {
    return 'user';
  }
}
