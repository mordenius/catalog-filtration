import _ from "lodash";
import FilterMapCollector from './filterMapCollector';

class FilterAvailableCollector {
	constructor(options){
		this.stores = options.stores;
		this.filterFields = options.filterFields;

		this.mapCollector = new FilterMapCollector(options);

		this.availableMask = {};
		this.available = null;

		this.listing();
	}

	listing(){

		_.forEach(this.filterFields, (item) => {
			this.availableMask[item] = [];
		})

		this.reset();
	}

	checkAvailable(options){
		if(false === this.isRepeatedValue(options)) {
			this.available[options.field].push(options.value);
			this.mapCollector.createFieldOfCategory(options)
		}

		this.mapCollector.appendInProductList(options);
	}

	isRepeatedValue(options){
		return _.includes(this.available[options.field], options.value);
	}

	reset(){
		this.available = _.clone(this.availableMask);
	}
}

export default FilterAvailableCollector;