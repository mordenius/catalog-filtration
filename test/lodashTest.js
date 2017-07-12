import Goods from './out_goods.json';
import _ from "lodash";
console.log('start')

console.time("LODASH")

const a = _.some(Goods, {"GENDER_UA": "Жіноче"});

console.log(a)

console.timeEnd("LODASH")

// console.time("LODASH2")
//
// const b = Object.keys(Goods);
//
// // console.log(b)
//
// console.timeEnd("LODASH2")