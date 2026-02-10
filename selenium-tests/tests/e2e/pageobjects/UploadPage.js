const BasePage = require("./BasePage");

class UploadPage extends BasePage {
  get fileInput() {
    return $("#file-input");
  }

  get output() {
    return $("#upload-output");
  }

  open() {
    return super.open("/dashboard/upload");
  }
}

module.exports = new UploadPage();
