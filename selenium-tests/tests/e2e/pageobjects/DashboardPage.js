const BasePage = require("./BasePage");

class DashboardPage extends BasePage {
  get welcomeText() {
    return $("#welcome-text");
  }

  get logout() {
    return $("#logout-link");
  }
}

module.exports = new DashboardPage();
