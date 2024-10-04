import { Locator, Page } from "@playwright/test";

export class CabinPage {
  readonly addNewCabinLocator: Locator;
  readonly cabinRowLocator: Locator;
  readonly meatBallMenu: Locator;
  readonly editBtn: Locator;
  readonly formLocator: Locator;
  readonly cabinNameInputLocator: Locator;
  readonly editCabinBtn: Locator;
  readonly deleteBtn: Locator;

  constructor(page: Page) {
    this.addNewCabinLocator = page.getByRole("button", {
      name: "Add new cabin",
    });
    this.cabinRowLocator = page
      .getByRole("table")
      .locator("section")
      .getByRole("row");
    // .filter({ has: page.getByText(this.cabinName) });

    this.meatBallMenu = this.cabinRowLocator.getByRole("button");

    this.editBtn = page.locator("ul li").getByRole("button", { name: "Edit" });
    this.deleteBtn = page
      .locator("ul li")
      .getByRole("button", { name: "Delete" });

    this.formLocator = page.locator("form");

    this.cabinNameInputLocator = this.formLocator.getByLabel("Cabin name");

    this.editCabinBtn = this.formLocator.getByRole("button", {
      name: "Edit cabin",
    });
  }
}
