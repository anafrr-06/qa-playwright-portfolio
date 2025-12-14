import { test, expect } from '@playwright/test'

/**
 * Settings Form Validation Tests
 *
 * Question answered: Does the settings form validate and save data correctly?
 */
test.describe('Settings Form Validation', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/login')
    await page.getByTestId('email-input').fill('user@example.com')
    await page.getByTestId('password-input').fill('password123')
    await page.getByTestId('submit-button').click()

    // Navigate to settings
    await page.getByRole('link', { name: 'Settings' }).click()
  })

  test('shows error for empty name', async ({ page }) => {
    await page.getByTestId('name-input').clear()
    await page.getByTestId('save-button').click()

    await expect(page.getByText('Name is required')).toBeVisible()
  })

  test('shows error for name too short', async ({ page }) => {
    await page.getByTestId('name-input').clear()
    await page.getByTestId('name-input').fill('A')
    await page.getByTestId('save-button').click()

    await expect(page.getByText('Name must be at least 2 characters')).toBeVisible()
  })

  test('shows error for invalid email', async ({ page }) => {
    await page.getByTestId('email-input').clear()
    await page.getByTestId('email-input').fill('not-an-email')
    await page.getByTestId('save-button').click()

    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
  })

  test('shows success message on valid submission', async ({ page }) => {
    await page.getByTestId('name-input').clear()
    await page.getByTestId('name-input').fill('John Doe')
    await page.getByTestId('company-input').fill('Acme Corp')
    await page.getByTestId('save-button').click()

    await expect(page.getByTestId('success-message')).toHaveText('Settings saved successfully!')
  })

  test('shows loading state during save', async ({ page }) => {
    await page.getByTestId('name-input').clear()
    await page.getByTestId('name-input').fill('John Doe')

    const saveButton = page.getByTestId('save-button')
    await saveButton.click()

    await expect(saveButton).toHaveText('Saving...')
    await expect(saveButton).toBeDisabled()
  })

  test('toggles notification preferences', async ({ page }) => {
    const emailCheckbox = page.getByTestId('notification-email')
    const pushCheckbox = page.getByTestId('notification-push')

    // Email should be checked by default
    await expect(emailCheckbox).toBeChecked()
    // Push should be unchecked by default
    await expect(pushCheckbox).not.toBeChecked()

    // Toggle both
    await emailCheckbox.click()
    await pushCheckbox.click()

    await expect(emailCheckbox).not.toBeChecked()
    await expect(pushCheckbox).toBeChecked()
  })

  test('clears errors when user corrects input', async ({ page }) => {
    // Trigger validation error
    await page.getByTestId('name-input').clear()
    await page.getByTestId('save-button').click()
    await expect(page.getByText('Name is required')).toBeVisible()

    // Fix the error
    await page.getByTestId('name-input').fill('John Doe')

    // Error should be gone (input triggers error clear)
    await expect(page.getByText('Name is required')).not.toBeVisible()
  })
})
