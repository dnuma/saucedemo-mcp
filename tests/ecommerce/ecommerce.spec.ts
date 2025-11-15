import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';
const CHECKOUT_FIRST_NAME = 'Test';
const CHECKOUT_LAST_NAME = 'User';
const CHECKOUT_POSTAL_CODE = '12345';

test.describe('SauceDemo E-Commerce Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate and login with standard_user
    await loginPage.navigate();
    await loginPage.login(STANDARD_USER, PASSWORD);

    // Verify we're on the inventory page
    await expect(page).toHaveURL(/.*inventory\.html/);
    expect(await inventoryPage.isProductsVisible()).toBeTruthy();
  });

  test('Test 1: Add 1 product to cart and finalize transaction', async ({ page }) => {
    // Step 1: Add first product to cart from listing view
    await inventoryPage.addProductToCartByIndex(0);

    // Verify cart badge shows 1 item
    expect(await inventoryPage.isCartBadgeVisible()).toBeTruthy();
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    // Step 2: Go to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    // Verify cart has 1 item
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(1);

    // Step 3: Proceed to checkout
    await cartPage.goToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // Step 4: Fill checkout information
    await checkoutPage.completeCheckout(
      CHECKOUT_FIRST_NAME,
      CHECKOUT_LAST_NAME,
      CHECKOUT_POSTAL_CODE
    );

    // Step 5: Verify transaction is completed
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    const isOrderCompleted = await checkoutPage.isOrderCompleted();
    expect(isOrderCompleted).toBeTruthy();

    const completionMessage = await checkoutPage.getOrderCompleteMessage();
    expect(completionMessage).toContain('Thank you');
  });

  test('Test 2: Add 1 product from listing, 2 random products from detailed view, and finalize', async ({
    page,
  }) => {
    const productsToAdd: number[] = [];

    // Step 1: Add first product from listing view
    await inventoryPage.addProductToCartByIndex(0);
    productsToAdd.push(0);
    expect(await inventoryPage.getCartBadgeCount()).toBe(1);

    // Step 2: Click on product to view details and add 2 different random products
    // Get random product indices (excluding the first one already added)
    const productCount = await inventoryPage.getProductCount();
    const randomIndices: number[] = [];

    while (randomIndices.length < 2) {
      const randomIndex = Math.floor(Math.random() * productCount);
      if (randomIndex !== 0 && !randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }

    // Add first random product from details view
    await inventoryPage.clickProductByIndex(randomIndices[0]);
    await expect(page).toHaveURL(/.*inventory-item\.html/);

    // Add to cart from details page
    const addToCartButton = page.locator('button[data-test*="add-to-cart"]');
    await addToCartButton.click();
    expect(await inventoryPage.getCartBadgeCount()).toBe(2);

    // Go back to inventory
    const backButton = page.locator('[data-test="back-to-products"]');
    if (await backButton.isVisible()) {
      await backButton.click();
    } else {
      await inventoryPage.goToCart();
      await cartPage.goBackToShopping();
    }
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Add second random product from details view
    await inventoryPage.clickProductByIndex(randomIndices[1]);
    await expect(page).toHaveURL(/.*inventory-item\.html/);

    // Add to cart from details page
    await addToCartButton.click();
    expect(await inventoryPage.getCartBadgeCount()).toBe(3);

    // Step 3: Go to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    // Verify cart has 3 items
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(3);

    // Step 4: Proceed to checkout
    await cartPage.goToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // Step 5: Fill checkout information
    await checkoutPage.completeCheckout(
      CHECKOUT_FIRST_NAME,
      CHECKOUT_LAST_NAME,
      CHECKOUT_POSTAL_CODE
    );

    // Step 6: Verify transaction is completed
    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    const isOrderCompleted = await checkoutPage.isOrderCompleted();
    expect(isOrderCompleted).toBeTruthy();

    const completionMessage = await checkoutPage.getOrderCompleteMessage();
    expect(completionMessage).toContain('Thank you');
  });

  test('Test 3: Add random products (2-5), then delete all and validate cart is empty', async ({
    page,
  }) => {
    // Step 1: Generate random number between 2-5
    const randomProductCount = Math.floor(Math.random() * 4) + 2; // Random between 2-5
    const productCount = await inventoryPage.getProductCount();
    const selectedIndices: number[] = [];

    // Step 2: Add random products using mix of listing and detail views
    for (let i = 0; i < randomProductCount; i++) {
      let randomIndex: number;

      // Get a random index that hasn't been used
      do {
        randomIndex = Math.floor(Math.random() * productCount);
      } while (selectedIndices.includes(randomIndex));

      selectedIndices.push(randomIndex);

      // Randomly choose between adding from listing or detail view
      const useDetailView = Math.random() > 0.5;

      if (useDetailView && i < randomProductCount - 1) {
        // Add from detail view
        await inventoryPage.clickProductByIndex(randomIndex);
        await expect(page).toHaveURL(/.*inventory-item\.html/);

        const addToCartButton = page.locator('button[data-test*="add-to-cart"]');
        await addToCartButton.click();

        // Go back to inventory
        const backButton = page.locator('[data-test="back-to-products"]');
        if (await backButton.isVisible()) {
          await backButton.click();
        } else {
          await inventoryPage.goToCart();
          await cartPage.goBackToShopping();
        }
        await expect(page).toHaveURL(/.*inventory\.html/);
      } else {
        // Add from listing view
        await inventoryPage.addProductToCartByIndex(randomIndex);
      }
    }

    // Verify cart has the correct number of items
    expect(await inventoryPage.getCartBadgeCount()).toBe(randomProductCount);

    // Step 3: Go to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    // Verify cart shows correct item count before deletion
    let cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(randomProductCount);

    // Step 4: Delete all items from cart
    await cartPage.removeAllItems();

    // Step 5: Verify cart is empty
    const isCartEmpty = await cartPage.isCartEmpty();
    expect(isCartEmpty).toBeTruthy();

    cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(0);
  });
});
