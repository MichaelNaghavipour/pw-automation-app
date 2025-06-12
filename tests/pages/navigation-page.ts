import { Locator, Page } from '@playwright/test'
import { HelperBase } from './helper-base'

export class NavigationPage extends HelperBase{

    constructor(page: Page) {
        super(page)
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
    }

    async datePickerPage() { 
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async dialogPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Dialog').click()
    }

    async windowPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Window').click()
    }

    async popoverPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Popover').click()
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    async calendarPage() {
        await this.selectGroupMenuItem('Extra Components')
        await this.page.getByText('Calendar').click()
    }

    async eChartsPage() {
        await this.selectGroupMenuItem('Charts')
        await this.page.getByText('Echarts').click()
    }

    async smartTablePage() {             
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async treeGridPage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Tree Grid').click()
    } 

    private async selectGroupMenuItem(groupItemTitle: string) {
        const groupMenuItem = this.page.getByTitle(groupItemTitle, { exact: true })
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState === 'false')
            await groupMenuItem.click()
    }
}