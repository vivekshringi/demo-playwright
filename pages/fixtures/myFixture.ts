import { test as base } from "@playwright/test";
import { CartPage } from "../CartPage";
import { HomePage } from "../HomePage";
import { PromotionPage } from "../PromotionPage";

type Coffee = string;

type MyFixtures = {
  homePage: HomePage;
  cartPageWithCoffees: CartPage;
  cartPage: CartPage;
  promotionPage: PromotionPage;
};

export const test = base.extend<MyFixtures, { coffee: Coffee }>({
  coffee: [
    "Espresso",
    {
      option: true,
      scope: "worker",
    },
  ],
  homePage: async ({ page }, use) => {
    await page.goto("/");
    const homePage = new HomePage(page);
    await use(homePage);
  },
  cartPage: async ({ homePage, page }, use) => {
    homePage.cart.click();
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  cartPageWithCoffees: async ({ homePage, page, coffee }, use) => {
    await homePage.clickOn(coffee);
    await homePage.clickOn(coffee);
    await homePage.clickOn(coffee);
    await homePage.cart.click();
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  promotionPage: async ({ homePage, page, coffee }, use) => {
    await homePage.clickOn(coffee);
    await homePage.clickOn(coffee);
    await homePage.clickOn(coffee);
    const promotionPage = new PromotionPage(page);
    await use(promotionPage);
  },
});
export { expect } from "@playwright/test";
