import { test } from '@playwright/test'

test.beforeEach( async ({ page }) => {
    page.goto('/')
})

test('Form Layouts', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Datepicker', async ({ page }) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})