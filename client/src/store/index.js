import { createStore } from 'redux';

const storeReducer = (state = { counter: 0 }, action) => {
	if (action.type === 'increment') {
		return {
			counter : state.counter + 1
		};
	}

	if (action.type === 'decrement') {
		return {
			counter : state.counter - 1
		};
	}
	return state;
};

const store = createStore(storeReducer);

export default store;
