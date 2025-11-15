import { Page, Locator } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productTitle: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    // Updated selectors based on class names used in the application
    this.productTitle = page.locator('.inventory_details_name');
    this.productPrice = page.locator('.inventory_details_price');
    this.productDescription = page.locator('.inventory_details_desc.large_size');
    this.productImage = page.locator('img[alt*="Sauce"]') || page.locator('img[src*="inventory"]');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.removeButton = page.locator('button:has-text("Remove")');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async getProductTitle(): Promise<string> {
    const title = await this.productTitle.textContent();
    return title || '';
  }

  async getProductPrice(): Promise<string> {
    const price = await this.productPrice.textContent();
    return price || '';
  }

  async getProductDescription(): Promise<string> {
    const description = await this.productDescription.textContent();
    return description || '';
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async isAddToCartVisible(): Promise<boolean> {
    return this.addToCartButton.isVisible();
  }

  async isRemoveVisible(): Promise<boolean> {
    return this.removeButton.isVisible();
  }

  async goBack(): Promise<void> {
    await this.backButton.click();
  }

  async isProductInfoVisible(): Promise<boolean> {
    return (
      (await this.productTitle.isVisible()) &&
      (await this.productPrice.isVisible()) &&
      (await this.productDescription.isVisible())
    );
  }
}
