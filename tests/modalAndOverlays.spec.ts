import { test, expect } from '@playwright/test'

test.beforeEach( async ({ page }) => {
    console.log(`Running ${test.info().title}`)
    page.goto('/')
    await page.getByText('Modal & Overlays').click()
})

test.describe('Modal and Overlays', () => {

    test.beforeEach( async ({ page }) => {
        await page.getByText('Dialog').click()
    })

    test('Open Dialog', async ({ page }) => {
        const openDialog = page.locator('nb-card', {hasText: 'Open Dialog' })
        await openDialog.getByRole('button', {name: 'Open Dialog with component'}).click()
        await expect(page.locator('nb-card', {hasText: 'This is a title passed to the dialog component'})).toBeVisible()
        await page.locator('nb-card-footer').getByRole('button', {name: 'Dismiss Dialog'}).click()
    })
})