import AvailableFiltersStore from '~/stores/availableFiltersStore';
import ProductListStore from '~/stores/productListStore';
import FilterMapStore from '~/stores/FilterMapStore';

let StoreList = [
	{
		name: 'availableFilters',
		store: AvailableFiltersStore
	},
	{
		name: 'productList',
		store: ProductListStore
	},
	{
		name: 'filterMap',
		store: FilterMapStore
	}
]

export default StoreList;