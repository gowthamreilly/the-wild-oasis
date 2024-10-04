import { Locator, Page } from "@playwright/test";

export class NavBarComponent {
  readonly navBarSection: Locator;
  readonly navBaroptions: Locator;
  readonly cabinOptionLocator: Locator;
  constructor(page: Page) {
    this.navBarSection = page.locator("nav");
    this.navBaroptions = this.navBarSection.getByRole("link");
    this.cabinOptionLocator = this.navBaroptions.getByText("Cabins");
  }
}
