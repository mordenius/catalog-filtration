import FilterController from "~/filter/filterController";

class CatalogController {
  constructor(options) {
    this.goods = options.goods;
    this.stores = options.stores;

    this.initProductList();

    this.filterController = new FilterController(options);
  }

  initProductList() {
    const products = Object.keys(this.goods);

    this.stores.productList.set(products);

    this.stores.selectedFilters.set({});
    this.stores.availableFilters.set({});
  }
}

export default CatalogController;
