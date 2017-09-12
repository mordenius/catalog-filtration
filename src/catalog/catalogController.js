import FilterController from "~/filter/filterController";
import RestsController from "~/rests/restsController";

class CatalogController {
  constructor(options) {
    this.goods = options.goods;
    this.stores = options.stores;

    this.initProductList();

    this.filterController = new FilterController(options);
    this.restsController = new RestsController(options);

    if(typeof options.rests === "undefined") return;
		this.restsController.insertRests({rests: options.rests});
  }

  initProductList() {
    const products = Object.keys(this.goods);

    this.stores.productList.set(products);

    this.stores.selectedFilters.set({});
    this.stores.availableFilters.set({});
  }
}

export default CatalogController;
