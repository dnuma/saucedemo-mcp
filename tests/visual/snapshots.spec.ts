import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { ProductDetailPage } from '../pages/product-detail.page';
import { CartPage } from '../pages/cart.page';

const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('Visual Regression Tests - Saucedemo', () => {
  test.beforeEach(async ({ page }) => {
    // Login with standard_user before each test
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(STANDARD_USER, PASSWORD);
    // Wait for inventory page to load
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.productsHeading).toBeVisible();
  });

  test('Screenshot assertion - Main/Login Page', async ({ page }) => {
    // Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    // Take screenshot of login page
    await expect(page).toHaveScreenshot('login-page.png');
  });

  test('Screenshot assertion - Inventory (Listing) Page', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Verify we're on inventory page
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productsList).toBeVisible();
    
    // Take screenshot of inventory page
    await expect(page).toHaveScreenshot('inventory-page.png');
  });

  test('Screenshot assertion - Product Detail Page (Product 1)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on first product
    await inventoryPage.clickProductByIndex(0);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Take screenshot of product detail page
    await expect(page).toHaveScreenshot('product-detail-1.png');
  });

  test('Screenshot assertion - Product Detail Page (Product 2)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on second product
    await inventoryPage.clickProductByIndex(1);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Take screenshot of product detail page
    await expect(page).toHaveScreenshot('product-detail-2.png');
  });

  test('Screenshot assertion - Product Detail Page (Product 3)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on third product
    await inventoryPage.clickProductByIndex(2);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Take screenshot of product detail page
    await expect(page).toHaveScreenshot('product-detail-3.png');
  });

  test('Screenshot assertion - Product Detail Page (Product 4)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on fourth product
    await inventoryPage.clickProductByIndex(3);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Take screenshot of product detail page
    await expect(page).toHaveScreenshot('product-detail-4.png');
  });

  test('Screenshot assertion - Product Detail Page (Product 5)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on fifth product
    await inventoryPage.clickProductByIndex(4);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Take screenshot of product detail page
    await expect(page).toHaveScreenshot('product-detail-5.png');
  });

  test('Screenshot assertion - Product Detail Page (Product 6)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on sixth product
    await inventoryPage.clickProductByIndex(5);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Take screenshot of product detail page
    await expect(page).toHaveScreenshot('product-detail-6.png');
  });

  test('Screenshot assertion - Cart Page with First and Last Product', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    
    // Add first product (index 0) to cart
    await inventoryPage.addProductToCartByIndex(0);
    
    // Add last product (index 5) to cart
    await inventoryPage.addProductToCartByIndex(5);
    
    // Navigate to cart
    await inventoryPage.goToCart();
    
    // Verify cart items are visible
    await expect(cartPage.cartContainer).toBeVisible();
    
    // Wait for cart to fully load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of cart page
    await expect(page).toHaveScreenshot('cart-page-with-items.png');
  });
});
