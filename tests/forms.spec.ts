import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach( async ({ page }) => {
    console.log(`Running ${test.info().title}`)
    page.goto('/')
    await page.getByText('Forms').click()
})

test.describe('Form Layouts', () => {

    test.beforeEach( async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('Inline form', async ({ page }) => {
        const inlineForm = page.locator('nb-card', {hasText: 'Inline form'})
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill('Michael Naghavipour')
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill('inlineform@test.com')
        const inlineFormCheckbox = inlineForm.locator('nb-checkbox')
        await inlineFormCheckbox.click()
        await expect(inlineFormCheckbox.locator('.custom-checkbox-icon.ng-star-inserted')).toBeVisible()
        expect(inlineForm.getByText('Remember me')).toBeVisible()
        await inlineForm.getByRole('button', {name: 'Submit'}).click()
    })

    test('Using the Grid', async ({ page }) => {
        const usingTheGrid = page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGrid.getByRole('textbox', {name: 'Email'}).fill('usingthegrid@test.com')
        await usingTheGrid.getByRole('textbox', {name: 'Password'}).fill('test@password')
        const radioButton = usingTheGrid.locator('nb-radio')
        await radioButton.getByRole('radio', {name: 'Option 1'}).check({ force: true })
        expect(await radioButton.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeTruthy()
        await radioButton.getByRole('radio', {name: 'Option 2'}).check({ force: true })
        expect(await radioButton.getByRole('radio', {name: 'Option 2'}).isChecked()).toBeTruthy()
        expect(await radioButton.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        await usingTheGrid.getByRole('button', {name: 'Sign in'}).click()
    })

    test('Basic form', async ({ page }) => {
        const basicForm = page.locator('nb-card', {hasText: 'Basic form'})
        await basicForm.getByRole('textbox', {name: 'Email'}).fill('basicform@test.com')
        await basicForm.getByRole('textbox', {name: 'Password'}).fill('test@password')
        const basicFormCheckbox = basicForm.locator('nb-checkbox')
        await basicFormCheckbox.click()
        await expect(basicFormCheckbox.locator('.custom-checkbox-icon.ng-star-inserted')).toBeVisible()
        expect(basicForm.getByText('Check me out')).toBeVisible
        await basicForm.getByRole('button', {name: 'Submit'}).click()
    })

    test('Form without labels', async ({ page }) => {
        const formWithoutLabels = page.locator('nb-card', {hasText: 'Form without labels'})
        await formWithoutLabels.getByRole('textbox', {name: 'Recipients'}).fill('Dear HR Manager')
        await formWithoutLabels.getByRole('textbox', {name: 'Subject'}).fill('Test Automation Engineer Job Apllication')
        await formWithoutLabels.getByRole('textbox', {name: 'Message'}).fill('You can hire me to achieve your business goals')
        await formWithoutLabels.getByRole('button', {name: 'Send' }).click()
    })

    test('Block form', async ({ page }) => {
        const blockForm = page.locator('nb-card', {hasText: 'Block form'})
        await blockForm.getByRole('textbox', {name: 'First Name'}).fill('Michael')
        await blockForm.getByRole('textbox', {name: 'Last Name'}).fill('Naghavipour')
        await blockForm.getByRole('textbox', {name: 'Email'}).fill('blockform@test.com')
        await blockForm.getByRole('textbox', {name: 'Website'}).fill('https://naghavipour.click/')
        await blockForm.getByRole('button', {name: 'Submit'}).click()
    })

    test('Horizontal form', async ({ page }) => {
        const horizontalForm = page.locator('nb-card', {hasText: 'Horizontal form'})
        await horizontalForm.getByRole('textbox', {name: 'Email'}).fill('horizontalform@test.com')
        await horizontalForm.getByRole('textbox', {name: 'Password'}).fill('test@password')
        const horizontalFormCheckbox = horizontalForm.locator('nb-checkbox')
        await horizontalFormCheckbox.click()
        await expect(horizontalFormCheckbox.locator('.custom-checkbox-icon.ng-star-inserted')).toBeVisible()
        expect(horizontalForm.getByText('Remember me')).toBeVisible()
        await horizontalForm.getByRole('button', {name: 'Sign in'}).click()
    })
})

test.describe('Datepicker', () => {
    
    test.beforeEach( async ({ page }) => {
        const pm = new PageManager(page)
        await pm.navigateTo().datePickerPage()
    })

    test('Common Datepicker', async ({ page }) => {
        const calendarInputField = page.getByPlaceholder('Form Picker')
        await calendarInputField.click()

        let date = new Date()
        date.setDate(date.getDate() + 120 )
        const expectedDate = date.getDate().toString()
        const expectedYear = date.getFullYear()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
        let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
        }
        await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, { exact: true }).click()
        await expect(calendarInputField).toHaveValue(dateToAssert)
    })

    test('Datepicker With Range', async ({ page }) => {
        const pm = new PageManager(page)
        const rangePicker = page.getByPlaceholder('Range Picker')
        await rangePicker.click()
        await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(20)
    })


})

