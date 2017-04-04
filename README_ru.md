# Catalog-filtration (Ру/[En](https://github.com/mordenius/catalog-filtration/blob/master/README.md))
[![npm version](https://img.shields.io/npm/v/catalog-filtration.svg)](https://www.npmjs.com/package/catalog-filtration)
[![node](https://img.shields.io/node/v/gh-badges.svg)](https://github.com/mordenius/catalog-filtration)
[![build status](https://travis-ci.org/mordenius/catalog-filtration.svg?branch=master)](https://travis-ci.org/mordenius/catalog-filtration)
[![dependencies Status](https://david-dm.org/mordenius/catalog-filtration/status.svg)](https://david-dm.org/mordenius/catalog-filtration)
[![devDependencies Status](https://david-dm.org/mordenius/catalog-filtration/dev-status.svg)](https://david-dm.org/javiercf/catalog-filtration?type=dev)
---
## Оглавление
1. [Применение](#description)
2. [Установка](#installation)
3. [Подключение](#import)
4. [Использование](#usage)
5. [Принцип работы](#how-it-work)
6. [Опции запуска](#constructor-options)
7. [Предустановленные наборы фильтров](#presets)
7. [Интерфейс](#interface)
    1. [Фильтрация](#filtering)
    2. [Сброс фильтров](#reset-filters)

---

#### <a name="description"></a>Применение
Осуществляет фильтрацию объектов ассоциативного массива данных, посредством предоставления интерфейса управления фильтрацией.

#### <a name="installation"></a>Установка
```
npm i catalog-filtration
```

#### <a name="import"></a>Подключение
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

#### <a name="usage"></a>Использование
```javascript
 catalog.filter('append', {'FILTER_FIELD': ['filterItem', 'filterItem']})
    .then(getStores)

 function getStores(stores){
    console.log(stores.productList); // List of filtered products
    console.log(stores.availableFilters); // List of available filters for filtered products
 }
```

## <a name="how-it-works"></a>Принцип работы


### <a name="constructor-options"></a>Опции запуска
goods – Object/Array - Массив данных для фильтрации. 
Пример 1:
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
Пример 2:
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
filterFields – Array - Список полей, участвующих в фильтрации. 

priceField – String - Название поля цены.

presetRules - Object - [Смотри следующий](#presets) раздел.

## <a name="presets"></a>Предустановленные наборы фильтров
Для более быстрой фильтрации, вы можете использовать предустановленные наборы фильтров.
Добавьте поле presetRules в опции запуска модуля:

```javascript
    presetsRules: {
        'female': {"GENDER": ["Female"], "ACCESSORY": ["N"]},
        'male': {"GENDER": ["Male"], "ACCESSORY": ["N"]} 
    }
```

Теперь вы сможете вызывать предустановленные наборы фильтров в любое время:


```javascript
filter('preset', 'female')
```

## <a name="interface"></a>Интерфейс
```javascript
 import Catalog from 'catalog-filtration';

 let options = { }
 let catalog = new Catalog(options);
```

### <a name="filtering"></a>Фильтрация
Для фильтрации используется метод
```javascript
filter(String: type, Object: selectedFiltes)
```

- type - String - способ фильтрации:
    - ```null``` or ```'all'``` - простая фильтрация фильтров;
    - ```'append'``` - добавление новых фильтров к уже примененным;
    - ```'detach'``` - отмена фильтров из уже примененным;
    - ```'preset'``` - для выбора предустановленного набора фильтров; 
    - ```'reset'``` - сброс. *предустановленный набор останется активным*;
- selectedFilters - Object - Список фильтров по категориям.


```javascript
catalog.filter(null, {'FILTER_FIELD': ['filterItem', 'filterItem']})
```

Или
```javascript
let selected = {
    'FILTER_FIELD': 
        ['filterItem', 'filterItem']
    }
catalog.filter('append', selected)
```
В ответ на запрос могут быть получены результаты фильтрации
```javascript
catalog.filter('detach', {'FILTER_FIELD': ['filterItem', 'filterItem']})
    .then((stores) => ){
        console.log(stores.productList); // List of filtered products
        console.log(stores.availableFilters); // List of available filters for filtered products
    })
```

Или
```javascript
 catalog.filter('detach', {'FILTER_FIELD': ['filterItem', 'filterItem']})
    .then(getStores)

 function getStores(stores){
    console.log(stores.productList); // List of filtered products
    console.log(stores.availableFilters); // List of available filters for filtered products
 }
```

#### Ограничение
Фильтры, не указанные при
[подключении](#import),
будут проигнорированы.

### <a name="reset-filters"></a>Сброс фильтров
Для сброса фильтров до выбранного предустановленного набора:
```javascript
filter('reset')
```
для полного сброса:
```javascript
reset()
```
