import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly page: Page;
  readonly noCoffeeMessage: Locator;
  readonly totalButton: Locator;
  readonly listHeader: Locator;
  readonly listItem: Locator;
  readonly listItems: Locator;
  readonly unit: Locator;
  readonly updateUnit: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.noCoffeeMessage = page.locator(".list>p");
    this.totalButton = page.getByTestId("checkout");
    this.listHeader = page.locator(".list-header>div");
    this.listItems = page.locator(".list-item>div");
    this.listItem = page.locator("li.list-item").last();
    this.unit = page.locator(".unit-desc");
    this.updateUnit = page.locator(".unit-controller");
  }

  async updateCoffee(action: string, coffeeName: string) {
    await this.updateUnit
      .getByRole("button")
      .getByText(action + " one " + coffeeName)
      .click();
  }

  async getCoffeeCount(no: number) {
    const coffeeSummary = await this.listItem.nth(no).locator(".unit-desc").innerText();
    const sIndex = coffeeSummary.indexOf("x");
    return Number(coffeeSummary.substring(sIndex + 1).trim());
  }

  async getSubTotal() {
    return await this.listItem.locator("div+div+div").first().innerText();
  }

  async deleteAll(coffeeName: string) {
    await this.page.getByLabel("Remove all " + coffeeName).click();
  }
}
