## NOTES FROM THE AUTHOR

It took me about 3 hours to think through and craft the prompts, wait for Playwright to generate the test plans, create the test cases, execute them, and then let the healer clean up the mess it made. Not bad at all—doing it manually would’ve taken me at least 5 hours. Granted, this was a simple 5-page website with 100% front-end coverage and no complex scenarios.

My key takeaway from this exercise: prompt-generated code is impressively efficient for lightweight sites like SauceDemo.com. But when it comes to complex end-to-end projects—especially those involving API interactions, third-party integrations, a robust and maintainable Page Object Model, deep domain knowledge, and a multitude of variables—human expertise remains irreplaceable.

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
4.  **Playwright MCP Agent:** For generating and managing tests via prompts.

### Installation

```bash
npm install
npm install @playwright/test
npx playwright install
```

-----

## 🚀 Getting Started

### 1\. Project Structure

The framework is built using prompts to generate test cases and page objects organized as follows:

| File/Folder | Purpose | Description |
| :--- | :--- | :--- |
| `tests/auth/` | **Authentication Tests** | Login tests for all user types (standard_user, locked_out_user, problem_user, etc.). |
| `tests/ecommerce/` | **E-Commerce Tests** | Product selection, cart management, and checkout workflows. |
| `tests/pages/` | **Page Object Model** | Reusable page components (LoginPage, InventoryPage, CartPage, CheckoutPage, etc.). |
| `specs/` | **Test Plans** | Human-readable test specifications and edge case documentation. |
| `Prompts.md` | **Prompt Documentation** | Record of all prompts used to generate the framework. |
| `playwright.config.ts` | **Playwright Configuration** | Test configuration with baseURL and browser settings. |

### 2\. Running Tests

To execute the tests:

```bash
# Run all tests
npx playwright test

# Run tests in a specific directory
npx playwright test tests/auth

# Run tests in headed mode (watch browser execution)
npx playwright test --headed

# Run a specific test file
npx playwright test tests/auth/auth.spec.ts

# View HTML test report
npx playwright show-report
```

-----

## 💡 Test Coverage

This framework covers the following test scenarios:

### Authentication Tests (`specs/AUTH_TEST_PLAN.md`)
Tests for all SauceDemo user types:
- **standard_user** - Valid login with full app access
- **locked_out_user** - Login attempt with locked account
- **problem_user** - Login with known issues (image/cart problems)
- **performance_glitch_user** - Login with performance issues
- **error_user** - Login with error behavior
- **visual_user** - Login with visual regression issues

Each test validates successful login with unique assertions per user type.

### E-Commerce Tests (`tests/ecommerce/`)
Core e-commerce workflows:
1. **Single Product Purchase** - Add 1 product to cart and complete checkout
2. **Multi-Product Purchase** - Mix of listing and detail view product selection with checkout
3. **Cart Management** - Random product selection (2-5 items) with full cart deletion validation

### Edge Cases (`specs/ECOMMERCE_EDGE_CASES_TEST_PLAN.md`)
Advanced test scenarios for cart and checkout edge cases.

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
