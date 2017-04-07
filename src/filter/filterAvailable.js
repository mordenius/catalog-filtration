import FilterListCollector from '~/listing/filterListCollector';

class FilterAvailable {
	constructor(options){
		this.stores = options.stores;
		this.goods = options.goods;
		this.filterListCollector = new FilterListCollector(options);
	}

	available(){
		console.time('AVAILABLE')

		let preset = this.stores.catalog.getStore.preset;
		let condition = (null == preset || 0 < Object.keys(this.stores.selectedFilters.getStore).length);
		let available = (condition) ? this.availableCommon() : this.availablePreset(preset);
		
		this.stores.availableFilters.set(available);

		console.timeEnd('AVAILABLE')
	}

	availablePreset(preset){
		return this.stores.filterMap.getStore.presets[preset].available;
	}

	availableCommon(){
		let goods = {};
		this.stores.productList.getStore.map((key) => goods[key] = this.goods[key]);

		this.filterListCollector.newGoods(goods);
		this.filterListCollector.listing();

		return this.filterListCollector.filterList;
	}
}

export default FilterAvailable;