class FilterReset {
	constructor(options){
		this.stores = options.stores;
		this.goods = options.goods;

		this.filterSelected = options.filterSelected;
	}

	reset(){
		let preset = this.stores.catalog.getStore.preset;
		if(null == preset) this.resetFull();
		else this.resetPreset(preset);
	}

	resetPreset(preset){
		this.filterSelected.filter(preset);
	}

	resetFull(){
		let products = Object.keys(this.goods);
		this.stores.productList.setProductList(products);
	}
}

export default FilterReset;