import Goods from './out_goods.json';
import _ from "lodash";

console.time("LODASH")

const a = _.keys(Goods);

console.log(a)

console.timeEnd("LODASH")

console.time("LODASH2")

const b = Object.keys(Goods);

console.log(b)

console.timeEnd("LODASH2")