const BasePage = require("./BasePage");

class DragDropPage extends BasePage {
  get draggable() {
    return $("#drag-item");
  }

  get dropZone() {
    return $("#drop-zone");
  }

  get status() {
    return $("#drop-status");
  }

  open() {
    return super.open("/dashboard/dragdrop");
  }
}

module.exports = new DragDropPage();
