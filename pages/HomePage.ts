import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
  readonly page: Page;
  public readonly menu: Locator;
  public readonly cart: Locator;
  public readonly github: Locator;
  public readonly bar: Locator;
  public readonly coffeeImage: Locator;
  public readonly coffee: Locator;
  public readonly totalButton: Locator;
  public readonly inputName: Locator;
  public readonly inputEmail: Locator;
  public readonly checkBoxForOrderUpdateAndPromotionalMessage: Locator;
  public readonly submit: Locator;
  public readonly message: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.menu = page.getByLabel("Menu Page");
    this.cart = page.getByRole("link").getByText("cart");
    this.github = page.locator('a[href*="/github"]');
    this.bar = page.locator(".snacbar");
    this.coffeeImage = page.locator(".cup");
    this.coffee = page.getByRole("list").getByRole("heading");
    this.totalButton = page.getByTestId("checkout");
    this.inputName = page.locator("input#name");
    this.inputEmail = page.locator("input#email");
    this.checkBoxForOrderUpdateAndPromotionalMessage = page.locator('input[type="checkbox"][name="promotion"]');
    this.submit = page.getByRole("button").getByText("Submit");
    this.message = page.locator(".snackbar.success");
  }

  async hoverOn() {
    await this.coffeeImage.first().hover();
  }

  async getCoffeeCount() {
    return await this.coffee.count();
  }

  async clickOn(coffeeName: string) {
    await this.coffeeImage.getByTestId(coffeeName).click();
  }

  async doubleClickOn(coffeeName: string) {
    await this.coffee.getByText(coffeeName).first().dblclick();
  }

  async updatingCoffee(operation: string, coffeeName: string) {
    await this.totalButton.hover();
    await this.page
      .locator(".cart-preview")
      .locator(".unit-controller")
      .getByLabel(operation + " one " + coffeeName)
      .click();
  }

  async getCoffeeCountOnTotal() {
    return await this.page.locator(".cart-preview").locator(".list-item").locator("span.unit-desc").innerText();
  }

  async getCoffeeBorderColor() {
    await this.coffeeImage.first().evaluate("el=>getComputedStyle(el).borderColor");
  }

  async getCoffeePrice(coffeeName: string) {
    return await this.coffee.getByText(coffeeName).locator("small").innerText();
  }

  async getCoffeeIngrediants(coffeeName: string) {
    return this.coffeeImage.getByTestId(coffeeName).locator('[class*="ingredient"]');
  }

  async getTotal() {
    const previ = await this.totalButton.innerText();
    const start = previ.indexOf("$");
    const end = previ.indexOf(".");
    const balance = Number(previ.substring(start + 1, end));
    return balance;
  }

  async submitPaymentDetails(userName: string, userEmail: string, getOrderUpdate: boolean) {
    await this.inputName.fill(userName);
    await this.inputEmail.fill(userEmail);
    if (getOrderUpdate) {
      await this.checkBoxForOrderUpdateAndPromotionalMessage.check();
    }
    await this.submit.click();
    await expect(this.message).toBeVisible();
    await expect(this.message).toContainText("Thanks for your purchase. Please check your email for payment.");
  }

  async getIngredientsPercent(coffeeName: string) {
    const percentage: string[] = [];
    const coffee = this.coffeeImage.getByTestId(coffeeName).locator('[class*="ingredient"]').all();
    for (const val of await coffee) {
      const style = await val.getAttribute("style");
      if (style) {
        percentage.push(style);
      }
    }
    return percentage;
  }
}
