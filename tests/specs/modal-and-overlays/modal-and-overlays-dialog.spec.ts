import { test, expect } from "@playwright/test";
import { DialogPage } from "../../pages/dialog-page";

// Go to the default URL and navigate to the "Modal & Overlays"
test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}`);
  page.goto("/");
  await page.getByText("Modal & Overlays").click();
  // Navigate to the Dialog page before each test
  await page.getByText("Dialog").click();
});

// Modal & Overlays -> Dialog
test.describe("Dialog", () => {
  // Ensure the dialog on the "Open Dialog" card is opening
  // Confirm the tilte inside dialog is displayed as expecred
  test("Open Dialog", async ({ page }) => {
    const dialogPage = new DialogPage(page);
    await dialogPage.openDialogWithComponent();
    await expect(dialogPage.openDialogWithComponentContainer).toBeVisible();
    await dialogPage.dismissDialogButton.click();
    await expect(dialogPage.dismissDialogButton).not.toBeVisible();
  });

  // Ensure the dialog on the "return result from dialog" card is opening.
  // Confirm the buttons on the card are visible and have the correct colors as designed.
  // Verify that the entered name is correctly displayed on the card.
  test("Return Result From Dialog", async ({ page }) => {
    const returnResultFromDialog = page.locator("nb-card", {
      hasText: "Return Result From Dialog",
    });
    await returnResultFromDialog
      .getByRole("button", { name: "Enter Name" })
      .click();
    await expect(page.getByRole("button", { name: "Cancel" })).toHaveCSS(
      "background-color",
      "rgb(255, 61, 113)",
    );
    await expect(page.getByRole("button", { name: "Submit" })).toHaveCSS(
      "background-color",
      "rgb(0, 214, 143)",
    );
    await page.getByPlaceholder("Name").fill("John Doe");
    await page.getByRole("button", { name: "Submit" }).click();
    expect(returnResultFromDialog).toContainText("John Doe");
  });
});
