import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly cartContainer: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly emptyCartText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="cart-list"] [data-test="inventory-item"]');
    this.cartContainer = page.locator('[data-test="cart-contents-container"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.emptyCartText = page.locator('text=Your cart is empty');
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async removeItemByIndex(index: number): Promise<void> {
    const item = this.cartItems.nth(index);
    const removeButton = item.locator('button[data-test*="remove"]');
    await removeButton.click();
  }

  async getItemNameByIndex(index: number): Promise<string> {
    const item = this.cartItems.nth(index);
    const nameText = await item.locator('[data-test="inventory-item-name"]').textContent();
    return nameText || '';
  }

  async getItemPriceByIndex(index: number): Promise<string> {
    const item = this.cartItems.nth(index);
    const priceText = await item.locator('[data-test="inventory-item-price"]').textContent();
    return priceText || '';
  }

  async goToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async isCartEmpty(): Promise<boolean> {
    return (await this.cartItems.count()) === 0;
  }

  async goBackToShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async removeAllItems(): Promise<void> {
    let count = await this.getCartItemCount();
    while (count > 0) {
      await this.removeItemByIndex(0);
      count = await this.getCartItemCount();
    }
  }
}
