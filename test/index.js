import Catalog from '~/';
import Goods from './out_goods.json';

let options = {
	goods: Goods,
	filterFields: ["VID_TOVARA_UA", "CVET_UA", "BRAND", "PRICE_ACTION", "SEASON_UA", "STYLE_UA", "PODKL_UA", 
			"VERX_UA", "PODOSHVA_UA", "TECHNOLOGY", "GENDER_UA", "ACCESSORY", "UNIQUE", "UNIQUE_SEASON"],
	priceField: 'PRICE_ACTION',
	presetsRules: {
		'female': {"GENDER_UA": ["Жіноче"], "ACCESSORY": ["N"]},
		'male': {"GENDER_UA": ["Чоловіче"], "ACCESSORY": ["N"]} 
	}
}

let catalog = new Catalog(options);

console.time('FILTER_INIT');

let selected = {
	BRAND: ['Braska'],
	SEASON_UA: ['Осінь-Зима 2016', 'Осінь-Зима 2015'],
	TODAY: []
}

let append =  {
	BRAND: ['Ecco', 'Braska', 'Timberland'],
	CVET_UA: ['Бузковий']
}

let detach =  {
	BRAND: ['Braska', 'Ecco']
}

// let selected = 'female';
catalog.filter('preset', 'female')
	.then(getStores)
	.then(() => catalog.filter('reset'))
	.then(getStores)
	.then(() => catalog.filter('append', append))
	.then(getStores)
	.then(() => catalog.filter('detach', detach))
	.then(getStores)
	.then(() => console.timeEnd('FILTER_INIT'))

function getStores(stores){
	console.log(stores.productList.length);
	console.log(stores);
}