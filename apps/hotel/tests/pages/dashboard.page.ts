import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly dashboardTitleLocator: Locator;
  constructor(page: Page) {
    this.dashboardTitleLocator = page.locator("h1");
  }
}
