import FilterAcceptCollector from '~/listing/filterAcceptCollector';

class FilterAccept {
	constructor(options){
		this.stores = options.stores;
		this.filterAcceptCollector = new FilterAcceptCollector(options);
		this.selectedFilters = {};

		this.subscribe();
	}

	subscribe(){
		this.stores.selectedFilters.subscribe(() => {
			this.selectedFilters = this.stores.selectedFilters.getStore;
		})
	}

	filter(selectedFilters){
		console.time('FILTER');

		switch(typeof selectedFilters){
			case 'string': this.stores.catalog.preset(selectedFilters); break;
			case 'object': this.apply(selectedFilters); break;
			default: break;
		}
		
		console.timeEnd('FILTER');
	}

	change(type, filters){
		switch(type){
			case 'append': this.append(filters); break;
			case 'detach': this.detach(filters); break;
			default: break;
		}

		this.apply();
	}

	append(newFilters){
		for(let n in newFilters){
			if(Object.keys(this.selectedFilters).includes(n)) this.selectedFilters[n] = [...new Set([...this.selectedFilters[n], ...newFilters[n]])];
			else this.selectedFilters[n] = newFilters[n];
		}
	}

	detach(removeFilters){
		for(let n in removeFilters){
			if(false == Object.keys(this.selectedFilters).includes(n)) continue;
			for(let i in removeFilters[n]){
				let index = this.selectedFilters[n].indexOf(removeFilters[n][i]);
				if(0 > index) continue;
				this.selectedFilters[n].splice(index, 1);
			}
		}
	}

	apply(selectedFilters = this.selectedFilters){
		this.stores.selectedFilters.setFilters(selectedFilters);
	}
}

export default FilterAccept;