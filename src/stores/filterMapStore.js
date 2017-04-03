import {StoreClass} from 'redux-store-controller';

class FilterMapStore extends StoreClass {
	constructor(){
		super({map: null, presets: null})
	}

	update(state, action){
		switch(action.type){
			case 'MAP': state.map = action.map; break;
			case 'PRESETS': state.presets = action.presets; break;
			default: return state;
		}

		return state;
	}

	setFilterMap(map){
		this._store.dispatch({type: 'MAP', map: map})
	}

	setFilterPresets(presets){
		this._store.dispatch({type: 'PRESETS', presets: presets})
	}
}

export default FilterMapStore;