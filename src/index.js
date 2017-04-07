import CustomStores from './customStores';
import CatalogController from '~/catalog/catalogController';

class Catalog {
	constructor(options){
		this.options = options;
		this.customStores = new CustomStores(options);
		this.init();
	}

	init(){
		let options = Object.assign({}, {stores: this.storesInit()}, this.options);
		this._catalog = new CatalogController(options);
	}

	storesInit(){
		return this.customStores.getStores;
	}

	get getStores(){
		return {
			productList: this._catalog.stores.productList.getStore,
			availableFilters: this._catalog.stores.availableFilters.getStore,
			filterMap: this._catalog.stores.filterMap.getStore,
			selectedFilters: this._catalog.stores.selectedFilters.getStore,
			catalog: this._catalog.stores.catalog.getStore
		}
	}

	get getResult(){
		return {
			productList: this._catalog.stores.productList.getStore,
			availableFilters: this._catalog.stores.availableFilters.getStore,
			selectedFilters: this._catalog.stores.selectedFilters.getStore
		}
	}

	filter(type, selectedFilters = {}){
		return new Promise((resolve, reject) => {
			this._catalog.filterController.filter(type, selectedFilters);
			resolve(this.getResult);
		})
	}

	reset(){
		return new Promise((resolve, reject) => {
			this._catalog.filterController.reset();
			resolve(this.getResult);
		})
	}
}

export default Catalog;

