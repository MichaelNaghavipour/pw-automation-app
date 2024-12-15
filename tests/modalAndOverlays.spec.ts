import { test, expect } from '@playwright/test'

// Go to the default URL and navigate to the "Modal & Overlays"
test.beforeEach( async ({ page }) => {
    console.log(`Running ${test.info().title}`)
    page.goto('/')
    await page.getByText('Modal & Overlays').click()
})

// The beginning of the "Modal & Overlays" test suite
test.describe('Modal and Overlays', () => {
    // Navigate to the Dialog page before each test
    test.beforeEach( async ({ page }) => {
        await page.getByText('Dialog').click()
    })

    // Ensure thedialog on the "Open Dialog" card is opening
    // Confirm the tilte inside dialog is displayed as expecred
    test('Open Dialog', async ({ page }) => {
        const openDialog = page.locator('nb-card', {hasText: 'Open Dialog' })
        await openDialog.getByRole('button', {name: 'Open Dialog with component'}).click()
        await expect(page.locator('nb-card', {hasText: 'This is a title passed to the dialog component'})).toBeVisible()
        await page.locator('nb-card-footer').getByRole('button', {name: 'Dismiss Dialog'}).click()
    })

    // Ensure the dialog on the "return result from dialog" card is opening.
    // Confirm the buttons on the card are visible and have the correct colors as designed.
    // Verify that the entered name is correctly displayed on the card.
    test('Return Result From Dialog', async ({ page }) => {
        const returnResultFromDialog = page.locator('nb-card', {hasText: 'Return Result From Dialog' })
        await returnResultFromDialog.getByRole('button', {name: 'Enter Name'}).click()
        await expect(page.getByRole('button', {name: 'Cancel'})).toHaveCSS('background-color', 'rgb(255, 61, 113)')
        await expect(page.getByRole('button', {name: 'Submit'})).toHaveCSS('background-color', 'rgb(0, 214, 143)')
        await page.getByPlaceholder('Name').fill('John Doe')
        await page.getByRole('button', {name: 'Submit'}).click()
        expect(returnResultFromDialog).toContainText('John Doe')
    })
})