import _ from "lodash";
import FilterListCollector from "~/listing/filterListCollector";

class FilterAvailable {
	constructor(options) {
		this.stores = options.stores;
		this.goods = options.goods;
		this.filterListCollector = new FilterListCollector(options);

		this.subscribe();
	}

	subscribe() {
		this.stores.productList.subscribe(() => {
			this.available();
		});
	}

	available() {
		console.time("AVAILABLE");

		let preset = this.stores.catalog.getStore.preset;
		let condition =
			0 < Object.keys(this.stores.selectedFilters.getStore).length;
		let available = condition
			? this.availableCommon()
			: this.availablePreset(preset);

		this.stores.availableFilters.set(available);

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
}

export default FilterAvailable;
