const BasePage = require("./BasePage");

class WindowsPage extends BasePage {
  get openButton() {
    return $("#open-window");
  }

  get output() {
    return $("#window-output");
  }

  open() {
    return super.open("/dashboard/windows");
  }
}

module.exports = new WindowsPage();
