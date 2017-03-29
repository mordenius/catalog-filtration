import FilterController from '~/filter/filterController';

class CatalogController {
	constructor(options){
		this.stores = options.stores;
		this.goods = options.goods;

		this.filterController = new FilterController(options);
		
		this.initProductList();
	}

	initProductList(){
		let products = Object.keys(this.goods);
		this.stores.productList.setProductList(products);
	}
}

export default CatalogController;