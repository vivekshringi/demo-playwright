import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import data from "../data/data.json";

const testURL = "https://coffee-cart.app";

test.describe("parameterized tests @Home", () => {
  let homePage: HomePage;
  interface coffee {
    coffeeName: string;
    translation: string;
  }
  const coffeeData: coffee[] = data;

  test.beforeEach(async ({ page }) => {
    await page.goto(testURL);
    homePage = new HomePage(page);
  });

  coffeeData.forEach(({ coffeeName, translation }) => {
    test(`if ${coffeeName} is translated to ChineseName as ${translation}} on performing double click @coffeeMenu`, async () => {
      await homePage.doubleClickOn(coffeeName);
      await expect(homePage.coffee.getByText(translation)).toBeVisible();
    });
  });
});
