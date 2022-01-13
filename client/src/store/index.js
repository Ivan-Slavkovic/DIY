import { createStore } from 'redux';
const initialState = {
	email    : '',
	password : ''
};
const storeReducer = (state = initialState, action) => {
	if (action.type === 'login') {
		return {
			email    : state.email,
			password : state.password
		};
	}
	if (action.type === 'register') {
		return {
			counter : state.counter - 1
		};
	}
	return state;
};

const store = createStore(storeReducer);
// store.dispatch({ type: 'increment' });
export default store;
