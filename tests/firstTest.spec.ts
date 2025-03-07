import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page}) => {
    // by Tag name
    await page.locator('input').first().click()
    
    // by ID
    page.locator('#inputEmail1')

    // by Class value
    page.locator('.input-full-width')

    //  by Attribute
    page.locator('[placeholder="Email"]')

    // by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    // combine different locators
    page.locator('input[placeholder="Email"][nbinput]')

    // by partial text match
    page.locator(':text("Using")')

    // by exact text match
    page.locator(':text-is("Using the Grid"')
})

// Recommended as Best Practices
test('User Facing Locators', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByRole('button', { name: 'Sign in' }).first().click()

    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Recipients').click()
    await page.getByText('Horizontal form').click()
    await page.getByTitle('Auth').click()
    await page.getByTestId('submit').click()
})

test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', { name: 'Sign in' }).first().click() // not recommended

    await page.locator('nb-card').nth(3).getByRole('button').click() // not recommended
})


test('Locating parent elements', async ({ page }) => {
    await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: 'Email'}).click()
    await page.locator('nb-card').filter({hasText: 'Basic Form'}).getByRole('textbox', {name: 'Email'}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'})
    .getByRole('textbox', {name: 'Password'}).click()

 
})

test('Reusing the locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic Form'})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('12345678')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

test('Extracting values', async ({ page }) => {
    // single text value
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic Form'})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain('Option 1')

    // input value
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})  

test('Assertions', async ({ page }) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic form'}).locator('button')

    // General assertion
    const value = 3
    expect(value).toEqual(3)

    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    // Soft assertion
    // await expect.soft(basicFormButton).toHaveText('Submit1') // invalid text
    await basicFormButton.click()
})