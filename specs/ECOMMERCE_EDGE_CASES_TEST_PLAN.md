# SauceDemo E-Commerce Edge Cases Test Plan

## Overview

This test plan documents comprehensive edge case scenarios for the SauceDemo e-commerce application. These tests validate the application's robustness, error handling, and data persistence when users perform unexpected or boundary condition actions. All tests use the `standard_user` account with consistent POM (Page Object Model) structure.

**Base URL:** `https://www.saucedemo.com/` (configured in `playwright.config.ts`)
**Login Credentials:** `standard_user` / `secret_sauce`

---

## Page Object Model (POM) Structure

The edge case tests utilize the existing POM classes:

- **LoginPage** (`tests/pages/login.page.ts`) - Authentication
- **InventoryPage** (`tests/pages/inventory.page.ts`) - Product listing and cart management
- **CartPage** (`tests/pages/cart.page.ts`) - Shopping cart operations
- **CheckoutPage** (`tests/pages/checkout.page.ts`) - Checkout form and order completion

---

## Edge Case Scenarios

### Edge Case 1: Proceed to Checkout with Empty Cart

**Objective:** Validate application behavior when attempting to checkout without any products in the cart

**Preconditions:**
- User is logged in as `standard_user`
- User is on the inventory page
- No products have been added to the cart

**Steps:**
1. Navigate to the shopping cart directly (click cart icon or navigate to /cart.html)
2. Verify cart is empty by checking for empty cart message
3. Verify cart item count is 0
4. Attempt to click the Checkout button

**Expected Results:**
- Cart displays "Your cart is empty" message
- Cart item count shows 0
- One of the following occurs:
  - Checkout button is disabled/not clickable
  - Attempting checkout shows an error message
  - User is redirected to inventory page instead of checkout
  - Checkout page displays with empty/no items

**Success Criteria:**
- Application prevents or appropriately handles empty cart checkout
- No errors in console
- User is not charged or order is not created

**Assumptions:**
- Empty cart state can be achieved by starting fresh session
- Application has safeguards against processing empty orders

---

### Edge Case 2: Add Products, Navigate Away, Return to Cart and Verify Persistence

**Objective:** Validate that products remain in cart across navigation and session persistence

**Preconditions:**
- User is logged in as `standard_user`
- User is on the inventory page
- Session is active

**Steps:**
1. Add 3 different products to cart:
   - Click "Add to cart" for product at index 0
   - Click "Add to cart" for product at index 1
   - Click "Add to cart" for product at index 2
2. Verify cart badge displays "3"
3. Navigate to cart (click cart badge/icon)
4. Verify all 3 products appear in cart
5. Click "Continue Shopping" button
6. Verify on inventory page and cart badge still shows "3"
7. Navigate back to cart (click cart badge/icon)
8. Verify all 3 products are still present with correct details

**Expected Results:**
- Cart badge consistently shows 3 items throughout navigation
- Cart page always displays the same 3 products
- Product names and prices are intact after navigation
- No data loss occurs during page transitions
- Cart persists across multiple navigations within same session

**Success Criteria:**
- All products remain in cart
- Cart badge updates correctly
- Product details (name, price, quantity) are preserved
- No console errors

**Assumptions:**
- Session storage/local storage is functioning correctly
- Browser cache is not cleared during test
- Navigation does not trigger logout

---

### Edge Case 3: Checkout Form Validation - Test All Field Validation Scenarios

**Objective:** Validate form field validation and error messages for checkout information form

**Preconditions:**
- User is logged in as `standard_user`
- At least 1 product has been added to cart
- User is on checkout page (checkout-step-one.html)

**Steps:**

**Test 3.1 - Empty Form Submission:**
1. Navigate to checkout page without filling any form fields
2. Click "Continue" button
3. Verify error message appears for missing first name field

**Test 3.2 - Only First Name Filled:**
1. Clear all form fields
2. Fill First Name field with "John"
3. Click "Continue" button
4. Verify error message appears for missing Last Name or Postal Code

**Test 3.3 - First Name and Last Name Filled:**
1. Clear all form fields
2. Fill First Name with "John"
3. Fill Last Name with "Doe"
4. Click "Continue" button
5. Verify error message appears for missing Postal Code

**Test 3.4 - All Fields Filled:**
1. Fill First Name with "John"
2. Fill Last Name with "Doe"
3. Fill Postal Code with "12345"
4. Click "Continue" button
5. Verify page navigates to checkout-step-two.html (order overview)

**Expected Results:**
- Each missing field triggers specific error message
- Error message clearly indicates which field is required
- Red border/highlight on invalid fields
- Continue button disabled until all fields are filled (or allows submission but shows error)
- Valid submission proceeds to step two
- No partial order creation occurs

**Success Criteria:**
- All required field validations work correctly
- Error messages are clear and actionable
- Form does not submit with missing required fields
- No console errors
- Proper form state management

**Assumptions:**
- HTML5 validation or custom validation is in place
- Error messages are displayed near corresponding fields
- Continue button state updates based on form validity

---

### Edge Case 4: Remove All Items One by One During Checkout Flow

**Objective:** Validate cart behavior when items are removed at various stages, including during checkout flow

**Preconditions:**
- User is logged in as `standard_user`
- User is on inventory page

**Steps:**

**Phase 1 - Add Products:**
1. Add 4 products to cart from inventory:
   - Product at index 0
   - Product at index 1
   - Product at index 2
   - Product at index 3
2. Verify cart badge shows "4"

**Phase 2 - Progressive Removal:**
1. Navigate to cart page (click cart badge)
2. Verify cart displays 4 items
3. Remove first item by clicking Remove button
4. Verify cart now shows 3 items
5. Remove another item
6. Verify cart now shows 2 items
7. Remove another item
8. Verify cart now shows 1 item

**Phase 3 - Checkout with Last Item:**
1. With 1 item remaining, click "Checkout"
2. Fill checkout form:
   - First Name: "Jane"
   - Last Name: "Doe"
   - Postal Code: "54321"
3. Click "Continue"
4. Verify order summary displays 1 item
5. Click "Finish" to complete order
6. Verify order completion page appears

**Expected Results:**
- Cart item count decreases by 1 with each removal
- Cart badge updates in real-time
- Can proceed to checkout with 1 item
- Order summary correctly shows 1 item at checkout step two
- Order completes successfully with 1 item
- No errors during progressive removal
- Item details and prices remain consistent

**Success Criteria:**
- Progressive removal works without errors
- Cart state is always accurate
- Can complete checkout with minimum items
- Order total reflects correct item count
- All cart operations are responsive
- No console errors or warnings

**Assumptions:**
- At least 4 distinct products are available in inventory
- Remove buttons are functional for all cart items
- Order can be completed with 1 item
- Cart state is immediately reflected in UI after removal

---

## Test Execution

### Running Edge Case Tests

```bash
# Run all edge case tests
npx playwright test tests/ecommerce/ecommerce-edge-cases.spec.ts

# Run specific edge case test
npx playwright test tests/ecommerce/ecommerce-edge-cases.spec.ts -g "Edge Case 1"

# Run with headed browser for visual verification
npx playwright test tests/ecommerce/ecommerce-edge-cases.spec.ts --headed

# Generate HTML report
npx playwright show-report
```

---

## Known Limitations

- Tests assume product inventory remains consistent between runs
- Session state may vary based on browser configuration
- Network latency not explicitly tested
- Browser-specific behaviors may vary

---

## Future Enhancement Opportunities

- Test with different user personas (problem_user, visual_user, etc.)
- Test network interruptions during checkout
- Test with expired session during checkout
- Test concurrent cart modifications from multiple windows
- Test with special characters in form fields
- Test maximum quantity limits in cart
- Test order value edge cases (zero, very high amounts)
