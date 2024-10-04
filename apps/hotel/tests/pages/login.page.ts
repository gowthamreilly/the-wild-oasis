import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private page: Page;
  readonly pageTitleLocator: Locator;
  readonly emailAddressInputLocator: Locator;
  readonly passwordInputLocator: Locator;
  readonly loginButtonLocator: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pageTitleLocator = page.getByText("Log in to your account");
    this.emailAddressInputLocator = page.getByLabel("Email address");
    this.passwordInputLocator = page.getByLabel("Password");
    this.loginButtonLocator = page.getByRole("button", { name: "Log in" });
  }

  async goto() {
    this.page.goto("/login");
  }
}
