import FilterMapCollector from './filterMapCollector';

class FilterPresetCollector extends FilterMapCollector{
	constructor(options){
		super(options);
		this.presetRules = options.presetsRules;
		this.presetProducts = {}; 

		this.presetMap = new FilterMapCollector(options); 

		this.length = 0;
	}

	productParse(options){
		super.productParse(options);
		this.parsePresets(options);

		this.length++;
		if(this.length == Object.keys(this.goods).length) this.presetAvailable();
	}

	parsePresets(options){
		for(let key in this.presetRules) {
			let isValid = true;
			if(false == Object.keys(this.presetProducts).includes(key)) this.presetProducts[key] = {products: [], available: {}, map: {}};
			for(let prop in this.presetRules[key]){
				if(false == isValid) continue;
				isValid = this.isValidPropInProduct(options.product, prop, this.presetRules[key][prop]);
			}
			if(false == isValid) continue;
			else this.appendPresetProduct(key, options);
		}
	}

	appendPresetProduct(preset, options){
		this.presetProducts[preset].products.push(options.key);
	}

	presetAvailable(){
		for(let n in this.presetProducts){
			let newGoods = this.presetProducts[n].products.map((key) => (this.goods[key]))
			this.presetMap.newGoods(newGoods);
			this.presetMap.listing()
			this.presetProducts[n].available = this.presetMap.filterList;
			this.presetProducts[n].map = this.presetMap.filterMap;
		}
	}

	isValidPropInProduct(product, prop, value){
		if('undefined' != typeof product[prop] && value.includes(product[prop])) return true;
		else return false;
	}
}

export default FilterPresetCollector;