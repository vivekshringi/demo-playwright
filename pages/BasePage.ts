import { type Locator, type Page } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly totalButton: Locator;
  constructor(page: Page) {
    this.page = page;
    this.totalButton = page.getByTestId("checkout");
  }

  async getTotal() {
    const previ = await this.totalButton.innerText();
    const start = previ.indexOf("$");
    const end = previ.indexOf(".");
    const balance = Number(previ.substring(start + 1, end));
    return balance;
  }
}
