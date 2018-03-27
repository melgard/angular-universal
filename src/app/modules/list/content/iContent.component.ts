export interface IContent {
  isLoggedIn: boolean;

  onActionButton();

  getActionButtonText(any?): string;

  getLoginUrl(): string;
}
