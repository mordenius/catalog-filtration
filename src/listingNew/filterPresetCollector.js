import _ from "lodash";

class FilterPresetCollector {
	constructor(options){
		this.stores = options.stores;
		this.presetsRules = options.presetsRules;

		this.presets = {};

		this.listing();

		this.curKey = null;
	}

	listing(){
		_.map(this.presetsRules, (rules, name) => {
			this.presets[name] = {products: [], available: []};
		})
	}

	doMagic(options){
		// if(this.curKey != options.key) this.parseKey(options);
		_.map(this.presetsRules, (rules, name) => {
			this.isRulePassed({
				name: name,
				rules: rules
			})
		})
	}

	isRulePassed(options){
		const map = this.stores.filterMap.getStore.map;

		let ruleProd = [];
		_.map(options.rules, (values, category) => {

			const cat = map[category];
			let catProd = [];
			_.map(values, (value) => {
				catProd = _.union(catProd, cat[value].products);
			})
			ruleProd = (ruleProd.length < 1) ? _.clone(catProd) : _.intersection(ruleProd, catProd);
		})

		this.presets[options.name].products = _.clone(ruleProd);
	}

	parseKey(options){
		if(this.isAppend) appendPresetProduct(options);
		this.curKey = options.key;
		this.isAppend = true;
	}

	appendPresetProduct(options){

	}
}

export default FilterPresetCollector;