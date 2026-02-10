const path = require("path");
const fs = require("fs");
const { expect } = require("@wdio/globals");
const DragDropPage = require("../pageobjects/DragDropPage");
const LoginPage = require("../pageobjects/LoginPage");

// #region agent log
const log = (msg, data) => {
  try {
    fs.appendFileSync('/home/debf/Documents/personal/proyectos/selenium-tests/.cursor/debug.log', JSON.stringify({
      location: 'tests/e2e/specs/advanced.spec.js', 
      message: msg, 
      data, 
      timestamp: Date.now(),
      sessionId: 'debug-session',
      hypothesisId: 'auth-redirect'
    }) + '\n');
  } catch (e) {}
};
// #endregion

const UploadPage = require("../pageobjects/UploadPage");
const DynamicPage = require("../pageobjects/DynamicPage");

describe("Interacciones avanzadas", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("demo", "demo");
    // #region agent log
    const currentUrl = await browser.getUrl();
    log('URL after login in before hook', { url: currentUrl });
    // #endregion
  });

  it("realiza drag and drop", async () => {
    await DragDropPage.open();
    // #region agent log
    const currentUrl = await browser.getUrl();
    const pageSource = await browser.getPageSource();
    log('Current URL in drag drop test', { url: currentUrl, sourceSnippet: pageSource.substring(0, 500) });
    // #endregion
    const dropZone = await DragDropPage.dropZone;
    await DragDropPage.draggable.dragAndDrop(dropZone);
    await expect(DragDropPage.status).toHaveTextContaining("soltado");
  });


  it("sube un archivo", async () => {
    await UploadPage.open();
    // #region agent log
    const currentUrl = await browser.getUrl();
    log('Current URL in upload test', { url: currentUrl });
    // #endregion
    const filePath = path.join(__dirname, "../../fixtures/sample.txt");
    const remotePath = await browser.uploadFile(filePath);
    await UploadPage.fileInput.setValue(remotePath);
    await $('button[type="submit"]').click();
    await expect(UploadPage.output).toHaveTextContaining("sample.txt");
  });

  it("espera contenido dinámico", async () => {
    await DynamicPage.open();
    await DynamicPage.loadButton.click();
    await expect(DynamicPage.badge).toHaveTextContaining("Cargando");
    await expect(DynamicPage.output).toHaveTextContaining("Loaded after");
  });
});
