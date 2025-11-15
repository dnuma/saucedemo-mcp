import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { ProductDetailPage } from '../pages/product-detail.page';
import { CartPage } from '../pages/cart.page';

const VISUAL_USER = 'visual_user';
const PASSWORD = 'secret_sauce';

test.describe('Visual Regression Tests - Visual User (Expected Failures)', () => {
  test.beforeEach(async ({ page }) => {
    // Login with visual_user before each test
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(VISUAL_USER, PASSWORD);
    // Wait for inventory page to load
    const inventoryPage = new InventoryPage(page);
    await expect(inventoryPage.productsHeading).toBeVisible();
  });

  test('TC-VU-001: Visual Regression - Login Page Screenshot', async ({ page }) => {
    // Navigate to login page
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    
    // Take screenshot of login page - this should show visual styling differences
    await expect(page).toHaveScreenshot('visual-user-login-page.png');
  });

  test('TC-VU-002: Visual Regression - Inventory (Listing) Page Screenshot', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    
    // Verify we're on inventory page
    await expect(inventoryPage.productsHeading).toBeVisible();
    await expect(inventoryPage.productsList).toBeVisible();
    
    // Note: visual_user will have broken product images on this page
    // This screenshot should show visual differences from standard_user
    await expect(page).toHaveScreenshot('visual-user-inventory-page.png');
  });

  test('TC-VU-003: Visual Regression - Product Detail Page (Product 1)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on first product
    await inventoryPage.clickProductByIndex(0);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Note: Product image for visual_user may not render correctly
    // Expected visual issues: broken image, layout inconsistencies
    await expect(page).toHaveScreenshot('visual-user-product-detail-1.png');
  });

  test('TC-VU-004: Visual Regression - Product Detail Page (Product 2)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on second product
    await inventoryPage.clickProductByIndex(1);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Expected to show visual rendering issues specific to visual_user
    await expect(page).toHaveScreenshot('visual-user-product-detail-2.png');
  });

  test('TC-VU-005: Visual Regression - Product Detail Page (Product 3)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on third product
    await inventoryPage.clickProductByIndex(2);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Expected to show visual rendering issues specific to visual_user
    await expect(page).toHaveScreenshot('visual-user-product-detail-3.png');
  });

  test('TC-VU-006: Visual Regression - Product Detail Page (Product 4)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on fourth product
    await inventoryPage.clickProductByIndex(3);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Expected to show visual rendering issues specific to visual_user
    await expect(page).toHaveScreenshot('visual-user-product-detail-4.png');
  });

  test('TC-VU-007: Visual Regression - Product Detail Page (Product 5)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on fifth product
    await inventoryPage.clickProductByIndex(4);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Expected to show visual rendering issues specific to visual_user
    await expect(page).toHaveScreenshot('visual-user-product-detail-5.png');
  });

  test('TC-VU-008: Visual Regression - Product Detail Page (Product 6)', async ({ page }) => {
    const inventoryPage = new InventoryPage(page);
    const productDetailPage = new ProductDetailPage(page);
    
    // Click on sixth product
    await inventoryPage.clickProductByIndex(5);
    
    // Verify product info is visible
    await expect(productDetailPage.productTitle).toBeVisible();
    await expect(productDetailPage.productPrice).toBeVisible();
    await expect(productDetailPage.productDescription).toBeVisible();
    
    // Expected to show visual rendering issues specific to visual_user
    await expect(page).toHaveScreenshot('visual-user-product-detail-6.png');
  });

  test('TC-VU-009: Visual Regression - Cart Page with Multiple Products', async ({ page }) => {
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
    
    // Note: Cart items for visual_user may display with broken images
    // and potential layout inconsistencies due to visual rendering issues
    // This is expected behavior for the visual_user account
    await expect(page).toHaveScreenshot('visual-user-cart-page-with-items.png');
  });
});
