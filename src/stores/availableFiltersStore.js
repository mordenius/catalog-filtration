import {StoreClass} from 'redux-store-controller';

class AvailableFiltersStore extends StoreClass {
	constructor(){
		super({})
	}

	update(state, action){
		switch(action.type){
			case 'UPDATE': state = action.filters; break;
			default: return state;
		}

		return state;
	}

	setFilterList(filters){
		this._store.dispatch({type: 'UPDATE', filters: filters})
	}
}

export default AvailableFiltersStore;