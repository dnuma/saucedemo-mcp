# NOTES FROM THE AUTHOR

It took me about 3 hours to think through and craft the prompts, wait for Playwright to generate the test plans, create the test cases, execute them, and then let the healer clean up the mess it made. Not bad at all—doing it manually would’ve taken me at least 6 hours of deep focus (though I would’ve followed a different, more concise, maintainable, and consistent approach). 

My key takeaway from this exercise: prompt-generated code is impressively efficient for lightweight sites like SauceDemo.com. But when it comes to complex end-to-end projects—especially those involving API interactions, third-party integrations, a robust and maintainable Page Object Model, deep domain knowledge, and a multitude of variables—human expertise remains irreplaceable. This exercise was created in a straightforward 5-page website project, 100% front-end, and with no complex scenarios.

Agents are here to stay, helping us build better software. But an LLM won’t replace us—it’ll only replace those who never learned how to use one.

**David Numa**

P.S. Since every line of code in this project was generated from prompts, this README was too 😁😜

-----

## 🤖 SauceDemo.com Automation Framework (100% Prompt-Driven)

This repository houses a functional, end-to-end automation framework for the [SauceDemo e-commerce website](https://www.saucedemo.com/), created with a singular, groundbreaking constraint: **absolutely no custom code**. The entire framework, including test cases, page object model (POM) structure, and execution logic, is defined and executed solely through a series of **prompts** leveraged by **Playwright Agents**.

This project serves as a proof-of-concept demonstrating the immense potential of **AI-driven testing** and **prompt-engineering** to define and maintain complex automation suites.

-----

## ✨ Key Features & Methodology

  * **Zero-Code Automation:** All test logic is encapsulated in natural language prompts.
  * **Playwright MCP Agent Core:** Utilizes Playwright's advanced capabilities for web interaction, but with AI agents interpreting and executing the steps.
  * **Complete Test Coverage (WIP):** Focused on core e-commerce workflows on SauceDemo, including login, product selection, cart management, and checkout.
  * **Prompt-as-Code:** The framework's *definition* is the collection of prompts themselves, stored and managed here for reproducibility.
  * **Reproducible Environment:** Designed to be run by anyone with the correct Agent setup.

-----

## ⚙️ Prerequisites

To run and reproduce this framework, you will need the following:

1.  **Node.js & npm:** For managing dependencies and running Playwright.
2.  **Playwright Test Runner:** Install via npm with the commands below.
3.  **VS Code:** The latest version of the IDE.
4.  **Playwright MCP Agent:** For generating and managing tests via prompts. Read more about [Playwright Agents](https://playwright.dev/docs/test-agents)

### Installation

```bash
npm install
npm install @playwright/test
npx playwright install
```

-----

## 🚀 Getting Started

### 1. Project Structure

The framework is built using prompts to generate test cases and page objects organized as follows:

| File/Folder | Purpose | Description |
| :--- | :--- | :--- |
| `tests/auth/auth.spec.ts` | **Authentication Tests** | 7 test cases covering all user types and parametrized login validation. |
| `tests/ecommerce/ecommerce.spec.ts` | **E-Commerce Tests** | 3 test cases for product selection, cart management, and checkout flows. |
| `tests/ecommerce/ecommerce-edge-cases.spec.ts` | **Edge Case Tests** | 4 test cases for empty cart checkout, cart persistence, form validation, and item removal. |
| `tests/visual/snapshots.spec.ts` | **Visual Regression (Standard)** | 9 visual snapshot tests using standard_user account. |
| `tests/visual/visual-user-snapshots.spec.ts` | **Visual Regression (Visual User)** | 9 visual snapshot tests using visual_user account (expected failures). |
| `tests/pages/` | **Page Object Model** | 6 reusable page components: LoginPage, DashboardPage, InventoryPage, ProductDetailPage, CartPage, CheckoutPage. |
| `specs/` | **Test Plans** | Human-readable test specifications (AUTH_TEST_PLAN.md, ECOMMERCE_EDGE_CASES_TEST_PLAN.md, VISUAL_USER_TEST_PLAN.md). |
| `Prompts.md` | **Prompt Documentation** | Record of all prompts used to generate the framework. |
| `playwright.config.ts` | **Playwright Configuration** | Test configuration with baseURL and browser settings. |

### 2. Running Tests

To execute the tests:

```bash
# Run all tests
npx playwright test

# Run authentication tests only
npx playwright test tests/auth

# Run e-commerce tests only
npx playwright test tests/ecommerce

# Run visual tests only
npx playwright test tests/visual

# Run a specific test file
npx playwright test tests/auth/auth.spec.ts
npx playwright test tests/ecommerce/ecommerce.spec.ts
npx playwright test tests/ecommerce/ecommerce-edge-cases.spec.ts

# Run tests in headed mode (watch browser execution)
npx playwright test --headed

# Run tests in debug mode (step through test execution)
npx playwright test --debug

# View HTML test report
npx playwright show-report
```

-----

## 💡 Test Coverage

This framework covers 20+ automated tests across multiple test suites:

### Authentication Tests (`tests/auth/auth.spec.ts`)
Comprehensive login tests for all SauceDemo user types:
- **Standard User** - Valid login with full app access
- **Locked Out User** - Login attempt with locked account
- **Problem User** - Login with known issues (image/cart problems)
- **Performance Glitch User** - Login with performance issues
- **Error User** - Login with error behavior
- **Visual User** - Login with visual regression issues
- **Parametrized Test** - Validates all users in a single parameterized test

### E-Commerce Tests (`tests/ecommerce/ecommerce.spec.ts`)
Core e-commerce workflows with standard_user:
1. **Single Product Purchase** - Add 1 product to cart and complete checkout
2. **Multi-Product Purchase** - Mix of listing (1 product) and detail view (2 random products) selection with checkout
3. **Cart Management** - Add random products (2-5 items), delete all items, and validate empty cart

### Edge Cases (`tests/ecommerce/ecommerce-edge-cases.spec.ts`)
Advanced test scenarios for cart and checkout edge cases:
1. **Empty Cart Checkout** - Proceed to checkout with empty cart
2. **Cart Persistence** - Add product, navigate away, return to cart and verify persistence
3. **Checkout Form Validation** - Test all field validation scenarios (first name, last name, postal code)
4. **Item Removal During Checkout** - Remove all items one by one during checkout flow

### Visual Regression Tests (`tests/visual/`)
**Standard User Visual Tests** (`snapshots.spec.ts`):
- 9 visual regression tests covering login, inventory listing, 6 product detail pages, and cart page

**Visual User Visual Tests** (`visual-user-snapshots.spec.ts`):
- 9 visual regression tests for the visual_user account (expected to show visual differences/failures)

## 📝 Prompt Engineering Examples

All tests were generated using structured prompts. Key prompt patterns include:

### Authentication Prompt
> "Generate a test plan using consistent POM for all accepted usernames (standard_user, locked_out_user, problem_user, performance_glitch_user, error_user, visual_user) with password 'secret_sauce'. Each test must validate successful and unique login."

### E-Commerce Prompt
> "Generate tests using consistent POM and login with standard_user for: (1) Add 1 product to cart and finalize transaction, (2) Add products from listing and detail views with random selection, (3) Add random number of products (2-5) then delete all and validate empty cart."

-----

## 🤝 Contribution

This repository is primarily a demonstration of prompt-driven automation. If you have ideas for more effective prompt structures, new test cases to cover, or better Agent configurations, please feel free to open an issue or pull request.

The core challenge is maintaining **readability, robustness, and reusability** using only natural language prompts.
