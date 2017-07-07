import _ from "lodash";

class FilterPresetCollector {
	constructor(options) {
		this.stores = options.stores;
		this.presetsRules = options.presetsRules;
		this.filterFields = options.filterFields;

		this.presets = {};

		this.listing();
	}

	listing() {
		_.map(this.presetsRules, (rules, name) => {
			this.presets[name] = { products: [], available: {} };
		});
	}

	doMagic() {
		_.map(this.presetsRules, (rules, name) => {
			this.isRulePassed({
				name: name,
				rules: rules
			});
		});
	}

	isRulePassed(options) {
		const map = this.stores.filterMap.getStore.map;

		let ruleProd = [];
		let availableProd = {};
		_.forEach(options.rules, (values, category) => {
			const cat = map[category];
			let catProd = [];
			_.forEach(values, value => {
				if (typeof cat[value] !== "undefined") {
					catProd = _.union(catProd, cat[value].products);
					availableProd = this.getAvialableForProduct({
						field: category,
						value: value,
						list: availableProd
					});
				}
			});
			ruleProd = ruleProd.length < 1
				? _.clone(catProd)
				: _.intersection(ruleProd, catProd);
		});

		this.presets[options.name].products = _.clone(ruleProd);
		this.presets[options.name].available = _.clone(availableProd);
	}

	getAvialableForProduct(options) {
		const map = this.stores.filterMap.getStore.map;
		let answer = {};
		_.map(map[options.field][options.value].available, (values, field) => {
			let result = _.union(values, options.list[field]);
			answer[field] = _.clone(result);
		});

		return answer;
	}
}

export default FilterPresetCollector;
