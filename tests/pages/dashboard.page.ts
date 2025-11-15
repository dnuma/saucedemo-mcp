import { Page, Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly productsHeading: Locator;
  readonly productsList: Locator;
  readonly sidebarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productsHeading = page.locator('text=Products');
    this.productsList = page.locator('[data-test="inventory-container"]');
    this.sidebarButton = page.locator('[data-test="menu-button"]');
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
}
