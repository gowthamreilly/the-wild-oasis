import { Locator, Page } from "@playwright/test";
import { CreateCabinPayload } from "../types/types";

export class ModalFormComponent {
  readonly newCabinForm: Locator;
  readonly newCabinName: Locator;
  readonly newCabinMaximumCapacity: Locator;
  readonly newCabinRegularPrice: Locator;
  readonly newCabinDiscount: Locator;
  readonly newCabinDescription: Locator;
  readonly newCabinPhoto: Locator;
  readonly submitNewCabinButton: Locator;
  readonly closeFormButton: Locator;
  readonly cancelButton: Locator;
  readonly submitFormButton: Locator;
  constructor(page: Page) {
    this.newCabinForm = page.locator("form");
    this.newCabinName = this.newCabinForm.getByLabel("Cabin name");
    this.newCabinMaximumCapacity =
      this.newCabinForm.getByLabel("Maximum capacity");
    this.newCabinRegularPrice = this.newCabinForm.getByLabel("Regular price");
    this.newCabinDiscount = this.newCabinForm.getByLabel("Discount");
    this.newCabinDescription = this.newCabinForm.getByLabel(
      "Description for website"
    );
    this.newCabinPhoto = this.newCabinForm.getByLabel("Cabin photo");
    this.submitNewCabinButton = this.newCabinForm.getByRole("button", {
      name: "Create new cabin",
    });
    this.cancelButton = this.newCabinForm.getByRole("button", {
      name: "Cancel",
    });
    this.submitFormButton = this.newCabinForm.getByRole("button", {
      name: "Create new cabin",
    });
  }

  async fillFormDetails(cabin: CreateCabinPayload) {
    await this.newCabinName.fill(cabin.name);
    await this.newCabinMaximumCapacity.fill(cabin.maxCapacity.toString());
    await this.newCabinRegularPrice.fill(cabin.regularPrice.toString());
    await this.newCabinDiscount.fill(cabin.discount.toString());
    await this.newCabinDescription.fill(cabin.description);
    await this.newCabinPhoto.setInputFiles(cabin.image);
  }
}
