import FilterListCollector from './filterListCollector';

class FilterMapCollector extends FilterListCollector {
	constructor(options){
		super(options);
		this.filterMap = {};
	}

	checkValue(options){
		super.checkValue(options);
		this.append(options);
	}

	append(options){
		if(false == Object.keys(this.filterMap).includes(options.prop)) this.filterMap[options.prop] = [];
		if(false == Object.keys(this.filterMap[options.prop]).includes(options.value)) this.filterMap[options.prop][options.value] = {products: []};
		this.filterMap[options.prop][options.value].products.push(options.key);
	}
}

export default FilterMapCollector;