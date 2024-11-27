import { test, expect } from '@playwright/test'

test.beforeEach( async ({ page }) => {
    page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.describe('Form Layouts', () => {

    test('Inline form', async ({ page }) => {
        const inlineFormCard = page.locator('nb-card', {hasText: 'Inline form'})

        await inlineFormCard.getByRole('textbox', {name: 'Jane Doe'}).fill('Bruce Lee')
        await inlineFormCard.getByRole('textbox', {name: 'Email'}).fill('inlineform@test.com')

        const checkbox = inlineFormCard.locator('nb-checkbox')
        await checkbox.click()

        await expect(checkbox.locator('.custom-checkbox-icon.ng-star-inserted')).toBeVisible()

        await inlineFormCard.getByRole('button', {name: 'Submit'}).click()
    })
})

test.describe('Datepicker', () => {
    
    test('Datepicker', async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })
})

