const BasePage = require("./BasePage");

class ModalPage extends BasePage {
  get openButton() {
    return $("#open-modal");
  }

  get closeButton() {
    return $("#close-modal");
  }

  get backdrop() {
    return $("#modal-backdrop");
  }

  open() {
    return super.open("/dashboard/modals");
  }
}

module.exports = new ModalPage();
