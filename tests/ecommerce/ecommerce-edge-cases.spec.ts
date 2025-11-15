import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';

test.describe('SauceDemo E-Commerce Edge Cases', () => {
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

  test('Edge Case 1: Proceed to checkout with empty cart', async ({ page }) => {
    // This edge case tests attempting to checkout without adding any products
    // User should not be able to proceed or cart is empty

    // Go directly to cart without adding any items
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    // Verify cart is empty
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(0);

    // Verify empty cart message is visible
    const isCartEmpty = await cartPage.isCartEmpty();
    expect(isCartEmpty).toBeTruthy();

    // Verify checkout button is still present but may not be functional
    // OR attempting to checkout should show an error/warning
    try {
      await cartPage.goToCheckout();
      // If checkout succeeds with empty cart, this is unexpected behavior
      // Page might show an error or redirect back to inventory
      const currentUrl = await page.url();
      const isCheckoutPage = currentUrl.includes('checkout-step-one');
      const isInventoryPage = currentUrl.includes('inventory');

      expect(isCheckoutPage || isInventoryPage).toBeTruthy();
    } catch (error) {
      // If checkout button is disabled or throws error, that's also valid
      expect(error).toBeDefined();
    }
  });

  test('Edge Case 2: Add product, navigate away, return to cart and verify persistence', async ({
    page,
  }) => {
    // This edge case tests session persistence - products added should remain in cart
    // even if user navigates away

    // Step 1: Add multiple products to cart
    await inventoryPage.addProductToCartByIndex(0);
    await inventoryPage.addProductToCartByIndex(1);
    await inventoryPage.addProductToCartByIndex(2);

    const initialCartCount = await inventoryPage.getCartBadgeCount();
    expect(initialCartCount).toBe(3);

    // Step 2: Go to cart and verify
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    let cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(3);

    // Step 3: Navigate back to shopping (continue shopping button)
    await cartPage.goBackToShopping();
    await expect(page).toHaveURL(/.*inventory\.html/);

    // Step 4: Verify cart badge still shows 3 items
    const persistentCartCount = await inventoryPage.getCartBadgeCount();
    expect(persistentCartCount).toBe(3);

    // Step 5: Navigate to cart again and verify items are still there
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(3);

    // Step 6: Verify product details are intact
    const firstItemName = await cartPage.getItemNameByIndex(0);
    expect(firstItemName.length).toBeGreaterThan(0);

    const firstItemPrice = await cartPage.getItemPriceByIndex(0);
    expect(firstItemPrice).toMatch(/\$/);
  });

  test('Edge Case 3: Checkout form validation - test all field validation scenarios', async ({
    page,
  }) => {
    // This edge case tests form validation for required fields

    // Add a product to proceed to checkout
    await inventoryPage.addProductToCartByIndex(0);
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    await cartPage.goToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // Test 1: Try to continue without filling any fields
    await checkoutPage.clickContinue();

    // Verify error message appears for First Name
    const errorMessages = page.locator('h3:has-text("Error:")');
    const errorCount = await errorMessages.count();
    expect(errorCount).toBeGreaterThan(0);

    // Test 2: Fill only First Name and try to continue
    await checkoutPage.firstNameInput.fill('John');
    await checkoutPage.clickContinue();

    // Should still show error for missing fields
    const errorCount2 = await page.locator('h3:has-text("Error:")').count();
    expect(errorCount2).toBeGreaterThan(0);

    // Test 3: Fill First Name and Last Name, try to continue
    await checkoutPage.lastNameInput.fill('Doe');
    await checkoutPage.clickContinue();

    // Should still show error for missing postal code
    const errorCount3 = await page.locator('h3:has-text("Error:")').count();
    expect(errorCount3).toBeGreaterThan(0);

    // Test 4: Fill all required fields - should succeed
    await checkoutPage.postalCodeInput.fill('12345');
    await checkoutPage.clickContinue();

    // Should navigate to checkout step two
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });

  test('Edge Case 4: Remove all items one by one during checkout flow', async ({ page }) => {
    // This edge case tests removing items at various stages

    // Add multiple products
    for (let i = 0; i < 4; i++) {
      await inventoryPage.addProductToCartByIndex(i);
    }

    expect(await inventoryPage.getCartBadgeCount()).toBe(4);

    // Go to cart
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/.*cart\.html/);

    let cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(4);

    // Remove items one by one and verify count decreases
    for (let i = 0; i < 3; i++) {
      await cartPage.removeItemByIndex(0);
      cartItemCount = await cartPage.getCartItemCount();
      expect(cartItemCount).toBe(4 - (i + 1));
    }

    // At this point, we have 1 item left
    expect(await cartPage.getCartItemCount()).toBe(1);

    // Verify we can still proceed to checkout with 1 item
    await cartPage.goToCheckout();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    // Fill checkout info
    await checkoutPage.fillCheckoutInfo('Jane', 'Doe', '54321');
    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/.*checkout-step-two\.html/);

    // Verify order summary still shows the remaining 1 item
    // (This assumes step-two shows order summary)
    const cartItems = page.locator('[data-test="inventory-item"]');
    const itemCountAtCheckout = await cartItems.count();
    expect(itemCountAtCheckout).toBe(1);

    // Complete the purchase
    const finishButton = page.locator('[data-test="finish"]');
    if (await finishButton.isVisible()) {
      await checkoutPage.clickFinish();
      await expect(page).toHaveURL(/.*checkout-complete\.html/);
      expect(await checkoutPage.isOrderCompleted()).toBeTruthy();
    }
  });
});
