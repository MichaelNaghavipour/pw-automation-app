import { test, expect } from '@playwright/test'

// Go to the default URL and navigate to the "Modal & Overlays"
test.beforeEach( async ({ page }) => {
    console.log(`Running ${test.info().title}`)
    page.goto('/')
    await page.getByText('Modal & Overlays').click()
})

// Modal & Overlays -> Dialog
test.describe('Dialog', () => {
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

// Modal & Overlays -> Windows
test('Window Form', async ({ page }) => {
    await page.getByText('Window').click()
    await page.getByRole('button', {name: 'Open window form'}).click()
    expect(page.locator('nb-window')).toContainText('Window')
    await page.getByRole('textbox').first().fill('This is a sample subject') // filling the first text
    await page.getByRole('textbox').nth(1).fill('This is a sample text') // filling the second text using 'nth()'
    const minusIcon = page.locator('nb-icon[icon="minus-outline"]')
    const collapseIcon = page.locator('nb-icon[icon="collapse-outline"]')
    const closeIcon = page.locator('nb-icon[icon="close-outline"]')
    // check if all icons are visible
    expect(minusIcon).toBeVisible()
    expect(collapseIcon).toBeVisible()
    expect(closeIcon).toBeVisible()
    await closeIcon.click()
    // check that the window is closed 
    expect(page.locator('nb-window')).toHaveCount(0)
})

// Modal & Overlays -> Popover
test.describe('Popover', () => {

    test.beforeEach( async ({ page }) => {
        await page.getByText('Popover').click()
    })
    // check whether a popover is working properly when hovering over an element
    test('Popover Position', async ({ page }) => {
        await page.getByRole('button', {name: 'Top'}).hover()
        await page.waitForSelector('text=Hello, how are you today?');
        await expect(page.getByText('Hello, how are you today?')).toBeVisible()
    })

    // check whether a popover is working properly when clicking on an element
    test('Simple Popovers', async ({ page }) => {
        await page.getByRole('button', {name: 'on click'}).click()
        await expect(page.getByText('Hello, how are you today?')).toBeVisible()
    })
})
