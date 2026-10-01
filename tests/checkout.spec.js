const { test, expect } = require('@playwright/test');

test.describe('SauceDemo Checkout', () => {

  test('should complete a product purchase successfully', async ({ page }) => {

    // Navigate to application
    await page.goto('/');

    // Login
    await page.getByRole('textbox', { name: 'Username' })
      .fill('standard_user');

    await page.getByRole('textbox', { name: 'Password' })
      .fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' })
      .click();

    // Verify successful login
    await expect(page).toHaveURL(/inventory.html/);
    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();

    // Select product
    const product = page.locator(
      '[data-test="inventory-item"]',
      { hasText: 'Sauce Labs Backpack' }
    );

    await expect(product).toBeVisible();

    // Add product to cart
    await product.getByRole('button', { name: 'Add to cart' })
      .click();

    // Verify cart badge
    await expect(
      page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // Open cart
await page.locator('[data-test="shopping-cart-link"]').click();

// Verify navigation to cart
await expect(page).toHaveURL(/cart.html/);

    // Verify product exists in cart
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    // Checkout
    await page.getByRole('button', { name: 'Checkout' })
      .click();

    // Enter customer information
    await page.getByRole('textbox', { name: 'First Name' })
      .fill('Test');

    await page.getByRole('textbox', { name: 'Last Name' })
      .fill('Customer');

    await page.getByRole('textbox', { name: /Zip\/Postal Code/i })
      .fill('12345');

    // Continue
    await page.getByRole('button', { name: 'Continue' })
      .click();

    // Verify checkout overview
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Payment Information')
    ).toBeVisible();

    // Complete order
    await page.getByRole('button', { name: 'Finish' })
      .click();

    // Verify successful completion
    await expect(
      page.getByText('Thank you for your order!', { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText('Back Home')
    ).toBeVisible();
  });
});