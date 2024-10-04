import { Locator, Page } from "@playwright/test";

export class ToastComponent {
  readonly toastLocator: Locator;

  constructor(page: Page) {
    this.toastLocator = page.getByRole("status");
  }
}
