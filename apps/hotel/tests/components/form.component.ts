import { Locator, Page } from "@playwright/test";
import { CreateCabinPayload } from "../types";
import path from "path";

export class FormComponent {
  readonly formLocator: Locator;
  readonly cabinNameInputLocator: Locator;
  readonly maxCapacityInputLocator: Locator;
  readonly regularPriceInputLocator: Locator;
  readonly discountInputLocator: Locator;
  readonly descriptionForWebsiteInputLocator: Locator;
  readonly cabinPhotoInputLocator: Locator;
  readonly creatNewCabinBtn: Locator;
  readonly editCabinBtn: Locator;

  constructor(page: Page) {
    this.formLocator = page.locator("form");

    this.cabinNameInputLocator = this.formLocator.getByLabel("Cabin name");

    this.maxCapacityInputLocator =
      this.formLocator.getByLabel("Maximum capacity");

    this.regularPriceInputLocator =
      this.formLocator.getByLabel("Regular price");

    this.discountInputLocator = this.formLocator.getByLabel("Discount");

    this.descriptionForWebsiteInputLocator = this.formLocator.getByLabel(
      "Description for website"
    );

    this.cabinPhotoInputLocator = this.formLocator.getByLabel("Cabin photo");

    this.creatNewCabinBtn = this.formLocator.getByRole("button", {
      name: "Create new cabin",
    });

    this.editCabinBtn = this.formLocator.getByRole("button", {
      name: "Edit cabin",
    });
  }

  async fillForm(createCabinData: CreateCabinPayload) {
    await this.cabinNameInputLocator.fill(createCabinData.name);
    await this.maxCapacityInputLocator.fill(
      createCabinData.maxCapacity.toString()
    );
    await this.regularPriceInputLocator.fill(
      createCabinData.regularPrice.toString()
    );
    await this.discountInputLocator.fill(createCabinData.discount.toString());
    await this.descriptionForWebsiteInputLocator.fill(
      createCabinData.description.toString()
    );
    await this.cabinPhotoInputLocator.setInputFiles(
      path.resolve(createCabinData.image)
    );
  }
}
