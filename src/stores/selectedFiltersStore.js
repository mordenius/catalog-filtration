import {StoreClass} from 'redux-store-controller';

class SelectedFiltersStore extends StoreClass {
	constructor(){
		super({})
	}

	update(state, action){
		switch(action.type){
			case 'FILTERS': state = action.selectedFilters; break;
			default: return state;
		}

		return state;
	}

	setFilters(selectedFilters){
		this._store.dispatch({type: 'FILTERS', selectedFilters: selectedFilters});
	}
}

export default SelectedFiltersStore;