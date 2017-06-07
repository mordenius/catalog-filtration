import _ from "lodash";

import FilterAvailableCollector from './filterAvailableCollector';
import FilterPresetCollector from './filterPresetCollector';

class ProductListing {
	constructor(options){
		// console.log(options)

		this.goods = options.goods;
		this.stores = options.stores;
		this.filterFields = options.filterFields;
		this.presetRules = options.presetsRules;

		this.availableCollector = new FilterAvailableCollector(options);
		this.presetCollector = new FilterPresetCollector(options);
	}

	listing(){
		_.map(this.goods, (item, key) => {
			this.listingItem(item, key);
		})

		this.stores.availableFilters.set(this.availableCollector.available)
		this.stores.filterMap.setFilterMap(this.availableCollector.mapCollector.map)

		this.presetCollector.presets.all = {
			products: _.clone(this.stores.productList.getStore),
			available: _.clone(this.availableCollector.available)
		}

		this.presetCollector.doMagic();

		this.stores.filterMap.setFilterPresets(this.presetCollector.presets)
	}

	listingItem(item, key){
		_.map(item, (value, field) => {
			if(true !== this.isFilteredField(field)) return false;
			this.availableCollector.checkAvailable({
				key: key,
				value: value,
				field: field
			});
		})
	}

	isFilteredField(field){
		return _.includes(this.filterFields, field);
	}
}

export default ProductListing;