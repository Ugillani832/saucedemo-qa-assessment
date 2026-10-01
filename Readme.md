# SauceDemo — SQA Engineer Practical QA & AI Assessment

## Overview

This repository contains my submission for the SQA Engineer Practical QA & AI Assessment.

The assessment focuses on:

* Risk-based exploratory testing
* Defect discovery and reporting
* AI-assisted QA
* Playwright E2E automation
* AI-driven QA strategy
* Human validation of AI-generated testing output

## Application Under Test

**Application:** SauceDemo

**URL:** https://www.saucedemo.com/

**Test Account:**

```text
Username: standard_user
Password: secret_sauce
```

## Project Structure

```text
saucedemo-qa-assessment/
│
├── README.md
├── package.json
├── playwright.config.js
│
├── tests/
│   └── checkout.spec.js
│
└── docs/
    ├── defect-report.md
    ├── ai-usage-log.md
    └── ai-driven-qa-strategy.md
```

## Automated E2E Flow

The Playwright test covers the following critical business journey:

```text
Login
  ↓
Verify Products
  ↓
Select Sauce Labs Backpack
  ↓
Add Product to Cart
  ↓
Verify Cart Badge
  ↓
Open Cart
  ↓
Verify Product
  ↓
Checkout
  ↓
Enter Customer Information
  ↓
Review Order
  ↓
Finish Order
  ↓
Verify Order Confirmation
```

## Technology

* Playwright
* JavaScript
* Node.js

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Run Tests

Run the test suite:

```bash
npx playwright test
```

Run the checkout test specifically:

```bash
npx playwright test tests/checkout.spec.js
```

Run with the browser visible:

```bash
npx playwright test tests/checkout.spec.js --headed
```

Run in debug mode:

```bash
npx playwright test tests/checkout.spec.js --debug
```

Run the test multiple times:

```bash
npx playwright test tests/checkout.spec.js --repeat-each=3
```

View the HTML report:

```bash
npx playwright show-report
```

## Automation Design Decisions

### Stable Selectors

Where available, application-specific test attributes are preferred over fragile selectors.

For example:

```javascript
page.locator('[data-test="shopping-cart-link"]')
```

### Assertions

The test includes assertions at important business checkpoints rather than relying only on successful clicks.

Examples include:

```javascript
await expect(page).toHaveURL(/inventory.html/);
```

```javascript
await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
```

```javascript
await expect(page).toHaveURL(/cart\.html/);
```

```javascript
await expect(
  page.getByText('Thank you for your order!', { exact: true })
).toBeVisible();
```

### Synchronization

The test relies on Playwright's built-in waiting mechanisms and does not use arbitrary `waitForTimeout()` delays.

## AI-Assisted Development

AI was used during:

* Exploratory risk identification.
* Test scenario generation.
* Playwright test scaffolding.
* Locator suggestions.
* Assertion suggestions.
* QA strategy development.
* Defect analysis.

All AI-generated suggestions were manually reviewed and validated.

### Example AI Correction

The initial AI-generated cart locator was:

```javascript
getByRole('link', { name: /cart/i })
```

Execution showed that the locator timed out.

After inspecting the application DOM, it was replaced with:

```javascript
page.locator('[data-test="shopping-cart-link"]')
```

A URL assertion was also added to verify successful navigation.

This demonstrates the use of AI as an engineering assistant while retaining human QA judgment.

## Key QA Principle

AI-generated tests and recommendations are hypotheses until they are validated against the real application.

**AI assists. QA validates, challenges, and decides.**
