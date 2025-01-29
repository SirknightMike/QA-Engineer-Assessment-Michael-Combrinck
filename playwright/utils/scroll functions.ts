import { Locator, Page } from "@playwright/test";

/**
 * Scroll an element into view if it is not already visible.
 *
 * @param page - The page that contains the element.
 * @param element - The element to scroll into view.
 */
export async function scrollToElement(page: Page, element: Locator) {
    await page.locator(element.toString()).scrollIntoViewIfNeeded();
}

/**
 * Scroll down the page by the given number of pixels.
 *
 * @param page - The page to scroll.
 * @param pixels - The number of pixels to scroll down.
 */
export async function scrollDown(page: Page, pixels: number) {
    await page.evaluate((pixels) => {
        window.scrollBy(0, pixels);
    }, pixels);
}

/**
 * Scroll to the bottom of the page.
 *
 * @param page - The page to scroll.
 */
async function scrollToBottom(page: Page) {
    await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
    });
}