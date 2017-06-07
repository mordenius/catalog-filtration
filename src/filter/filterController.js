import ProductListing from '~/listingNew/productListing';
import FilterAvailable from './filterAvailable';
import FilterSelected from './filterSelected';
import FilterProductList from './filterProductList';

class FilterController {
	constructor(options){
		this.stores = options.stores;
		this.goods = options.goods;
		
		this.filterPresetCollector = new ProductListing(options);
		this.filterAvailable = new FilterAvailable(options);
		this.filterSelected = new FilterSelected(options);
		this.filterProductList = new FilterProductList(options);
		
		this.init();
	}

	init(){
		this.filterPresetCollector.listing();
	}

	filter(type, selectedFilters = {}){
		switch(type){
			case 'reset':
				this.reset(); break;
			case 'append':
			case 'detach':
				this.filterSelected.change(type, selectedFilters); break;
			case 'preset':
			case null: 
			case 'all': 
			default:
				this.filterSelected.filter(selectedFilters); break;
		}
	}

	reset(){
		this.stores.selectedFilters.set({});
	}
}

export default FilterController;