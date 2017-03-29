import FilterPresetCollector from './filterPresetCollector';
import FilterAccept from './filterAccept';

class FilterController {
	constructor(options){
		this.stores = options.stores;

		this.filterPresetCollector = new FilterPresetCollector(options);
		this.filterPresetCollector.listing();

		this.filterAccept = new FilterAccept(options);
		this.setStores();
	}

	setStores(){
		this.stores.availableFilters.setFilterList(this.filterPresetCollector.filterList);
		this.stores.filterMap.setFilterMap(this.filterPresetCollector.filterMap);
	}

	filter(selectedFilters){
		this.filterAccept.filter(selectedFilters);
	}

	reset(){

	}

}

export default FilterController;