import { test, expect } from '@playwright/test'

/**
 * Login Form Validation Tests
 *
 * Question answered: Does the login form validate user input correctly?
 */
test.describe('Login Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login')
  })

  test('shows error for empty email', async ({ page }) => {
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('error-message')).toHaveText('Email is required')
  })

  test('shows error for invalid email format', async ({ page }) => {
    await page.getByTestId('email-input').fill('invalid-email')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('error-message')).toHaveText('Please enter a valid email address')
  })

  test('shows error for empty password', async ({ page }) => {
    await page.getByTestId('email-input').fill('user@example.com')
    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('error-message')).toHaveText('Password is required')
  })

  test('shows error for password too short', async ({ page }) => {
    await page.getByTestId('email-input').fill('user@example.com')
    await page.getByTestId('password-input').fill('12345')
    await page.getByTestId('submit-button').click()

    await expect(page.getByTestId('error-message')).toHaveText('Password must be at least 6 characters')
  })

  test('shows loading state during submission', async ({ page }) => {
    await page.getByTestId('email-input').fill('user@example.com')
    await page.getByTestId('password-input').fill('password123')

    const submitButton = page.getByTestId('submit-button')
    await submitButton.click()

    await expect(submitButton).toHaveText('Signing in...')
    await expect(submitButton).toBeDisabled()
  })

  test('clears error when user starts typing', async ({ page }) => {
    // Trigger error
    await page.getByTestId('submit-button').click()
    await expect(page.getByTestId('error-message')).toBeVisible()

    // Start typing - error should be cleared on next submit
    await page.getByTestId('email-input').fill('user@example.com')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('submit-button').click()

    // Should navigate away (no error)
    await expect(page).toHaveURL('/')
  })
})
