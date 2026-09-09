import { test, expect } from '@playwright/test';

test.describe('CommerceHub / SmartShop End-to-End User Flow', () => {
  test('browses home page, views product detail, and adds item to cart', async ({ page }) => {
    await page.goto('/');

    // Check title
    await expect(page).toHaveTitle(/SmartShop/i);

    // Click on featured product
    const productCard = page.locator('h3').first();
    await expect(productCard).toBeVisible();
    await productCard.click();

    // Verify detail page & click Add to Cart
    await expect(page.getByRole('button', { name: /Add to Cart/i })).toBeVisible();
    await page.getByRole('button', { name: /Add to Cart/i }).click();

    // Verify cart drawer or toast notification
    await expect(page.locator('text=Added')).toBeVisible();
  });
});
