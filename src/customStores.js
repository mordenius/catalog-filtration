import _ from "lodash";
import StoreList from "@/storeList";
import { StoreController } from "redux-store-controller";

class CustomStores {
  constructor(options) {
    this.options = options;

    this.stores = new StoreController({
      storeList: StoreList
    });

    this.init();
  }

  init() {
    this.setStores();
  }

  get getStores() {
    return this.stores;
  }

  setStores() {
    if (false == this.isHaveOptionsField()) return;
    else this.customListing();
  }

  isHaveOptionsField() {
    return this.options.hasOwnProperty("customStores");
  }

  customListing() {
    _.map(this.stores, (store, key) => this.setCustomStores(key));
  }

  setCustomStores(store) {
    if (false == this.isCustom(store)) return;
    this.stores[store] = this.options.customStores[store];
  }

  isCustom(store) {
    if (false == this.options.customStores.hasOwnProperty(store)) return false;
    return true;
  }
}

export default CustomStores;
