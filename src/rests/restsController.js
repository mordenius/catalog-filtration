import _ from "lodash";

class RestsController {
	constructor(options){
		this.stores = options.stores;
	}

	insertRests(options) {
		return new Promise((resolve, reject) => {
			this.rests = options.rests;
			this.parseRests()
				.then(this.insertion.bind(this))
				.catch(reject);
		})
	}

	parseRests(){
		const parsed = {};
		const sizeList = [];
		return new Promise((resolve, reject) => {
			try {
				_.forEach(this.rests, (sizes, key) => {
						parsed[key] = [];
						_.forEach(sizes, (qty, size) => {
							if(qty > 0) {
								parsed[key].push(size);
								sizeList.push(size);
							}
						})
				});
				this.rests = parsed;
				resolve(_.uniq(sizeList));
			} catch (err) {
				reject(err);
			}
		})
	}

	insertion(sizeList){
		this.stores.rests.set(this.rests);
		const map = this.stores.filterMap.getStore.map;
		map.SIZE = {};

		_.forEach(sizeList, size => {
			map.SIZE[size] = {available: {}, products: []};
		})

		_.forEach(this.rests, (sizes, key) => {
			_.forEach(sizes, size => {
				map.SIZE[size].products.push(key);
			})
		});
		this.stores.filterMap.setFilterMap(map);
	}
}

export default RestsController;