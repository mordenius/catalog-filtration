import _ from "lodash";

class FilterMapCollector {
  constructor(options) {
    this.goods = options.goods;
    this.stores = options.stores;
    this.filterFields = options.filterFields;

    this.map = {};

    this.listing();
  }

  listing() {
    _.map(this.filterFields, field => {
      this.map[field] = {};
    });
  }

  createCategory(options) {
    if (false === _.has(this.map, options.field)) this.map[options.field] = {};
  }

  createFieldOfCategory(options) {
    this.createCategory(options);
    if (false === _.has(this.map[options.field], options.value)) {
      const av = {};
      _.map(this.filterFields, field => {
        av[field] = [];
      });

      this.map[options.field][options.value] = { products: [], available: av };
    }
  }

  appendInProductList(options) {
    this.map[options.field][options.value].products.push(options.key);
    this.getAvialableForProduct(options);
  }

  getAvialableForProduct(options) {
    const result = this.map[options.field][options.value].available[options.f];
    this.map[options.field][options.value].available[
      options.f
    ] = _.union(result, [options.v]);
  }
}

export default FilterMapCollector;
