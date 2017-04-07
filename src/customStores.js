import StoreList from '@/storeList';
import {StoreController} from 'redux-store-controller';

class CustomStores {
	constructor(options){
		this.options = options;

		this.stores = new StoreController({
			storeList: StoreList
		});

		this.init();
	}

	init(){
		this.setStores();
	}

	get getStores(){
		return this.stores;
	}

	setStores(){
		if(false == this.isHaveOptionsField()) return;
		else this.customListing();
	}

	isHaveOptionsField(){
		return this.options.hasOwnProperty('customStores');
	}

	customListing(){
		for(let n in this.stores){
			this.setCustomStores(n);
		}
	}

	setCustomStores(store){
		if(false == this.isCustom(store)) return;
		this.stores[store] = this.options.customStores[store];
	}

	isCustom(store){
		if(false == this.options.customStores.hasOwnProperty(store)) return false;
		return true;
	}
}

export default CustomStores;