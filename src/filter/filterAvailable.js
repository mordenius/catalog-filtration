import _ from "lodash";

class FilterAvailable {
	constructor(options) {
		this.stores = options.stores;
		this.ff = options.filterFields;

		this.goods = {};

		_.forEach(options.goods,(val, key) => this.goods[key] = _.pick(val, this.ff));

		this.subscribe();
	}

	subscribe() {
		this.stores.productList.subscribe(() => {
			this.available();
		});
	}

	available() {
		console.time("AVAILABLE");
		//
		// let preset = this.stores.catalog.getStore.preset;
		// let condition =
		// 	0 < Object.keys(this.stores.selectedFilters.getStore).length;
		// let available = condition
		// 	? this.availableCommonNew()
		// 	: this.availablePreset(preset);
		//
		// this.stores.availableFilters.set(available);
		this.stores.availableFilters.set(this.availableCommonNew());

		console.timeEnd("AVAILABLE");
	}

	availablePreset(preset) {
		return _.clone(this.stores.filterMap.getStore.presets[preset].available);
	}

	availableCommon() {
		const preset = this.stores.catalog.getStore.preset;
		const available = (preset) ? this.availablePreset(preset) : {};

		const map = this.stores.filterMap.getStore.map;
		const selectedFilters = this.stores.selectedFilters.getStore;

		_.map(selectedFilters, (values, category) => {
			_.map(values, value => {
				if (typeof map[category][value] === "object") {
					_.map(map[category][value].available, (items, key) => {
						if (false === _.has(available, key)) available[key] = items;
						else available[key] = _.intersection(available[key], items);
					});
				}
			});
		});

		return available;
	}

	availableCommonNew() {
		const productList = this.stores.productList.getStore;
		const actual = this.stores.availableFilters.getStore;
		const selectedFilters = this.stores.selectedFilters.getStore;
		const available = {};

		_.forEach(this.ff, v => available[v] = []);
			_.forEach(this.ff, field => {
				if(_.has(selectedFilters, field)) available[field] = _.clone(actual[field]);
				else if (field === 'PRICE_ACTION') return;
				else{
					_.forEach(productList, key => {
						if(field === 'SIZE') _.forEach(this.availableByRests({key: key}), size => {available[field].push(size)});
						else available[field].push(this.goods[key][field]);
					})
				}
			})

		_.forEach(available, (val, key) => available[key] = _.uniq(val))

		return available;
	}

	availableByRests(options) {
		const rests = this.stores.rests.getStore[options.key];
		if(typeof rests === "undefined") return;
		return typeof rests === "undefined" ? [] : rests;
	}
}

export default FilterAvailable;
