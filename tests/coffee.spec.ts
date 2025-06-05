import { test, expect } from "../pages/fixtures/myFixture";
import { faker } from "@faker-js/faker";

const testURL = "https://coffee-cart.app";

test.describe.configure({ mode: "parallel" });

test.describe("home page @Home", () => {
  const username = faker.internet.username();
  const email = faker.internet.email();

  test(`should get the payment link on email`, async ({ homePage }, testInfo) => {
    await test.step("given I am on the home page", async () => {
      await expect.soft(homePage.inputName).toBeVisible();
      await expect(homePage.page).toHaveURL(testURL);
    });

    await test.step("when I click on the Total button", async () => {
      await homePage.totalButton.click();
    });

    await test.step("then I should see the payment pop up and should able to send the details", async () => {
      await expect(homePage.inputName).toBeVisible();
      await homePage.submitPaymentDetails(username, email, true);
      testInfo.annotations.push({ type: "test_key", description: "SCRUM-40" });
      testInfo.annotations.push({
        type: "requirement",
        description: "SCRUM-1",
      });
      testInfo.annotations.push({
        type: "tags",
        description: "automated, Playwright",
      });
    });
  });

  test("if deleting coffee items from shopping cart works correctly", async ({
    cartPageWithCoffees,
    homePage,
  }, testInfo) => {
    await test.step("Given 3 espresso coffee is already added into the cart", async () => {
      expect(await cartPageWithCoffees.getCoffeeCount(0)).toBe(3);
    });
    await test.step("When I removed all coffees in the cart", async () => {
      await cartPageWithCoffees.deleteAll("Espresso");
    });
    await test.step("Then I expect that cart is empty with no coffee", async () => {
      await expect(homePage.cart).toHaveText("cart (0)");
    });

    testInfo.annotations.push({ type: "test_key", description: "SCRUM-39" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-2",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if updating count of every coffee item in the shopping cart", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-38" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-57",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if hovering coffee on coffee page shows the animation by tilting the coffee item and changes color to Orange", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-37" });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if the ingredients of every coffee in coffee catalog page", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-31" });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if checking advertisement by activating ad into URL", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-19" });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if by double click on any coffee item translate the coffee name into chinese", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-15" });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if removing items from shopping cart by hovering on Total icon", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-14" });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if clicking on Total navigates user to Payment detail pop up", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-13" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-24",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if hovering on Total icon shows all the coffee in the cart", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-12" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-24",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if removing items in the cart when some coffee items are already available in the cart page", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-11" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-17",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if navigating github page for more information about the application", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-10" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-18",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });

  test("if user can always navigate to shopping cart page using cart in the header", async ({}, testInfo) => {
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

  test("if adding a coffee in the shopping cart by right click on any coffee item", async ({}, testInfo) => {
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
  });

  test("if adding a coffee in the shopping cart by left click on any coffee item", async ({}, testInfo) => {
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
  });

  test("if that application displays always the header which includes menu, cart and github", async ({
    homePage,
  }, testInfo) => {
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

  test("if opening coffee application navigates the user to Coffee catalog Page", async ({}, testInfo) => {
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
  });

  test("if promotional offer on adding every 3rd coffee into the shopping cart", async ({}, testInfo) => {
    //Adding Xray properties
    testInfo.annotations.push({ type: "test_key", description: "SCRUM-25" });
    testInfo.annotations.push({
      type: "requirement",
      description: "SCRUM-28",
    });
    testInfo.annotations.push({
      type: "tags",
      description: "automated, Playwright",
    });
  });
});
