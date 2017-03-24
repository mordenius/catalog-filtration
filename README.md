# Catalog-filtration
## Оглавление
1. [Применение](#description)
2. [Установка](#installation)
3. [Подключение](#import)
4. [Использование](#usage)
5. [Принцип работы](#how-it-work)
6. [Опции запуска](#constructor-options)
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
 catalog.filter({'FILTER_FIELD': ['filterItem', 'filterItem']})
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


## <a name="interface"></a>Интерфейс
```javascript
 import Catalog from 'catalog-filtration';

 let options = { }
 let catalog = new Catalog(options);
```

### <a name="filtering"></a>Фильтрация
Для фильтрации используется метод
```javascript
filter(Object)
```

В качестве аргумента метода используется массив, из выбранных фильтров.
```javascript
catalog.filter({'FILTER_FIELD': ['filterItem', 'filterItem']})
```
Или
```javascript
let selected = {
    'FILTER_FIELD': 
        ['filterItem', 'filterItem']
    }
catalog.filter(selected)
```
В ответ на запрос могут быть получены результаты фильтрации
```javascript
catalog.filter({'FILTER_FIELD': ['filterItem', 'filterItem']})
    .then((stores) => ){
        console.log(stores.productList); // List of filtered products
        console.log(stores.availableFilters); // List of available filters for filtered products
    })
```

Или
```javascript
 catalog.filter({'FILTER_FIELD': ['filterItem', 'filterItem']})
    .then(getStores)

 function getStores(stores){
    console.log(stores.productList); // List of filtered products
    console.log(stores.availableFilters); // List of available filters for filtered products
 }
```

#### Ограничение
Фильтры, не указанные при
[подключении](#constructor-options),
будут проигнорированы.

### <a name="reset-filters"></a>Сброс фильтров
Для сброса фильтров используется вызов метода фильтрации без аргументов.
```javascript
filter()
```

