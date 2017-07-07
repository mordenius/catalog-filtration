import _ from "lodash";

class FilterProductList {
  constructor(options) {
    this.stores = options.stores;

    this.subscribe();
  }

  subscribe() {
    this.stores.selectedFilters.subscribe(() => {
      const selectedFilters = this.stores.selectedFilters.getStore;
      if (_.keys(selectedFilters).length > 0)
        this.applyFilters(selectedFilters);
      else this.applyPreset();
    });
  }

  applyFilters(selectedFilters) {
    const map = this.stores.filterMap.getStore.map;

    const prod = {};

    _.map(selectedFilters, (values, category) => {
      _.map(values, value => {
        if (typeof map[category][value] === "object") {
          if (false === _.has(prod, category)) prod[category] = [];
          prod[category].push(map[category][value].products);
        }
      });
    });

    let result = [];
    _.map(prod, (lists, category) => {
      let catProd = [];
      _.map(lists, list => {
        catProd = catProd.length < 1 ? _.clone(list) : _.union(catProd, list);
      });

      result = result.length < 1
        ? _.clone(catProd)
        : _.intersection(result, catProd);
    });

    this.stores.productList.set(result);
  }

  applyPreset() {
    const map = this.stores.filterMap.getStore.presets;
    const pre = this.stores.catalog.getStore.preset;
    const preset = _.has(map, pre) ? pre : "all";

    this.stores.productList.set(map[preset].products);
  }
}

export default FilterProductList;
