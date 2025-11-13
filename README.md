## NOTES FROM THE AUTHOR

Since all the code in this project was created using 100% prompts, this Readme was also created using prompts. 

David Numa

-----

## 🤖 SauceDemo.com Automation Framework (100% Prompt-Driven)

This repository houses a functional, end-to-end automation framework for the [SauceDemo e-commerce website](https://www.google.com/search?q=https://www.saucedemo.com/), created with a singular, groundbreaking constraint: **absolutely no custom code**. The entire framework, including test cases, page object model (POM) structure, and execution logic, is defined and executed solely through a series of **prompts** leveraged by **Playwright MCP Agents** (Microsoft Cognitive Process Agents).

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

1.  **Playwright Test Runner:** Installed globally or locally (via npm/yarn).
2.  **Playwright MCP Agent Environment:** Access to and configuration of the specific Playwright Agent/AI tooling being used (e.g., specific CLI, API keys, or agent runtime). *Note: The exact configuration steps will depend on the final Agent implementation details.*
3.  **Node.js & npm/yarn:** For managing dependencies and running Playwright.

<!-- end list -->

```bash
# Example installation (may vary based on Agent tooling)
npm install playwright @playwright/test
# Configure your specific Agent environment variables (e.g., API keys)
```

-----

## 🚀 Getting Started

The core of this repository is the collection of prompt files that the Agent consumes.

### 1\. The Prompt Files

The framework is broken down into structured prompt files, mimicking a traditional automation structure:

| File/Folder | Purpose | Description |
| :--- | :--- | :--- |
| `agents/` | **Core Prompts** | Stores the prompts that define reusable components (like a POM). E.g., a prompt defining how to "Login with standard user." |
| `tests/login.prompt` | **Test Case 1** | A sequence of prompts defining the full Login test scenario (positive/negative). |
| `tests/checkout.prompt` | **Test Case 2** | A sequence of prompts defining the full product selection and checkout flow. |
| `agent.config.json` | **Agent Configuration** | Configuration for the Agent environment (e.g., target URL, user profiles, AI model settings). |

### 2\. Execution

Execution involves feeding the test prompt files into the Agent's runtime environment.

1.  **Ensure all prerequisites are met.**
2.  **Run the Agent against the desired test prompt.**

<!-- end list -->

```bash
# Hypothetical command structure to execute the login test
# (This command will vary based on the official Playwright MCP Agent CLI)
npx playwright-mcp-agent run tests/login.prompt
```

-----

## 💡 Prompt Engineering Examples

The power of this framework lies in the clarity and structure of the prompts.

### 📝 Example: Defining a "Page Object" Prompt

  * **Goal:** Tell the Agent how to interact with the Login Page.
  * **Prompt (Simplified):**

> **"Define a component named `LoginPage`. This component has two methods: `enterCredentials(username, password)` and `clickLogin()`. For `enterCredentials`, type the `username` into the input with the data-test ID `user-name` and the `password` into the input with the data-test ID `password`. For `clickLogin`, click the button with the data-test ID `login-button`."**

### 📝 Example: Executing a Test Case Prompt

  * **Goal:** Run a simple valid login.
  * **Prompt (Simplified):**

> **"Start a new test named `Valid Login Test`. On the `LoginPage`, call `enterCredentials` using 'standard\_user' and 'secret\_sauce'. Then call `clickLogin()`. Assert that the current page URL ends with `/inventory.html` and the element with class `title` has the text 'Products'."**

-----

## 🤝 Contribution

This repository is primarily a demonstration of prompt-driven automation. If you have ideas for more effective prompt structures, new test cases to cover, or better Agent configurations, please feel free to open an issue or pull request.

The core challenge is maintaining **readability, robustness, and reusability** using only natural language prompts.
