class FilterAccept {
	constructor(options){
		this.stores = options.stores;
		this.filterFields = options.filterFields;
		this.priceField = options.priceField;

		this.products = {};

		this.filteredProducts = [];
	}

	filter(selectedFilters){
		console.time('FILTER');

		this.products = [];
		this.filteredProducts = [];

		switch(typeof selectedFilters){
			case 'string': this.filterString(selectedFilters); break;
			case 'object': this.filterObject(selectedFilters); break;
			default: break;
		}
		
		console.timeEnd('FILTER');
		this.stores.productList.setProductList(this.filteredProducts);
		console.log(this.filteredProducts.length)
	}

	filterString(selectedFilters){
		console.log(selectedFilters);
		// this.products = this.stores.
	}

	filterObject(selectedFilters){
		for(let field in selectedFilters){
			if(false == this.checkField(field)) continue;
			this.parseField(field, selectedFilters[field]);
		}
		this.parseProductsLists();
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
		let check = this.stores.filterMap.getStore[field][item];
		return ('undefined' == typeof check) ? false : true;
	}

	getProducts(field, item){
		if('undefined' == typeof this.products[field]) this.products[field] = [];
		this.products[field] = [...this.stores.filterMap.getStore[field][item].products];
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
			console.log(this.products[Object.keys(this.products)[field]].length)
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

export default FilterAccept;