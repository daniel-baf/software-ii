const BasePage = require("./BasePage");

class IframePage extends BasePage {
  get iframe() {
    return $("#demo-iframe");
  }

  get buttonInside() {
    return $("#iframe-btn");
  }

  get outputInside() {
    return $("#iframe-output");
  }

  open() {
    return super.open("/dashboard/windows");
  }
}

module.exports = new IframePage();
