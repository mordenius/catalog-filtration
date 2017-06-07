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

	filter(type, selectedFilters = {}){
		return new Promise((resolve, reject) => {
			const unsubscribe = this._catalog.stores.availableFilters.subscribe(() => {
				unsubscribe();
				resolve();
			})

			this._catalog.filterController.filter(type, selectedFilters);
		})
	}

	reset(){
		return new Promise((resolve, reject) => {
			const unsubscribe = this._catalog.stores.availableFilters.subscribe(() => {
				unsubscribe();
				resolve();
			})

			this._catalog.filterController.reset();
		})
	}
}

export default Catalog;

