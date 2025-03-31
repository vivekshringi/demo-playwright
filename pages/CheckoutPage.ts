import { Page, Locator } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly nameField: Locator;
  readonly emailField: Locator;
  readonly submitOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameField = page.locator('input[name="name"]');
    this.emailField = page.locator('input[name="email"]');
    this.submitOrderButton = page.locator('button[type="submit"]');
  }

  async fillOutCheckoutForm(name: string, email: string) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
  }

  async submitOrder() {
    await this.submitOrderButton.click();
  }
}
