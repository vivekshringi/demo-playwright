import { type Locator, type Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  public readonly headerTitle: Locator;
  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.getByTestId("headerTitle");
  }
}
