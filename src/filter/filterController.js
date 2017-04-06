import FilterPresetCollector from '~/listing/filterPresetCollector';
import FilterAccept from './filterAccept';
import FilterListCollector from '~/listing/filterListCollector';

class FilterController {
	constructor(options){
		this.stores = options.stores;

		this.goods = options.goods;

		this.filterPresetCollector = new FilterPresetCollector(options);
		this.filterPresetCollector.listing();

		this.filterListCollector = new FilterListCollector(options);

		this.filterAccept = new FilterAccept(options);
		this.setStores();
	}

	setStores(){
		this.stores.availableFilters.setFilterList(this.filterPresetCollector.filterList);
		this.stores.filterMap.setFilterMap(this.filterPresetCollector.filterMap);
		this.stores.filterMap.setFilterPresets(this.filterPresetCollector.presetProducts);
	}

	filter(type, selectedFilters = {}){
		switch(type){
			case 'append':
			case 'detach':
				this.filterAccept.change(type, selectedFilters); break;
			case 'reset':
				this.resetPreset(); break;
			case 'preset':
			case null: 
			case 'all': 
			default:
				this.filterAccept.filter(selectedFilters); break;
		}
		this.available();		
	}

	available(){
		console.time('AVAILABLE')

		let preset = this.stores.catalog.getStore.preset;
		if(null == preset || 0 < Object.keys(this.stores.selectedFilters.getStore).length) this.availableCommon();
		else this.availablePreset(preset);
		
		console.timeEnd('AVAILABLE')
	}

	availablePreset(preset){
		let available = this.stores.filterMap.getStore.presets[preset].available;
		this.stores.availableFilters.setFilterList(available);
	}

	availableCommon(){
		let goods = this.stores.productList.getStore.map((el) => {
			return this.goods[el];
		})

		this.filterListCollector.newGoods(goods);
		this.filterListCollector.listing();

		this.stores.availableFilters.setFilterList(this.filterListCollector.filterList);
	}

	resetPreset(){
		let curPreset = this.stores.catalog.getStore.preset;
		if(null != curPreset) this.filterAccept.filter(curPreset);
		else {
			let products = Object.keys(this.goods);
			this.stores.productList.setProductList(products);
		}
	}

	reset(){
		let products = Object.keys(this.goods);
		this.stores.productList.setProductList(products);
		this.available();
	}

}

export default FilterController;