import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

const testURL = "https://coffee-cart.app";

test.describe("home page @Home", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    await page.goto(testURL);
    homePage = new HomePage(page);
  });

  test("Verify opening coffee application navigates the user to Coffee catalog Page", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-4" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-16",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
    
    await expect(homePage.menu).toHaveClass("router-link-active router-link-exact-active");

    //await expect(page.getByRole("link")).toHaveClass('router-link-active router-link-exact-active');

  });

  test("Verify that application displays always the header which includes menu, cart and github", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-5" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-21",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
    await expect(homePage.menu).toBeVisible();
    await expect(homePage.github).toBeVisible();
    await expect(homePage.cart).toBeVisible();
    await expect(homePage.cart).toHaveText("cart (0)");
  });

  test("Verify that user can always navigate to shopping cart page using cart in the header", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-9" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-21",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("Verify adding a coffee in the shopping cart by right click on any coffee item", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-8" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-26",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });

    homePage.hoverOn()
    await expect(homePage.clickOn('Espresso'));
  });

  test("Verify adding a coffee in the shopping cart by left click on any coffee item", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-7" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-27",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
    // Verification is using Espresso for the left click
    //await homePage.getByRole('button', { name: 'espresso' }).click();
    await expect(homePage.getByText('espresso')).toBeVisible();
    //await homePage.getByText('espresso').click();

  });

});
