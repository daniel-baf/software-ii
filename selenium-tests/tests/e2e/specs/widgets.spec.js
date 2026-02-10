const { expect } = require("@wdio/globals");
const TablePage = require("../pageobjects/TablePage");
const ModalPage = require("../pageobjects/ModalPage");
const AlertsPage = require("../pageobjects/AlertsPage");
const LoginPage = require("../pageobjects/LoginPage");

describe("Widgets básicos", () => {
  before(async () => {
    await LoginPage.open();
    await LoginPage.login("demo", "demo");
  });
  it("filtra y ordena la tabla", async () => {
    await TablePage.open();
    // Esperar a que la tabla se cargue completamente
    await TablePage.rows[0].waitForDisplayed();
    await browser.pause(200); // Dar tiempo para que React renderice completamente
    const initialFirst = await TablePage.rows[0].$("td").getText();
    console.log('Initial first row:', initialFirst);

    await TablePage.filterInput.setValue("Mouse");
    await browser.pause(200); // Espera a que el filtro se aplique
    const visibleRows = await TablePage.rows.filter(async (row) => {
      return await row.isDisplayed();
    });
    await expect(visibleRows).toHaveLength(1);
    await expect(TablePage.rows[0]).toHaveTextContaining("Mouse");

    // Limpiar el filtro - usar clearValue y luego setValue para asegurar que se limpie
    await TablePage.filterInput.clearValue();
    // También disparar el evento onChange manualmente para asegurar que React lo procese
    await browser.execute((inputId) => {
      const input = document.getElementById(inputId);
      if (input) {
        const event = new Event('input', { bubbles: true });
        input.value = '';
        input.dispatchEvent(event);
      }
    }, 'filter-input');
    
    // Esperar a que se limpie el filtro y se restauren todas las filas
    await browser.waitUntil(async () => {
      const allRows = await TablePage.rows;
      return allRows.length === 4;
    }, { timeout: 5000, timeoutMsg: 'Expected 4 rows after clearing filter' });
    
    // Dar un momento adicional para que React actualice el DOM
    await browser.pause(300);
    
    // Verificar que el primer elemento volvió al inicial
    const restoredFirst = await TablePage.rows[0].$("td").getText();
    console.log('Restored first row:', restoredFirst, 'Initial:', initialFirst);
    await expect(restoredFirst).toBe(initialFirst);
    
    // Hacer click en ordenar - asegurarse de que el botón esté visible y clickeable
    await TablePage.sortButton.waitForClickable();
    await TablePage.sortButton.scrollIntoView();
    await TablePage.sortButton.click();
    
    // Esperar a que el ordenamiento se aplique - verificar que el primer elemento sea "Audífonos"
    await browser.waitUntil(async () => {
      // Esperar a que las filas estén actualizadas
      await TablePage.rows[0].waitForDisplayed();
      const newFirst = await TablePage.rows[0].$("td").getText();
      console.log('After sort first row:', newFirst, 'Expected: Audífonos');
      return newFirst === 'Audífonos';
    }, { 
      timeout: 5000, 
      interval: 200,
      timeoutMsg: 'Expected first row to be "Audífonos" after sorting. Current value: ' + (await TablePage.rows[0].$("td").getText())
    });
    
    // Verificar que el primer elemento cambió
    const newFirst = await TablePage.rows[0].$("td").getText();
    await expect(newFirst).not.toBe(initialFirst);
    await expect(newFirst).toBe('Audífonos');
  });

  it("abre y cierra un modal", async () => {
    await ModalPage.open();
    // Scroll y click en el botón de abrir
    await ModalPage.openButton.scrollIntoView();
    await ModalPage.openButton.click();
    await expect(ModalPage.backdrop).toBeDisplayed();
    // Esperar a que el botón de cerrar esté visible y clickeable
    await ModalPage.closeButton.waitForDisplayed();
    await ModalPage.closeButton.scrollIntoView();
    // Usar JavaScript click para evitar interceptación
    await browser.execute((buttonId) => {
      const btn = document.getElementById(buttonId);
      if (btn) {
        btn.click();
      }
    }, 'close-modal');
    // Esperar a que el modal se oculte
    await ModalPage.backdrop.waitForDisplayed({ reverse: true, timeout: 5000 });
    await expect(ModalPage.backdrop).not.toBeDisplayed();
  });

  it("maneja alerts, confirm y prompt", async () => {
    await AlertsPage.open();

    await AlertsPage.alertButton.click();
    await browser.acceptAlert();
    await expect(AlertsPage.output).toHaveTextContaining("Alert OK");

    await AlertsPage.confirmButton.click();
    await browser.dismissAlert();
    await expect(AlertsPage.output).toHaveTextContaining("Cancelado");

    await AlertsPage.promptButton.click();
    await browser.sendAlertText("Hola");
    await browser.acceptAlert();
    await expect(AlertsPage.output).toHaveTextContaining("Hola");
  });
});
