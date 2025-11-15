# SauceDemo Authentication Test Plan

## Application Overview

SauceDemo is a test automation practice application featuring an e-commerce interface with various user personas. The application provides six distinct user accounts, each with unique behaviors to help test different scenarios and behaviors in automation testing.

**Key Features:**
- Authentication/Login functionality
- Inventory management (product listing)
- Shopping cart functionality
- Checkout process
- Multiple user personas with unique behaviors

**Base URL:** `https://www.saucedemo.com/` (configured in `playwright.config.ts`)

## Test Architecture

### Page Object Model (POM) Structure

The test suite uses a consistent Page Object Model pattern for maintainability and reusability:

**LoginPage (`tests/pages/login.page.ts`)**
- Encapsulates all login-related elements and actions
- Methods:
  - `navigate()` - Navigate to the login page using baseURL
  - `login(username, password)` - Perform login action
  - `getErrorMessage()` - Retrieve error message text
  - `isErrorMessageVisible()` - Check error message visibility

**DashboardPage (`tests/pages/dashboard.page.ts`)**
- Encapsulates inventory/dashboard elements
- Methods:
  - `isProductsVisible()` - Verify products are displayed
  - `getPageTitle()` - Get page title for verification
  - `getPageUrl()` - Get current page URL

### Test Data

**Password:** `secret_sauce` (same for all users)

**Accepted Usernames:**
1. `standard_user`
2. `locked_out_user`
3. `problem_user`
4. `performance_glitch_user`
5. `error_user`
6. `visual_user`

---

## Test Scenarios

### 1. Standard User - Successful Login

**Objective:** Verify standard_user can successfully authenticate and access the inventory page

**Precondition:** 
- Application is loaded at login page
- No user is currently logged in

**Steps:**
1. Navigate to the application using baseURL
2. Enter username: `standard_user`
3. Enter password: `secret_sauce`
4. Click Login button
5. Verify page navigates to inventory page (inventory.html)
6. Verify Products section is visible
7. Verify page title is "Swag Labs"

**Expected Results:**
- Page URL contains `inventory.html`
- Products heading is visible
- Page title equals "Swag Labs"
- User has successful and unique login session

**Success Criteria:**
- Login action completes without error
- User is redirected to inventory page
- Dashboard elements are rendered and accessible

---

### 2. Locked Out User - Access Denied

**Objective:** Verify locked_out_user receives appropriate error message and cannot access the application

**Precondition:**
- Application is loaded at login page
- No user is currently logged in

**Steps:**
1. Navigate to the application using baseURL
2. Enter username: `locked_out_user`
3. Enter password: `secret_sauce`
4. Click Login button
5. Verify error message is visible
6. Verify page remains on login page
7. Verify error message contains "locked out" text

**Expected Results:**
- User remains on login page (URL: https://www.saucedemo.com/)
- Error message displays: "Epic sadface: Sorry, this user has been locked out."
- Error message contains username indicator
- Cannot proceed to inventory page

**Success Criteria:**
- Login attempt fails appropriately
- Specific error message is displayed for locked_out_user
- Unique behavior verification: This user cannot access the application
- Page remains in secure state on login page

---

### 3. Problem User - Successful Login

**Objective:** Verify problem_user can successfully authenticate and access the inventory page despite problem-related behaviors

**Precondition:**
- Application is loaded at login page
- No user is currently logged in

**Steps:**
1. Navigate to the application using baseURL
2. Enter username: `problem_user`
3. Enter password: `secret_sauce`
4. Click Login button
5. Verify page navigates to inventory page (inventory.html)
6. Verify Products section is visible
7. Verify page title is "Swag Labs"

**Expected Results:**
- Page URL contains `inventory.html`
- Products heading is visible
- Page title equals "Swag Labs"
- User has successful and unique login session

**Success Criteria:**
- Login action completes successfully
- User is redirected to inventory page
- Dashboard loads despite problem_user's specific behaviors
- Unique behavior verification: This user logs in successfully with distinct behaviors during interaction

---

### 4. Performance Glitch User - Successful Login

**Objective:** Verify performance_glitch_user can successfully authenticate and access the inventory page despite performance issues

**Precondition:**
- Application is loaded at login page
- No user is currently logged in

**Steps:**
1. Navigate to the application using baseURL
2. Enter username: `performance_glitch_user`
3. Enter password: `secret_sauce`
4. Click Login button
5. Verify page navigates to inventory page (inventory.html)
6. Verify Products section is visible
7. Verify page title is "Swag Labs"

**Expected Results:**
- Page URL contains `inventory.html`
- Products heading is visible
- Page title equals "Swag Labs"
- User has successful and unique login session

**Success Criteria:**
- Login action completes successfully
- User is redirected to inventory page despite potential performance glitches
- Dashboard loads and is accessible
- Unique behavior verification: This user logs in successfully but may exhibit performance delays

---

### 5. Error User - Successful Login

**Objective:** Verify error_user can successfully authenticate and access the inventory page despite error-related behaviors

**Precondition:**
- Application is loaded at login page
- No user is currently logged in

**Steps:**
1. Navigate to the application using baseURL
2. Enter username: `error_user`
3. Enter password: `secret_sauce`
4. Click Login button
5. Verify page navigates to inventory page (inventory.html)
6. Verify Products section is visible
7. Verify page title is "Swag Labs"

**Expected Results:**
- Page URL contains `inventory.html`
- Products heading is visible
- Page title equals "Swag Labs"
- User has successful and unique login session

**Success Criteria:**
- Login action completes successfully
- User is redirected to inventory page
- Dashboard loads despite error-related behaviors
- Unique behavior verification: This user logs in successfully with unique error behaviors

---

### 6. Visual User - Successful Login

**Objective:** Verify visual_user can successfully authenticate and access the inventory page with visual differences

**Precondition:**
- Application is loaded at login page
- No user is currently logged in

**Steps:**
1. Navigate to the application using baseURL
2. Enter username: `visual_user`
3. Enter password: `secret_sauce`
4. Click Login button
5. Verify page navigates to inventory page (inventory.html)
6. Verify Products section is visible
7. Verify page title is "Swag Labs"

**Expected Results:**
- Page URL contains `inventory.html`
- Products heading is visible
- Page title equals "Swag Labs"
- User has successful and unique login session

**Success Criteria:**
- Login action completes successfully
- User is redirected to inventory page
- Dashboard loads with visual variations
- Unique behavior verification: This user logs in successfully but may display different visual elements

---

### 7. Parametrized: All Users Login Test

**Objective:** Verify all user accounts behave as expected with a single comprehensive parametrized test

**Precondition:**
- Application is loaded at login page
- Test data includes all 6 user accounts with expected behaviors

**Steps:**
1. For each user in test data:
   - Navigate to the application using baseURL
   - Enter username from test data
   - Enter password: `secret_sauce`
   - Click Login button
   - If user is `locked_out_user`:
     - Verify error message is visible
     - Verify error message contains "locked out"
     - Verify page remains on login page
   - If user is standard/problem/performance_glitch/error/visual:
     - Verify page navigates to inventory.html
     - Verify Products section is visible
     - Verify page title is "Swag Labs"

**Expected Results:**
- All standard users reach inventory page successfully
- locked_out_user receives appropriate error message
- Each user has unique login verification
- All users can be validated in a single test execution

**Success Criteria:**
- All 6 users are tested in one parametrized test
- Each user receives appropriate response (success or error)
- Unique assertions for each user behavior

---

## Edge Cases and Additional Scenarios (Recommended for Future Testing)

### Invalid Credentials
- Invalid username with correct password
- Valid username with incorrect password
- Empty username and password
- SQL injection attempts in credentials

### Session Management
- Multiple concurrent logins with different users
- Session timeout and re-authentication
- Browser back button after logout

### Persistence
- Browser refresh during session
- Local storage verification
- Cookie validation

### Performance Metrics (for performance_glitch_user)
- Page load time
- Login response time
- Network request monitoring

### Error Scenarios (for error_user)
- Detailed error message validation
- Error recovery options
- Error logging verification

---

## Test Execution Notes

- **Base URL:** Uses configuration from `playwright.config.ts` - `https://www.saucedemo.com/`
- **POM Pattern:** Ensures maintainability and reduces code duplication
- **Test Independence:** Each scenario is independent and can run in any order
- **Assertions:** Each test includes unique assertions validating specific user behavior
- **Test Data:** All usernames and passwords defined in test data structure

## Test Files

- **Login Page Object:** `tests/pages/login.page.ts`
- **Dashboard Page Object:** `tests/pages/dashboard.page.ts`
- **Test Specifications:** `tests/auth/auth.spec.ts`

