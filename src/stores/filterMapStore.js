import {StoreClass} from 'redux-store-controller';

class FilterMapStore extends StoreClass {
	constructor(){
		super({})
	}

	update(state, action){
		switch(action.type){
			case 'UPDATE': state = action.map; break;
			default: return state;
		}

		return state;
	}

	setFilterMap(map){
		this._store.dispatch({type: 'UPDATE', map: map})
	}
}

export default FilterMapStore;