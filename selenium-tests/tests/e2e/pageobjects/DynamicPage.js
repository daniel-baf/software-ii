const BasePage = require("./BasePage");

class DynamicPage extends BasePage {
  get loadButton() {
    return $("#load-data");
  }

  get output() {
    return $("#dynamic-output");
  }

  get badge() {
    return $("#dynamic-badge");
  }

  open() {
    return super.open("/dashboard/dynamic");
  }
}

module.exports = new DynamicPage();
