import FilterPresetCollector from '~/listing/filterPresetCollector';
import FilterAvailable from './filterAvailable';
import FilterSelected from './filterSelected';
import FilterReset from './filterReset';

class FilterController {
	constructor(options){
		this.stores = options.stores;
		this.goods = options.goods;
		
		this.filterPresetCollector = new FilterPresetCollector(options);
		this.filterAvailable = new FilterAvailable(options);
		this.filterSelected = new FilterSelected(options);
		this.filterReset = new FilterReset(Object.assign({}, options, {filterSelected: this.filterSelected}));
		
		this.init();
	}

	init(){
		this.filterPresetCollector.listing();
		this.setStores();
	}

	setStores(){
		this.stores.availableFilters.set(this.filterPresetCollector.filterList);
		this.stores.filterMap.setFilterMap(this.filterPresetCollector.filterMap);
		this.stores.filterMap.setFilterPresets(this.filterPresetCollector.presetProducts);
	}

	filter(type, selectedFilters = {}){
		switch(type){
			case 'reset':
				this.filterReset.reset(); break;
			case 'append':
			case 'detach':
				this.filterSelected.change(type, selectedFilters); break;
			case 'preset':
			case null: 
			case 'all': 
			default:
				this.filterSelected.filter(selectedFilters); break;
		}
		this.filterAvailable.available();		
	}

	reset(){
		this.stores.catalog.preset(null);
		this.filterReset.reset();
		this.filterAvailable.available();
	}
}

export default FilterController;