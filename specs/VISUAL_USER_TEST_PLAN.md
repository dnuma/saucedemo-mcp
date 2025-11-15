# SauceDemo Visual User Test Plan

## Overview
This test plan covers visual regression testing using the `visual_user` account. The `visual_user` account is intentionally designed to display visual inconsistencies and rendering issues throughout the application. These tests document expected failures and visual anomalies that occur with this user account.

**User Credentials:**
- Username: `visual_user`
- Password: `secret_sauce`

---

## Test Environment
- **Base URL:** `https://www.saucedemo.com/`
- **Browser:** Chromium, Firefox, WebKit
- **Test Framework:** Playwright
- **Page Object Model:** Utilized for all page interactions

---

## Expected Behavior
The `visual_user` account is known to exhibit visual issues including but not limited to:
- Broken or missing images
- Incorrect styling on product images
- Layout inconsistencies
- Element misalignment
- CSS rendering issues

---

## Test Cases

### TC-VU-001: Visual Regression - Login Page Screenshot
**Objective:** Capture and validate login page visual appearance with visual_user

**Preconditions:**
- Browser is open and pointed to the application base URL
- No user is currently logged in

**Steps:**
1. Navigate to the login page (`/`)
2. Capture full page screenshot

**Expected Result:**
- Login page displays correctly
- Username input field is visible
- Password input field is visible
- Login button is visible and properly styled

**Actual Result (visual_user):**
- Login page displays with potential styling anomalies
- Visual elements may render inconsistently

---

### TC-VU-002: Visual Regression - Inventory Listing Page Screenshot
**Objective:** Capture and validate inventory page visual appearance after logging in

**Preconditions:**
- Browser is open
- visual_user is logged in successfully

**Steps:**
1. Log in with visual_user credentials
2. Verify navigation to inventory page (`/inventory.html`)
3. Capture full page screenshot of inventory listing
4. Validate all 6 products are displayed

**Expected Result:**
- Inventory page loads successfully
- All 6 products display with images
- Product cards are properly aligned
- Sort container is visible
- Shopping cart link is accessible

**Actual Result (visual_user):**
- Product images may be broken or display incorrectly
- Product layout may have misalignment issues
- Visual inconsistencies in product card styling

---

### TC-VU-003: Visual Regression - Product 1 Detail Page Screenshot
**Objective:** Capture and validate product detail page visual appearance for Product 1

**Preconditions:**
- visual_user is logged in
- User is on the inventory page

**Steps:**
1. Click on the first product (Sauce Labs Backpack)
2. Verify navigation to product detail page
3. Capture full page screenshot
4. Validate product information is visible (title, price, description, image)

**Expected Result:**
- Product detail page displays correctly
- Product image is visible and properly rendered
- Product title, price, and description are displayed
- Add to cart button is visible

**Actual Result (visual_user):**
- Product image may be broken or not displaying
- Visual styling inconsistencies on the detail page
- Potential layout issues with product information

---

### TC-VU-004: Visual Regression - Product 2 Detail Page Screenshot
**Objective:** Capture and validate product detail page visual appearance for Product 2

**Preconditions:**
- visual_user is logged in
- User is on the inventory page

**Steps:**
1. Click on the second product (Sauce Labs Bike Light)
2. Verify navigation to product detail page
3. Capture full page screenshot

**Expected Result:**
- Product detail page displays correctly with proper styling

**Actual Result (visual_user):**
- Product image display issues
- Visual rendering inconsistencies

---

### TC-VU-005: Visual Regression - Product 3 Detail Page Screenshot
**Objective:** Capture and validate product detail page visual appearance for Product 3

**Preconditions:**
- visual_user is logged in
- User is on the inventory page

**Steps:**
1. Click on the third product (Sauce Labs Bolt T-Shirt)
2. Verify navigation to product detail page
3. Capture full page screenshot

**Expected Result:**
- Product detail page displays correctly with proper styling

**Actual Result (visual_user):**
- Product image display issues
- Visual rendering inconsistencies

---

### TC-VU-006: Visual Regression - Product 4 Detail Page Screenshot
**Objective:** Capture and validate product detail page visual appearance for Product 4

**Preconditions:**
- visual_user is logged in
- User is on the inventory page

**Steps:**
1. Click on the fourth product (Sauce Labs Fleece Jacket)
2. Verify navigation to product detail page
3. Capture full page screenshot

**Expected Result:**
- Product detail page displays correctly with proper styling

**Actual Result (visual_user):**
- Product image display issues
- Visual rendering inconsistencies

---

### TC-VU-007: Visual Regression - Product 5 Detail Page Screenshot
**Objective:** Capture and validate product detail page visual appearance for Product 5

**Preconditions:**
- visual_user is logged in
- User is on the inventory page

**Steps:**
1. Click on the fifth product (Sauce Labs Onesie)
2. Verify navigation to product detail page
3. Capture full page screenshot

**Expected Result:**
- Product detail page displays correctly with proper styling

**Actual Result (visual_user):**
- Product image display issues
- Visual rendering inconsistencies

---

### TC-VU-008: Visual Regression - Product 6 Detail Page Screenshot
**Objective:** Capture and validate product detail page visual appearance for Product 6

**Preconditions:**
- visual_user is logged in
- User is on the inventory page

**Steps:**
1. Click on the sixth product (Test.allTheThings() T-Shirt (Red))
2. Verify navigation to product detail page
3. Capture full page screenshot

**Expected Result:**
- Product detail page displays correctly with proper styling

**Actual Result (visual_user):**
- Product image display issues
- Visual rendering inconsistencies

---

### TC-VU-009: Visual Regression - Cart Page with Multiple Products Screenshot
**Objective:** Capture and validate cart page visual appearance with products added

**Preconditions:**
- visual_user is logged in
- User is on the inventory page

**Steps:**
1. Add the first product (index 0) to cart from inventory listing
2. Add the last product (index 5) to cart from inventory listing
3. Verify cart badge displays item count
4. Navigate to cart page
5. Capture full page screenshot of cart

**Expected Result:**
- Cart page displays correctly
- Both products are visible in the cart
- Product images are displayed correctly
- Product names and prices are visible
- Checkout button is available

**Actual Result (visual_user):**
- Product images in cart may display incorrectly
- Visual layout inconsistencies
- Potential alignment issues with cart items

---

## Known Issues with visual_user

The following visual issues are expected when running tests with the `visual_user` account:

1. **Product Images Not Rendering:** Product images fail to load or display broken images across all pages
2. **Layout Misalignment:** Product cards and cart items may not align properly
3. **CSS Styling Issues:** Overall visual styling may appear inconsistent or broken
4. **Cross-browser Rendering:** Visual issues may be more pronounced in certain browsers (Firefox, Safari)

---

## Failure Expectations

Tests with the `visual_user` account are expected to fail screenshot assertions when compared against the baseline screenshots taken with the `standard_user` account. This is intentional behavior used to:

1. **Identify visual regression bugs** specific to the visual_user account
2. **Document known visual issues** in the SauceDemo application
3. **Validate visual testing capabilities** of the test automation framework
4. **Create baseline screenshots** for visual user experience degradation

---

## Execution Notes

- These tests should be executed against the visual_user account consistently
- Screenshot baselines should be reviewed and approved before comparison runs
- Visual discrepancies are expected and should be documented in the application's bug tracking system
- Tests may need to be run in all three browser projects (Chromium, Firefox, WebKit) to capture browser-specific rendering issues

---

## Test Execution Command

```bash
# Run all visual_user tests
npx playwright test tests/visual/visual-user-snapshots.spec.ts

# Run with specific browser
npx playwright test tests/visual/visual-user-snapshots.spec.ts --project=chromium

# Run with headed mode to see visual issues
npx playwright test tests/visual/visual-user-snapshots.spec.ts --headed

# Generate HTML report
npx playwright show-report
```

---

## Related Documentation

- **Auth Test Plan:** `specs/AUTH_TEST_PLAN.md` - For standard_user authentication tests
- **E-Commerce Test Plan:** `specs/ECOMMERCE_EDGE_CASES_TEST_PLAN.md` - For standard user workflows
- **Visual Regression Tests (standard_user):** `tests/visual/snapshots.spec.ts` - Baseline visual tests

