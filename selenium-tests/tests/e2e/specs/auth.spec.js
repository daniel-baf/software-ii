const { expect } = require("@wdio/globals");
const LoginPage = require("../pageobjects/LoginPage");
const DashboardPage = require("../pageobjects/DashboardPage");

describe("Autenticación", () => {
  beforeEach(async () => {
    await browser.deleteCookies();
  });

  it("muestra error con credenciales inválidas", async () => {
    await LoginPage.open();
    await LoginPage.login("wrong", "creds");
    await expect(LoginPage.message).toBeDisplayed();
    await expect(LoginPage.message).toHaveTextContaining("Credenciales");
  });

  it("permite login y logout", async () => {
    await LoginPage.open();
    await LoginPage.login("demo", "demo");
    await expect(DashboardPage.welcomeText).toBeDisplayed();
    await expect(DashboardPage.welcomeText).toHaveTextContaining("Bienvenido");

    await DashboardPage.logout.click();
    await expect(LoginPage.message).toBeDisplayed();
    await expect(LoginPage.message).toHaveTextContaining("Sesión");
  });
});
