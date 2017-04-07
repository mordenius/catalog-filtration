class FilterAcceptCollector {
	constructor(options){
		this.stores = options.stores;
		this.goods = options.goods;
		this.filterFields = options.filterFields;
		this.priceField = options.priceField;

		this.products = {};
		this.filteredProducts = [];

		this.preset = null;
		this.selectedFilters = {};

		this.subscribe();
	}

	subscribe(){
		this.stores.catalog.subscribe(() => {
			let newState = this.stores.catalog.getStore;
			if(this.preset == newState.preset) return;
			this.preset = newState.preset;
			this.filterString();
		})

		this.stores.selectedFilters.subscribe(() => {
			this.selectedFilters = this.stores.selectedFilters.getStore;
			this.filterObject();
		})
	}

	filterString(){
		this.filteredProducts = (null == this.preset) ? Object.keys(this.goods) : this.stores.filterMap.getStore.presets[this.preset].products;
		this.stores.productList.set(this.filteredProducts);
	}

	filterObject(){
		this.products = {};
		this.filteredProducts = [];

		for(let field in this.selectedFilters){
			if(false == this.checkField(field)) continue;
			this.parseField(field, this.selectedFilters[field]);
		}

		this.parseProductsLists();
		this.stores.productList.set(this.filteredProducts);
	}

	checkField(field){
		return (this.filterFields.includes(field));
	}

	parseField(field, items){
		for(let key in items){
			if(false == this.checkItem(field, items[key])) continue;
			this.getProducts(field, items[key]);
		}
	}

	checkItem(field, item){
		let check = this.stores.filterMap.getStore.map[field][item];
		return ('undefined' == typeof check) ? false : true;
	}

	getProducts(field, item){
		if('undefined' == typeof this.products[field]) this.products[field] = [];
		if(null == this.preset){
			this.products[field] = [...this.products[field], ...this.stores.filterMap.getStore.map[field][item].products];
		}else{
			this.products[field] = [...this.products[field], ...this.stores.filterMap.getStore.presets[this.preset].map[field][item].products];
		}
	}

	sortProductsLists(){
		Object.keys(this.products).sort((a, b) => (
			(this.products[a].length > this.products[b].length) ? 1 : -1
		))
	}

	parseProductsLists(){
		this.sortProductsLists();
		let first = null;

		for(let field in Object.keys(this.products)){
			if(null == first) first = Object.keys(this.products)[field];
		}

		for(let product in this.products[first]){
			this.checkProduct(first, this.products[first][product])
		}
	}

	checkProduct(first, product){
		let pass = true;
		for(let n in Object.keys(this.products)){
			let field = Object.keys(this.products)[n]
			if(field == first) continue;
			if(false == this.products[field].includes(product)) pass = false;
		}

		if(pass) this.filteredProducts.push(product)
	}
}

export default FilterAcceptCollector;