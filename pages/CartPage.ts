import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartItemsList: Locator;
  readonly totalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItemsList = page.locator('div.cart-items');
    this.totalButton = page.locator('button[data-testid="checkout"]');
  }

  async viewCart() {
    await this.page.goto('/cart');
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartItemsList.count();
  }

  async proceedToCheckout() {
    await this.totalButton.click();
  }
}
