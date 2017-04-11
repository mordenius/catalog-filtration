class ProductListing {
	constructor(options){
		this.goods = options.goods;
		this.filterFields = options.filterFields;
	}

	listing(){
		for (let key in this.goods){
			let product = this.goods[key];
			this.productParse({key: key, product: product});
		}
	}

	newGoods(newGoods){
		this.goods = newGoods;
	}

	productParse(options){
		for(let prop in options.product){
			if(-1 == this.filterFields.indexOf(prop)) continue;
			let value = options.product[prop];
			this.checkProp(Object.assign(options, {prop: prop, value: value}));
		}
	}

	checkProp(options){
		this.checkValue(options)
	}

	checkValue(options){

	}

}

export default ProductListing;