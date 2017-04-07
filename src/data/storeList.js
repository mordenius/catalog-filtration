import {StoreClass} from 'redux-store-controller';

import FilterMapStore from '~/stores/filterMapStore';
import CatalogControllerStore from '~/stores/catalogControllerStore';

let StoreList = [
	{
		name: 'catalog',
		store: CatalogControllerStore
	},
	{
		name: 'availableFilters',
		store: StoreClass
	},
	{
		name: 'productList',
		store: StoreClass
	},
	{
		name: 'filterMap',
		store: FilterMapStore
	},
	{
		name: 'selectedFilters',
		store: StoreClass
	}
]

export default StoreList;