const BasePage = require("./BasePage");

class TablePage extends BasePage {
  get filterInput() {
    return $("#filter-input");
  }

  get sortButton() {
    return $("#sort-name");
  }

  get rows() {
    return $$("#products-table tbody tr");
  }

  open() {
    return super.open("/dashboard/tables");
  }
}

module.exports = new TablePage();
