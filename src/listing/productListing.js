class ProductListing {
	constructor(goods){
		this.goods = goods;
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