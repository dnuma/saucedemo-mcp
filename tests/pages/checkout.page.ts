import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly successMessage: Locator;
  readonly orderCompleteHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successMessage = page.locator('[data-test="complete-text"]');
    this.orderCompleteHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async fillCheckoutInfo(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickContinue(): Promise<void> {
    await this.continueButton.click();
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async isOrderCompleted(): Promise<boolean> {
    return this.orderCompleteHeader.isVisible();
  }

  async getOrderCompleteMessage(): Promise<string> {
    const headerText = await this.orderCompleteHeader.textContent();
    return headerText || '';
  }

  async backToProducts(): Promise<void> {
    await this.backHomeButton.click();
  }

  async completeCheckout(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fillCheckoutInfo(firstName, lastName, postalCode);
    await this.clickContinue();
    await this.clickFinish();
  }
}
