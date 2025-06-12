import { Locator, Page } from "@playwright/test";

export class DialogPage {
  readonly page: Page;
  private readonly openDialogCard: Locator;
  readonly openDialogWithComponentContainer: Locator;
  readonly dismissDialogButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openDialogCard = this.page.locator("nb-card", {
      hasText: "Open Dialog",
    });
    this.openDialogWithComponentContainer = page.locator(
      "nb-dialog-container",
      {
        hasText: "This is a title passed to the dialog component",
      },
    );
    this.dismissDialogButton = page
      .locator("nb-dialog-container")
      .getByRole("button", { name: "Dismiss Dialog" });
  }

  async openDialogWithComponent() {
    await this.openDialogCard
      .getByRole("button", { name: "Open Dialog with component" })
      .click();
  }
}
