import { type Locator, type Page } from "@playwright/test";
export class MenuPage {
   readonly page: Page;
   readonly menu: Locator;
   readonly cart: Locator;
   readonly github : Locator;
   readonly coffeeImage : Locator;
   readonly coffee: Locator;
   readonly totalButton: Locator;


   constructor(page: Page) {
      this.page = page;
      this.menu = page.getByLabel("Menu Page");
      this.cart = page.getByRole("link").getByText("cart");
      this.github = page.locator('a[href*="/github"]');
      this.coffeeImage = page.locator(".cup");
      this.coffee = page.getByRole("list").getByRole("heading");
      this.totalButton = page.getByTestId("checkout");
}


async goToURl(){
   await this.page.goto("https://coffee-cart.app/");
}

async getCoffeeByLeftClick(coffeeName: string){
   await this.coffee.getByText(coffeeName).click({ button: 'left' });
}

async getCoffeeByRightClick(coffeeName:string){
  await this.coffee.getByText(coffeeName).click({ button: 'right' });
  await this.coffee.getByRole('button', { name: 'Yes' }).click();
}

async getCartPage(cart:string){
   await this.cart.getByRole("link").getByText("cart").click();
}
async getGithubPage(github:string){
   await this.github.locator('a[href*="/github"]').click();
}
async getPromoPage(coffeeName:string){
   await this.coffee.getByText(coffeeName).click({ button: 'left' });
   await this.coffee.getByText(coffeeName).click({ button: 'left' });
   await this.coffee.getByText(coffeeName).click({ button: 'left' });
}
async getPaymentPopUp(totalButton: string){
   await this.totalButton.getByTestId("checkout").click();
}

async getCoffeeCount() {
   return await this.coffee.count();
 }

async updatingCoffee(operation: string, coffeeName: string) {
   await this.totalButton.hover();
   await this.page
     .locator(".cart-preview")
     .locator(".unit-controller")
     .getByLabel(operation + " one " + coffeeName)
     .click();
 }

 async getCoffeeBorderColor() {
   await this.coffeeImage.first().evaluate("el=>getComputedStyle(el).borderColor");
 }

 async getCoffeeIngredients(coffeeName: string) {
   return this.coffeeImage.getByTestId(coffeeName).locator('[class*="ingredient"]');
 }

 async doubleClickOn(coffeeName: string) {
   await this.coffee.getByText(coffeeName).first().dblclick();
 }

 async getCoffeeCountOnTotal() {
   return await this.page.locator(".cart-preview").locator(".list-item").locator("span.unit-desc").innerText();
 }
  
 async getCoffeePrice(coffeeName: string) {
   return await this.coffee.getByText(coffeeName).locator("small").innerText();
 }



}