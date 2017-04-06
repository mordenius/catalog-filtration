import AvailableFiltersStore from '~/stores/availableFiltersStore';
import ProductListStore from '~/stores/productListStore';
import FilterMapStore from '~/stores/filterMapStore';
import CatalogControllerStore from '~/stores/catalogControllerStore';
import SelectedFiltersStore from '~/stores/selectedFiltersStore';

let StoreList = [
	{
		name: 'catalog',
		store: CatalogControllerStore
	},
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
	},
	{
		name: 'selectedFilters',
		store: SelectedFiltersStore
	}
]

export default StoreList;