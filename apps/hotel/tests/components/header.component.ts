import { Locator, Page } from "@playwright/test";

export class HeaderComponent {
  readonly logoutLocator: Locator;
  constructor(page: Page) {
    this.logoutLocator = page.getByLabel("logout");
  }
}
