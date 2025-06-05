import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { PromotionPage } from "../pages/PromotionPage";

const testURL = "https://coffee-cart.app";

test.describe("home page @Home", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto(testURL);
    homePage = new HomePage(page);
  });

  test("if page title is coffee cart", async ({ page }) => {
    await expect(page).toHaveTitle("Coffee cart");
    await expect(page).toHaveURL(testURL);
  });

  test("if top navigations are visible @fast", async ({}) => {
    await expect(homePage.menu).toBeVisible();
    await expect(homePage.github).toBeVisible();
    await expect(homePage.cart).toBeVisible();
    await expect(homePage.cart).toHaveText("cart (0)");
  });

  test("if default page is menu", async () => {
    await expect(homePage.menu).toHaveAttribute("aria-current", "page");
  });
});

test.describe("coffee menu @coffeeMenu", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto(testURL);
    homePage = new HomePage(page);
  });

  test("if coffee count is correct @coffeeMenu", async () => {
    await expect(homePage.coffee).toHaveCount(9);
    expect(await homePage.getCoffeeCount()).toEqual(9);
  });

  test("if coffeeName is translated to Chinese on performing double click @coffeeMenu", async () => {
    await homePage.doubleClickOn("Espresso");
    await expect(homePage.coffee.getByText("特浓咖啡")).toBeVisible();
  });

  test.fixme("if hover on any coffee changes the coffee color @coffeeMenu", async () => {
    await homePage.hoverOn();
    expect(await homePage.getCoffeeBorderColor()).toEqual("rgb");
  });

  test("if cart price and count on menu is upadated on ordering any coffee from the coffee menu @coffeeMenu", async () => {
    test.slow();
    // to increase the timeout to triple
    await homePage.clickOn("Americano");
    const expectedPrice = await homePage.getCoffeePrice("Americano");
    await expect(homePage.cart).toContainText("cart (1)");
    await expect(homePage.totalButton).toContainText(expectedPrice);
  });

  test("if cart price and count on menu is upadated on removing coffee from cart @coffeeMenu", async () => {
    await homePage.clickOn("Americano");
    await homePage.clickOn("Americano");
    await homePage.updatingCoffee("remove", "Americano");
    await expect(homePage.cart).toContainText("cart (1)");
    await expect(homePage.totalButton).toContainText("$7.00");
  });

  test("if total price is updated on removing a coffee from cart @coffeeMenu", async () => {
    await homePage.clickOn("Americano");
    await homePage.updatingCoffee("remove", "Americano");
    await expect(homePage.totalButton).toContainText("$0.00");
  });

  test.describe("coffee content", () => {
    test("if Espresso contains 30% espresso and 15% milk foam", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Espresso")).allInnerTexts();
      expect(names).toEqual(["espresso"]);
      const percentage = await homePage.getIngredientsPercent("Espresso");
      expect(percentage).toEqual(["height: 30%;"]);
    });
    test("if Espresso Macchiato coffee contains 30% espresso and 15% milk foam", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Espresso_Macchiato")).allInnerTexts();
      expect(names).toEqual(["espresso", "milk foam"]);
      const percentage = await homePage.getIngredientsPercent("Espresso_Macchiato");
      expect(percentage).toEqual(["height: 30%;", "height: 15%;"]);
    });
    test("if Cappiccino contains 30% espresso, 20% steamed milk and 50% milk foam", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Cappuccino")).allInnerTexts();
      expect(names).toEqual(["espresso", "steamed milk", "milk foam"]);
      const percentage = await homePage.getIngredientsPercent("Cappuccino");
      expect(percentage).toEqual(["height: 30%;", "height: 20%;", "height: 50%;"]);
    });
    test("if Mocha contains 30% espresso, 20% chocolate syrup, 25% steamed milk, 25% whipped cream", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Mocha")).allInnerTexts();
      expect(names).toEqual(["espresso", "chocolate syrup", "steamed milk", "whipped cream"]);
      const percentage = await homePage.getIngredientsPercent("Mocha");
      expect(percentage).toEqual(["height: 30%;", "height: 20%;", "height: 25%;", "height: 25%;"]);
    });
    test("if Flat white contains 30% espresso and 50% milk foam", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Flat_White")).allInnerTexts();
      expect(names).toEqual(["espresso", "steamed milk"]);
      const percentage = await homePage.getIngredientsPercent("Flat_White");
      expect(percentage).toEqual(["height: 30%;", "height: 50%;"]);
    });
    test("if Americano contains 30% espresso and 70% water", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Americano")).allInnerTexts();
      expect(names).toEqual(["espresso", "water"]);
      const percentage = await homePage.getIngredientsPercent("Americano");
      expect(percentage).toEqual(["height: 30%;", "height: 70%;"]);
    });
    test("if Caffee latte contains 30% espresso , 50% steamed milk and 20% milk foam", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Cafe_Latte")).allInnerTexts();
      expect(names).toEqual(["espresso", "steamed milk", "milk foam"]);
      const percentage = await homePage.getIngredientsPercent("Cafe_Latte");
      expect(percentage).toEqual(["height: 30%;", "height: 50%;", "height: 20%;"]);
    });
    test("if Espresso con panna contains 30% espresso and 15% whipped cream.", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Espresso_Con Panna")).allInnerTexts();
      expect(names).toEqual(["espresso", "whipped cream"]);
      const percentage = await homePage.getIngredientsPercent("Espresso_Con Panna");
      expect(percentage).toEqual(["height: 30%;", "height: 15%;"]);
    });
    test("if Cafe Breve contains 25% espresso, 30% steamed milk, 30% steamed cream and 15% milk foam", async () => {
      const names = await (await homePage.getCoffeeIngrediants("Cafe_Breve")).allInnerTexts();
      expect(names).toEqual(["espresso", "steamed milk", "steamed cream", "milk foam"]);
      const percentage = await homePage.getIngredientsPercent("Cafe_Breve");
      expect(percentage).toEqual(["height: 25%;", "height: 30%;", "height: 30%;", "height: 15%;"]);
    });
  });
});

test.describe("promo offer test @promo", () => {
  let homePage: HomePage;
  let promo: PromotionPage;

  test.beforeEach(async ({ page }) => {
    await page.goto(testURL);
    homePage = new HomePage(page);
    promo = new PromotionPage(page);
    await homePage.clickOn("Americano");
    await homePage.clickOn("Americano");
    await homePage.clickOn("Americano");
  });

  test("if promo offer is displayed after ordering 3 coffees", async () => {
    await expect(promo.promoTitle).toBeVisible();
    await expect(promo.promoTitle).toHaveText("It's your lucky day! Get an extra cup of Mocha for $4.");
  });

  test("if coffee is added on accepting the promo offer", async () => {
    const balance: number = await homePage.getTotal();
    await promo.yesButton.click();
    await expect(homePage.totalButton).toContainText(String(balance + 4));
  });
  test("if coffee is not added on not accepting the promo offer", async () => {
    const balance: number = await homePage.getTotal();
    await promo.noButton.click();
    await expect(homePage.totalButton).toContainText(String(balance));
  });

  test("if discounted mocha ingredeients are correct", async () => {
    const ingredients = await promo.getIngredients();
    const ingredientsPercent = await promo.getIngredientsPercent();
    expect(ingredients).toEqual(["espresso", "chocolate syrup", "steamed milk", "whipped cream"]);
    expect(ingredientsPercent).toEqual(["height: 30%;", "height: 20%;", "height: 25%;", "height: 25%;"]);
  });
});
