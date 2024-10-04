import { Locator, Page } from "@playwright/test";

export class LoginPage {
  private page: Page;
  readonly emailInputField: Locator;
  readonly passwordInputField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInputField = this.page.getByLabel("Email address");
    this.passwordInputField = this.page.getByLabel("Password");
    this.loginButton = this.page.getByRole("button", { name: "Log in" });
  }

  async fillLoginCredentials(email: string, password: string) {
    await this.emailInputField.fill(email);
    await this.passwordInputField.fill(password);
  }
}
