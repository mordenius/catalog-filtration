import FilterMapCollector from './filterMapCollector';

class FilterPresetCollector extends FilterMapCollector{
	constructor(options){
		super(options);

		this.presetRules = options.presetsRules;
		this.presetProducts = {}; 
	}

	productParse(options){
		super.productParse(options);
		this.parsePresets(options);
	}

	parsePresets(options){
		for(let key in this.presetRules) {
			let isValid = true;
			if(false == Object.keys(this.presetProducts).includes(key)) this.presetProducts[key] = [];
			for(let prop in this.presetRules[key]){
				if(false == isValid) continue;
				isValid = this.isValidPropInProduct(options.product, prop, this.presetRules[key][prop]);
			}
			if(false == isValid) continue;
			else this.presetProducts[key].push(options.key);
		}
	}

	isValidPropInProduct(product, prop, value){
		if('undefined' != typeof product[prop] && value.includes(product[prop])) return true;
		else return false;
	}
}

export default FilterPresetCollector;