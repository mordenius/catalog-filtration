import _ from "lodash";

class FilterMapCollector {
	constructor(options){
		this.stores = options.stores;
		this.filterFields = options.filterFields;

		this.map = {};

		this.listing();
	}

	listing(){
		_.map(this.filterFields, (field) => {
			this.map[field] = {}
		})
	}

	createCategory(options){
		if(false === _.has(this.map, options.field)) this.map[options.field] = {};
	}

	createFieldOfCategory(options){
		this.createCategory(options);
		if (false === _.has(this.map[options.field], options.value)) {
			this.map[options.field][options.value] = {products: [], available: []};
		}
	}

	appendInProductList(options){
		this.map[options.field][options.value].products.push(options.key);
	}
}

export default FilterMapCollector;