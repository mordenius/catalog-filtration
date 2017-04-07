import FilterController from '~/filter/filterController';

class CatalogController {
	constructor(options){
		this.stores = options.stores;
		this.goods = options.goods;

		this.initProductList();

		this.filterController = new FilterController(options);
	}

	initProductList(){
		let products = Object.keys(this.goods);
		this.stores.productList.set(products);
		this.stores.selectedFilters.set({});
		this.stores.availableFilters.set({});
	}
}

export default CatalogController;