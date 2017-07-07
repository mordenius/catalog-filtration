import _ from "lodash";

class FilterAccept {
	constructor(options) {
		this.stores = options.stores;
	}

	filter(selectedFilters) {
		switch (typeof selectedFilters) {
			case "string":
				this.stores.catalog.preset(selectedFilters);
				this.stores.selectedFilters.set({});
				break;
			case "object":
				this.apply(selectedFilters);
				break;
			default:
				break;
		}
	}

	change(type, filters) {
		switch (type) {
			case "append":
				this.append(filters);
				break;
			case "detach":
				this.detach(filters);
				break;
			default:
				break;
		}
	}

	append(newFilters) {
		console.time("FILTER");

		const selectedFilters = this.stores.selectedFilters.getStore;

		_.map(newFilters, (values, category) => {
			if (_.has(selectedFilters, category))
				selectedFilters[category] = _.union(selectedFilters[category], values);
			else selectedFilters[category] = values;
		});

		console.timeEnd("FILTER");

		this.apply(selectedFilters);
	}

	detach(removeFilters) {
		console.time("FILTER");

		let selectedFilters = this.stores.selectedFilters.getStore;

		_.map(removeFilters, (values, category) => {
			if (_.has(selectedFilters, category)) {
				_.map(values, value => {
					selectedFilters[category] = _.without(
						selectedFilters[category],
						value
					);
				});
			}
			if (_.size(selectedFilters[category]) < 1)
				selectedFilters = _.omit(selectedFilters, [category]);
		});

		console.timeEnd("FILTER");

		this.apply(selectedFilters);
	}

	apply(selectedFilters) {
		this.stores.selectedFilters.set(selectedFilters);
	}
}

export default FilterAccept;
