import { test } from '@playwright/test'

test.beforeEach( async ({ page }) => {
    page.goto('/')
})

test('Form Layouts', async ({ page }) => {
    await page.locator('title', {hasText: 'Forms'}).click()
})



