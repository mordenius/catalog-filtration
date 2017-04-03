# Catalog-filtration

---

## *IN DEV: Unstable*

---
[![npm version](https://img.shields.io/npm/v/catalog-filtration.svg)](https://www.npmjs.com/package/catalog-filtration)
[![node](https://img.shields.io/node/v/gh-badges.svg)](https://github.com/mordenius/catalog-filtration)
[![build status](https://travis-ci.org/mordenius/catalog-filtration.svg?branch=master)](https://travis-ci.org/mordenius/catalog-filtration)
[![dependencies Status](https://david-dm.org/mordenius/catalog-filtration/status.svg)](https://david-dm.org/mordenius/catalog-filtration)
[![devDependencies Status](https://david-dm.org/mordenius/catalog-filtration/dev-status.svg)](https://david-dm.org/javiercf/catalog-filtration?type=dev)
---
## Table of Contents
1. [Description](#description)
2. [Installation](#installation)
3. [Import](#import)
4. [Usage](#usage)
5. [How it work](#how-it-work)
6. [Constructor options](#constructor-options)
7. [Interface](#interface)
    1. [Filtering](#filtering)
    2. [Reset filters](#reset-filters)

---

#### <a name="description"></a>Description
It filters the objects of the associative array of data, by providing a filtering control interface.

#### <a name="installation"></a>Installation
```
npm i catalog-filtration
```

#### <a name="import"></a>Import
```javascript
import Catalog from 'catalog-filtration';
import Goods from './goods.json';

let options = {
    goods: Goods,
    filterFields:['FIELD_NAME_1', 'FIELD_NAME_2'],
    priceField: 'PRICE'
}

let catalog = new Catalog(options);
```

#### <a name="usage"></a>Usage
```javascript
 catalog.filter({'FILTER_FIELD': ['filterItem', 'filterItem']})
    .then(getStores)

 function getStores(stores){
    console.log(stores.productList); // List of filtered products
    console.log(stores.availableFilters); // List of available filters for filtered products
 }
```

## <a name="how-it-works"></a>How it works
[See wiki](https://github.com/mordenius/catalog-filtration/wiki)

### <a name="constructor-options"></a>Constructor options
goods – Object/Array - An array of data for filtering.

Example 1:
```javascript
{ 
    23523535: {
        category: 'female',
        type: 'shoes',
        color: 'black',
        price: 1924,00
    },
    45798436: {
        category: 'female',
        type: 'shoes',
        color: 'white',
        price: 424,50
    }
}
```
Example 2:
```javascript
[{
    key: 23523535,
    category: 'female',
    type: 'shoes',
    color: 'black',
    price: 1924,00
},
{
    key: 45798436,
    category: 'female',
    type: 'shoes',
    color: 'white',
    price: 424,50
}]
```
filterFields – Array - List of fields involved in filtering.

priceField – String - Price field name.

## <a name="interface"></a>Interface
```javascript
 import Catalog from 'catalog-filtration';

 let options = { }
 let catalog = new Catalog(options);
```

### <a name="filtering"></a>Filtering
To filter, use the:
```javascript
filter(Object)
```

As an argument to the method, an array is used, from the selected filters.
```javascript
catalog.filter({'FILTER_FIELD': ['filterItem', 'filterItem']})
```
Or
```javascript
let selected = {
    'FILTER_FIELD': 
        ['filterItem', 'filterItem']
    }
catalog.filter(selected)
```
In response to a query, filtering results can be obtained
```javascript
catalog.filter({'FILTER_FIELD': ['filterItem', 'filterItem']})
    .then((stores) => ){
        console.log(stores.productList); // List of filtered products
        console.log(stores.availableFilters); // List of available filters for filtered products
    })
```

Or
```javascript
 catalog.filter({'FILTER_FIELD': ['filterItem', 'filterItem']})
    .then(getStores)

 function getStores(stores){
    console.log(stores.productList); // List of filtered products
    console.log(stores.availableFilters); // List of available filters for filtered products
 }
```

#### Limitation
Filters, not specified when
[Import](#import),
Will be ignored.

### <a name="reset-filters"></a>Reset filters
To reset the filters, use the non-argument filter method call.
```javascript
filter()
```

