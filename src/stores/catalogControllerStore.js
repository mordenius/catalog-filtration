import {StoreClass} from 'redux-store-controller';

class CatalogControllerStore extends StoreClass {
	constructor(){
		super({preset: null})
	}

	update(state, action){
		switch(action.type){
			case 'PRESET': state.preset = action.preset; break;
			default: return state;
		}

		return state;
	}

	preset(preset){
		this._store.dispatch({type: 'PRESET', preset: preset});
	}
}

export default CatalogControllerStore;