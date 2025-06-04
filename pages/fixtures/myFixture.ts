import { test as base } from "@playwright/test";
import { CartPage } from "../CartPage";
import { HomePage } from "../HomePage";
import { PromotionPage } from "../PromotionPage";

type MyFixtures = {
  homePage: HomePage;
  cartPage: CartPage;
  promotionPage: PromotionPage;
};

export const test = base.extend<MyFixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  cartPage: async ({ homePage, page }, use) => {
    homePage.cart.click();
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  promotionPage: async ({ homePage,page }, use) => {
    homePage.clickOn("Espresso");
    homePage.clickOn("Espresso");
    homePage.clickOn("Espresso");
    const promotionPage = new PromotionPage(page);
    await use(promotionPage);
  },
});
export { expect } from "@playwright/test";
