import { test, expect } from '@playwright/test';

const testURL = "https://coffee-cart.app/"

test.describe('coffee-cart app',() => {
  test.beforeEach(async ({ page }) => {
    await page.goto(testURL);
  });


test('Verify opening coffee application navigates the user to Coffee catalog Page',async ({ page }) => {
await page.getByText('menucart (0)githubEspresso $').click();
await expect(page.getByText('menucart (0)githubEspresso $')).toBeVisible();
});

test("Verify adding a coffee in the shopping cart by left click on any coffee item", async ({ page }) => {
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.getByLabel('Cart page')).toContainText('cart (2)');
});

test("Verify adding a coffee in the shopping cart by right click on any coffee item", async ({ page }) => {
  await page.locator('[data-test="Espresso_Macchiato"]').click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.locator('[data-test="Cappuccino"]').click({
    button: 'right'
  });
  await page.getByRole('button', { name: 'Yes' }).click();
  await expect(page.getByRole('listitem').filter({ hasText: 'cart (2)' })).toBeVisible();
  });


test('Verify that application displays always the header which includes menu, cart and github',async ({ page }) => {
    await expect(page.getByRole('listitem').filter({ hasText: 'menu' })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'cart (0)' })).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'github' })).toBeVisible();
    });


test('Verify promotional offer on adding every 3rd coffee into the shopping cart',async ({ page }) => {
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate').click();
  await expect(page.getByText('It\'s your lucky day! Get an extra cup of Mocha for $4.espressochocolate')).toBeVisible();   
});  
      
test('"Verify that user can always navigate to shopping cart page using cart in the header',async ({ page }) => {
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.getByRole('link', { name: 'Cart page' }).click();
  await expect(page.locator('div').filter({ hasText: 'Cappuccino x 1+-Espresso' }).nth(1)).toBeVisible();
  });


test('Verify getting payment link via payment pop up', async ({ page }) => {
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Americano"]').click();
  await page.getByRole('listitem').filter({ hasText: 'cart (2)' }).click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole('textbox', { name: 'Name' }).fill('Divya');
  await page.getByRole('textbox', { name: 'Email' }).fill('xyz@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
});

test('Verify deleting coffee items from shopping cart',async ({ page }) => {
await page.locator('[data-test="Espresso_Macchiato"]').click();
await page.locator('[data-test="Cappuccino"]').click();
await page.getByRole('listitem').filter({ hasText: 'cart (2)' }).click();
await page.getByRole('button', { name: 'Remove one Cappuccino' }).click();
await expect(page.locator('#app')).toContainText('Espresso Macchiato x 1+-Total: $12.00Payment details×We will send you a payment link via email.NameEmailI would like to receive order updates and promotional messages.SubmitItemUnitTotalEspresso Macchiato$12.00 x 1+-$12.00x');
});

test('Verify updating count of every coffee item in the shopping cart',async ({ page }) => {
await page.locator('[data-test="Espresso_Macchiato"]').click();
await page.locator('[data-test="Cappuccino"]').click();
await page.getByRole('listitem').filter({ hasText: 'cart (2)' }).click();
await expect(page.getByText('Cappuccino x 1+-Espresso Macchiato x 1+-Total: $31.00Payment details×We will')).toBeVisible();
});

test('Verify hovering coffee on coffee page shows the animation by tilting the coffee item and changes color to Orange',async ({ page }) => {
await expect(page.locator('[data-test="Cappuccino"]')).toBeVisible();
}); 
  
 test('Verify the ingredients of every coffee in coffee catalog page',async ({ page }) => {
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.locator('[data-test="Flat_White"]')).toContainText('espressosteamed milk');
  await expect(page.locator('[data-test="Cappuccino"]')).toContainText('espressosteamed milkmilk foam'); 
});


 test("Verify checking advertisement by activating ad into URL", async ({ page }) => {
 await page.getByRole('link', { name: 'GitHub page' }).click();
 await page.getByRole('link', { name: 'https://coffee-cart.app/?ad=' }).click();
 await expect(page.getByRole('button', { name: 'free 1 bag of coffe beans' })).toBeVisible();
 });

 test("Verify by double click on any coffee item translate the coffee name into chinese", async ({ page }) => {
 await page.getByRole('heading', { name: 'Espresso Macchiato $' }).dblclick();
 await expect(page.locator('#app')).toContainText('浓缩玛奇朵 $12.00');
});

test("Verify removing items from shopping cart by hovering on Total icon",async ({ page }) => {
await page.locator('[data-test="Espresso_Macchiato"]').click();
await page.locator('[data-test="Cappuccino"]').click();
await page.locator('[data-test="Americano"]').click();
await page.getByRole('button', { name: 'Yes, of course!' }).click();
await page.getByRole('listitem').filter({ hasText: 'cart (4)' }).click();
await page.getByText('$4.00 x').click();
});

test("Verify clicking on Total navigates user to Payment detail pop up",async ({ page }) => {
await page.locator('[data-test="Espresso_Macchiato"]').click();
await page.locator('[data-test="Cappuccino"]').click();
await page.getByRole('listitem').filter({ hasText: 'cart (2)' }).click();
await page.locator('[data-test="checkout"]').click();
await expect(page.getByText('Payment details×')).toBeVisible();
});

test('Verify removing items in the cart when some coffee items are already available in the cart page',async ({ page }) => {
await page.locator('[data-test="Espresso_Macchiato"]').click();
await page.locator('[data-test="Cappuccino"]').click();
await page.getByRole('listitem').filter({ hasText: 'cart (2)' }).click();
await page.getByRole('button', { name: 'Remove all Cappuccino' }).click();
await expect(page.getByText('Espresso Macchiato$12.00 x 1')).toBeVisible();
});

test("Verify navigating github page for more information about the application",async ({ page }) => {
await page.goto('https://coffee-cart.app/github');
await page.getByRole('listitem').filter({ hasText: 'github' }).click();
await expect(page.locator('#app')).toContainText('Here are the extra actions you can perform apart from the usual add to cart flows.');
});
});
