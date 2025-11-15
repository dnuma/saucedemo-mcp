import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';

// Test data for all accepted users
const testUsers = [
  {
    username: 'standard_user',
    password: 'secret_sauce',
    expectedBehavior: 'successful_login',
    description: 'Standard user with normal functionality'
  },
  {
    username: 'locked_out_user',
    password: 'secret_sauce',
    expectedBehavior: 'locked_out',
    description: 'User account is locked out'
  },
  {
    username: 'problem_user',
    password: 'secret_sauce',
    expectedBehavior: 'successful_login',
    description: 'User with problem-related behavior during interaction'
  },
  {
    username: 'performance_glitch_user',
    password: 'secret_sauce',
    expectedBehavior: 'successful_login',
    description: 'User with performance or glitch-related behavior'
  },
  {
    username: 'error_user',
    password: 'secret_sauce',
    expectedBehavior: 'successful_login',
    description: 'User with error-related behavior'
  },
  {
    username: 'visual_user',
    password: 'secret_sauce',
    expectedBehavior: 'successful_login',
    description: 'User with visual-related behavior differences'
  }
];

test.describe('SauceDemo Authentication Tests', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.navigate();
  });

  test('Standard User - Successful Login', async ({ page }) => {
    // Test for standard_user - should have successful login and access to inventory
    const user = testUsers[0];
    
    await loginPage.login(user.username, user.password);
    
    // Verify successful login by checking dashboard visibility
    await expect(page).toHaveURL(/.*inventory\.html/);
    const isProductsVisible = await dashboardPage.isProductsVisible();
    expect(isProductsVisible).toBeTruthy();
    expect(await dashboardPage.getPageTitle()).toBe('Swag Labs');
  });

  test('Locked Out User - Access Denied', async ({ page }) => {
    // Test for locked_out_user - should show error message
    const user = testUsers[1];
    
    await loginPage.login(user.username, user.password);
    
    // Verify user remains on login page with error message
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    const isErrorVisible = await loginPage.isErrorMessageVisible();
    expect(isErrorVisible).toBeTruthy();
    
    const errorMsg = await loginPage.getErrorMessage();
    expect(errorMsg).toContain('locked out');
  });

  test('Problem User - Successful Login', async ({ page }) => {
    // Test for problem_user - should login successfully despite problem behavior
    const user = testUsers[2];
    
    await loginPage.login(user.username, user.password);
    
    // Verify successful login
    await expect(page).toHaveURL(/.*inventory\.html/);
    const isProductsVisible = await dashboardPage.isProductsVisible();
    expect(isProductsVisible).toBeTruthy();
    expect(await dashboardPage.getPageTitle()).toBe('Swag Labs');
  });

  test('Performance Glitch User - Successful Login', async ({ page }) => {
    // Test for performance_glitch_user - should login successfully despite performance issues
    const user = testUsers[3];
    
    await loginPage.login(user.username, user.password);
    
    // Verify successful login
    await expect(page).toHaveURL(/.*inventory\.html/);
    const isProductsVisible = await dashboardPage.isProductsVisible();
    expect(isProductsVisible).toBeTruthy();
    expect(await dashboardPage.getPageTitle()).toBe('Swag Labs');
  });

  test('Error User - Successful Login', async ({ page }) => {
    // Test for error_user - should login successfully despite error behavior
    const user = testUsers[4];
    
    await loginPage.login(user.username, user.password);
    
    // Verify successful login
    await expect(page).toHaveURL(/.*inventory\.html/);
    const isProductsVisible = await dashboardPage.isProductsVisible();
    expect(isProductsVisible).toBeTruthy();
    expect(await dashboardPage.getPageTitle()).toBe('Swag Labs');
  });

  test('Visual User - Successful Login', async ({ page }) => {
    // Test for visual_user - should login successfully despite visual differences
    const user = testUsers[5];
    
    await loginPage.login(user.username, user.password);
    
    // Verify successful login
    await expect(page).toHaveURL(/.*inventory\.html/);
    const isProductsVisible = await dashboardPage.isProductsVisible();
    expect(isProductsVisible).toBeTruthy();
    expect(await dashboardPage.getPageTitle()).toBe('Swag Labs');
  });

  test('Parametrized: All Users Login Test', async ({ page }) => {
    // Parametrized test that validates each user with unique assertions
    for (const user of testUsers) {
      // Navigate fresh for each user
      await page.goto('/');
      const freshLoginPage = new LoginPage(page);
      
      await freshLoginPage.login(user.username, user.password);

      if (user.expectedBehavior === 'locked_out') {
        // Verify locked out user stays on login page with error
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        const isErrorVisible = await freshLoginPage.isErrorMessageVisible();
        expect(isErrorVisible).toBeTruthy();
        
        const errorMsg = await freshLoginPage.getErrorMessage();
        expect(errorMsg).toContain('locked out');
      } else {
        // Verify successful login users reach inventory
        await expect(page).toHaveURL(/.*inventory\.html/);
        const dashPage = new DashboardPage(page);
        const isProductsVisible = await dashPage.isProductsVisible();
        expect(isProductsVisible).toBeTruthy();
        expect(await dashPage.getPageTitle()).toBe('Swag Labs');
        expect(await dashPage.getPageUrl()).toContain('inventory.html');
      }
    }
  });
});
