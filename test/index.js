import Catalog from "../src/index";
import Goods from "./out_goods.json";

import StoreList from "./data/storeList";
import { StoreController } from "redux-store-controller";

let stores = new StoreController({
  storeList: StoreList
});

let options = {
  goods: Goods,
  filterFields: [
    "VID_TOVARA_UA",
    "CVET_UA",
    "BRAND",
    "PRICE_ACTION",
    "SEASON_UA",
    "STYLE_UA",
    "PODKL_UA",
    "VERX_UA",
    "PODOSHVA_UA",
    "TECHNOLOGY",
    "GENDER_UA",
    "ACCESSORY",
    "UNIQUE",
    "UNIQUE_SEASON"
  ],
  priceField: "PRICE_ACTION",
  presetsRules: {
    female: { GENDER_UA: ["Жіноче"], ACCESSORY: ["N"] },
    male: { GENDER_UA: ["Чоловіче"], ACCESSORY: ["N"] }
  },
  customStores: {
    productList: stores.productList,
    selectedFilters: stores.selectedFilters,
    availableFilters: stores.availableFilters
  }
};

let catalog;

global.init = () => {
  console.time("CATALOG_INIT");
  catalog = new Catalog(options);
  console.timeEnd("CATALOG_INIT");
};

global.getStores = () => {
  console.log(catalog.getStores);
};

let selected = {
  BRAND: ["Braska"],
  SEASON_UA: ["Осінь-Зима 2016", "Осінь-Зима 2015"],
  TODAY: []
};

let append = {
  BRAND: ["Ecco", "Braska", "Timberland"]
};

let detach = {
  BRAND: ["Braska", "Ecco"]
};

// let selected = 'female';
//
global.test = () => {
  catalog
    .filter("preset", "female")
    .then(getStores)
    .then(() => catalog.filter("append", selected))
    .then(getStores)
    .then(() => catalog.filter("detach", detach))
    .then(getStores)
    .then(() => catalog.reset());
  // .then(() => console.timeEnd('FILTER_INIT'))
};

function getStores() {
  console.log(stores.productList.getStore.length);
  // console.log(stores);
}

init();
console.log("load success");
