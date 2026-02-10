const BasePage = require("./BasePage");

class AlertsPage extends BasePage {
  get alertButton() {
    return $("#alert-btn");
  }

  get confirmButton() {
    return $("#confirm-btn");
  }

  get promptButton() {
    return $("#prompt-btn");
  }

  get output() {
    return $("#alert-output");
  }

  open() {
    return super.open("/dashboard/alerts");
  }
}

module.exports = new AlertsPage();
