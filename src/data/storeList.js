import {StoreClass} from 'redux-store-controller';

import FilterMapStore from '~/stores/filterMapStore';
import CatalogControllerStore from '~/stores/catalogControllerStore';

let StoreList = [
	{
		name: 'catalog',
		store: CatalogControllerStore
	},
	{
		name: 'availableFilters'
	},
	{
		name: 'productList'
	},
	{
		name: 'filterMap',
		store: FilterMapStore
	},
	{
		name: 'selectedFilters'
	}
]

export default StoreList;