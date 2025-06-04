import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import mockData from "../data/mock.json";

const testURL = "https://coffee-cart.app";

test.describe("mock network api", () => {
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    await page.route("*/**/list.json", async (route) => {
      const json = mockData;
      await route.fulfill({ json });
    });
    await page.goto(testURL);
    console.log(mockData);
    homePage = new HomePage(page);
  });

  test("if coffee count is correct @coffeeMenu", async () => {
    await expect(homePage.coffee).toHaveCount(1);
    expect(await homePage.getCoffeeCount()).toEqual(1);
  });
});
