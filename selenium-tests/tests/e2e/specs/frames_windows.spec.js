const { expect } = require("@wdio/globals");
const IframePage = require("../pageobjects/IframePage");
const WindowsPage = require("../pageobjects/WindowsPage");
const LoginPage = require("../pageobjects/LoginPage");

describe("IFrames y ventanas", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("demo", "demo");
  });
  it("interactúa dentro de un iframe", async () => {
    await IframePage.open();
    await IframePage.iframe.waitForDisplayed();
    await browser.switchToFrame(await IframePage.iframe);
    await IframePage.buttonInside.waitForDisplayed();
    await IframePage.buttonInside.click();
    await expect(IframePage.outputInside).toHaveTextContaining("iframe");
    await browser.switchToFrame(null);
  });

  it("maneja múltiples ventanas", async () => {
    await WindowsPage.open();
    const originalHandle = await browser.getWindowHandle();
    await WindowsPage.openButton.click();
    await expect(WindowsPage.output).toHaveTextContaining("Nueva ventana");

    await browser.waitUntil(async () => {
      const handles = await browser.getWindowHandles();
      return handles.length === 2;
    });

    const handles = await browser.getWindowHandles();
    const newHandle = handles.find((handle) => handle !== originalHandle);
    await browser.switchToWindow(newHandle);
    await expect($("#new-window-title")).toBeDisplayed();
    await browser.closeWindow();
    await browser.switchToWindow(originalHandle);
  });
});
