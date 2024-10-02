import { Locator, Page } from "@playwright/test";
import { generateUniqueCabinName } from "../utils";
import path from "path";
import { CreateCabinPayload } from "../types";

type FillFormParam = {
  name?: string;
  description?: string;
  maxCapacity?: number;
  regularPrice?: number;
  discount?: number;
  image?: string;
};

export class CabinPage {
  readonly cabinNameInputLocator: Locator;
  readonly cabinMaximumCapacityInputLocator: Locator;
  readonly cabinRegularPriceInputLocator: Locator;
  readonly cabinDiscountInputLocator: Locator;
  readonly cabinDescriptionInputLocator: Locator;
  readonly cabinImageInputLocator: Locator;

  constructor(private page: Page) {
    this.cabinNameInputLocator = page.getByLabel("Cabin name");
    this.cabinMaximumCapacityInputLocator = page.getByLabel("Maximum capacity");
    this.cabinRegularPriceInputLocator = page.getByLabel("Regular price");
    this.cabinDiscountInputLocator = page.getByLabel("Discount");
    this.cabinDescriptionInputLocator = page.getByLabel(
      "Description for website"
    );
    this.cabinImageInputLocator = page.getByLabel("Cabin photo");
  }

  async fillCabinForm(config?: FillFormParam) {
    const cabinName = generateUniqueCabinName();

    const {
      name = cabinName,
      description = "A cozy cabin in the woods",
      maxCapacity = 4,
      regularPrice = 200,
      discount = 20,
      image = path.resolve("tests/images/image-1.jpg"),
    } = config || {};

    await this.cabinNameInputLocator.fill(name);

    await this.cabinMaximumCapacityInputLocator.fill(maxCapacity.toString());
    await this.cabinRegularPriceInputLocator.fill(regularPrice.toString());
    await this.cabinDiscountInputLocator.fill(discount.toString());
    await this.cabinDescriptionInputLocator.fill(description);

    await this.cabinImageInputLocator.setInputFiles(image);

    return name;
  }
}
