import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly productsHeading: Locator;
  readonly productsList: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
  readonly sidebarButton: Locator;
  readonly sortContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsHeading = page.locator('text=Products');
    this.productsList = page.locator('[data-test="inventory-container"]');
    this.cartButton = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.sidebarButton = page.locator('[data-test="menu-button"]');
    this.sortContainer = page.locator('[data-test="product-sort-container"]');
  }

  async isProductsVisible(): Promise<boolean> {
    return this.productsHeading.isVisible();
  }

  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  async getPageUrl(): Promise<string> {
    return this.page.url();
  }

  async getProductCount(): Promise<number> {
    const products = this.page.locator('[data-test="inventory-item"]');
    return products.count();
  }

  async getProductName(index: number): Promise<string> {
    const product = this.page.locator('[data-test="inventory-item"]').nth(index);
    return product.locator('[data-test="inventory-item-name"]').textContent() || '';
  }

  async addProductToCartByIndex(index: number): Promise<void> {
    const product = this.page.locator('[data-test="inventory-item"]').nth(index);
    const addButton = product.locator('button[data-test*="add-to-cart"]');
    await addButton.click();
  }

  async clickProductByIndex(index: number): Promise<void> {
    const product = this.page.locator('[data-test="inventory-item"]').nth(index);
    const productName = product.locator('[data-test="inventory-item-name"]');
    await productName.click();
  }

  async getCartBadgeCount(): Promise<number> {
    const badgeText = await this.cartBadge.textContent();
    return badgeText ? parseInt(badgeText, 10) : 0;
  }

  async goToCart(): Promise<void> {
    await this.cartButton.click();
  }

  async isCartBadgeVisible(): Promise<boolean> {
    return this.cartBadge.isVisible();
  }

  async removeProductFromCartByIndex(index: number): Promise<void> {
    const product = this.page.locator('[data-test="inventory-item"]').nth(index);
    const removeButton = product.locator('button[data-test*="remove"]');
    if (await removeButton.isVisible()) {
      await removeButton.click();
    }
  }
}
