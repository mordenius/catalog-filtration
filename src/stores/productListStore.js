import {StoreClass} from 'redux-store-controller';

class ProductListStore extends StoreClass {
	constructor(){
		super([])
	}

	update(state, action){
		switch(action.type){
			case 'UPDATE': state = action.products; break;
			default: return state;
		}

		return state;
	}

	setProductList(products){
		this._store.dispatch({type: 'UPDATE', products: products})
	}
}

export default ProductListStore;