import FilterPresetCollector from '~/listing/filterPresetCollector';
import FilterAccept from './filterAccept';
import FilterListCollector from '~/listing/filterListCollector';

class FilterController {
	constructor(options){
		this.stores = options.stores;

		this.goods = options.goods;

		this.filterPresetCollector = new FilterPresetCollector(options);
		this.filterPresetCollector.listing();

		this.filterListCollector = new FilterListCollector(options);

		this.filterAccept = new FilterAccept(options);
		this.setStores();
	}

	setStores(){
		this.stores.availableFilters.setFilterList(this.filterPresetCollector.filterList);
		this.stores.filterMap.setFilterMap(this.filterPresetCollector.filterMap);
		this.stores.filterMap.setFilterPresets(this.filterPresetCollector.presetProducts);
	}

	filter(selectedFilters){
		this.filterAccept.filter(selectedFilters);
		this.available();		
	}

	available(){
		console.time('AVAILABLE')
		let goods = this.stores.productList.getStore.map((el) => {
			return this.goods[el];
		})

		this.filterListCollector.newGoods(goods);
		this.filterListCollector.listing();

		this.stores.availableFilters.setFilterList(this.filterListCollector.filterList);
		console.timeEnd('AVAILABLE')
	}

	reset(){

	}

}

export default FilterController;