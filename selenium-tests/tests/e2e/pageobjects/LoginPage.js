const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  get username() {
    return $("#username");
  }

  get password() {
    return $("#password");
  }

  get submit() {
    return $("#login-submit");
  }

  get message() {
    return $("#login-message");
  }

  open() {
    return super.open("/login");
  }

  async login(username, password) {
    await this.username.setValue(username);
    await this.password.setValue(password);
    await this.submit.click();
    
    // Only wait for redirect if credentials are valid (demo/demo)
    if (username === 'demo' && password === 'demo') {
      await browser.waitUntil(
          async () => (await browser.getUrl()).includes('/dashboard'),
          {
              timeout: 5000,
              timeoutMsg: 'Expected URL to contain /dashboard after login'
          }
      );
    } else {
      // For invalid credentials, wait a bit for the error message to appear
      await browser.pause(500);
    }
  }
}

module.exports = new LoginPage();
