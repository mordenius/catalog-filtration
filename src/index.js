import StoreList from '@/storeList';
import {StoreController} from 'redux-store-controller';
import CatalogController from '~/catalog/catalogController';

class Catalog {
	constructor(options){
		this.options = options;
		this.init();
	}

	init(){
		let options = Object.assign({}, {stores: this.storesInit()}, this.options);
		this._catalog = new CatalogController(options);
	}

	storesInit(){
		return new StoreController({
   	 storeList: StoreList
		})
	}

	get getStores(){
		return {
			productList: this._catalog.stores.productList.getStore,
			availableFilters: this._catalog.stores.availableFilters.getStore,
			filterMap: this._catalog.stores.filterMap.getStore,
		}
	}

	filter(selectedFilters = {}){
		return new Promise((resolve, reject) => {
			this._catalog.filterController.filter(selectedFilters)
			resolve(this.getStores);
		})
	}

	reset(){
		return new Promise((resolve, reject) => {
			this._catalog.filterController.reset()
			resolve(this.getStores);
		})
	}
}

export default Catalog;
