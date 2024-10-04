import { Locator, Page } from "@playwright/test";

export class CabinPage {
  readonly cabinTitleLocator: Locator;
  readonly cabinsListTableLocator: Locator;
  readonly cabinRowLocator: Locator;
  readonly allcabinsFilterButton: Locator;
  readonly cabinswithoutDiscountFilterButton: Locator;
  readonly cabinswithDiscountFilterButton: Locator;
  readonly sortByPriceSelector: Locator;
  readonly addNewCabinButton: Locator;
  readonly meatBallMenuDeleteOption: Locator;
  constructor(page: Page) {
    this.cabinTitleLocator = page.locator("h1");
    this.cabinsListTableLocator = page.getByRole("table");
    this.allcabinsFilterButton = page.getByRole("button", { name: "All" });
    this.cabinswithoutDiscountFilterButton = page.getByRole("button", {
      name: "No discount",
    });
    this.cabinswithDiscountFilterButton = page.getByRole("button", {
      name: "With discount",
    });
    this.sortByPriceSelector = page.locator("select");
    this.addNewCabinButton = page.getByRole("button", {
      name: "Add new cabin",
    });
    this.cabinRowLocator = this.cabinsListTableLocator.getByRole("row");
    this.meatBallMenuDeleteOption = page.getByRole("button", {
      name: "Delete",
    });
  }
}
