import { Locator, Page } from "@playwright/test";

export class ToastComponent {
  private page: Page;
  readonly toastMessageLocator: Locator;
  constructor(page: Page) {
    this.page = page;
    this.toastMessageLocator = this.page.getByRole("status");
  }
}
