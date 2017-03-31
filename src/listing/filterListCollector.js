import ProductListing from './productListing';

class FilterListCollector extends ProductListing {
	constructor(options){
		super(options.goods);
		this.filterFields = options.filterFields;
		this.priceField = options.priceField;
		this.filterList = {};
	}

	isFilteredField(prop){
		return this.filterFields.includes(prop);
	}

	checkProp(options){
		if(null == options.value || false == this.isFilteredField(options.prop)) return;

		if(Object.keys(this.filterList).includes(options.prop)) this.checkValue(options);
		else this.appendProp(options);
	}

	appendProp(options){
		this.filterList[options.prop] = (this.priceField == options.prop) ? [options.value, options.value] : [options.value];
	}

	checkValue(options){
		if(this.filterList[options.prop].includes(options.value)) return;

		if(this.priceField == options.prop) this.checkPriceField(options);
		else this.appendValue(options);
	}

	appendValue(options){
		this.filterList[options.prop].push(options.value);
	}

	checkPriceField(options){
		if(this.filterList[this.priceField][0] > options.value) this.filterList[this.priceField][0] = options.value;
		if(this.filterList[this.priceField][1] < options.value) this.filterList[this.priceField][1] = options.value;
	}
}

export default FilterListCollector;