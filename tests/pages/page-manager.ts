import { Page, expect } from '@playwright/test'
import { DatePickerPage } from './date-picker-page'
import { FormLayoutsPage } from './form-layouts-page'
import { NavigationPage } from './navigation-page'

export class PageManager {

    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formLayoutsPage: FormLayoutsPage
    private readonly datePickerPage: DatePickerPage

    constructor( page: Page ) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formLayoutsPage = new FormLayoutsPage(this.page)
        this.datePickerPage = new DatePickerPage(this.page)
    }

    navigateTo() {
        return this.navigationPage
    }

    onFormLayoutsPage() {
        return this.formLayoutsPage
    }

    onDatePickerPage() {
        return this.datePickerPage
    }

}