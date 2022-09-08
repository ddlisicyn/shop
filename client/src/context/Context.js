import { createContext } from 'react';

function noop() {}

export const Context = createContext({
	token: null,
	userId: null,
	login: noop,
	logout: noop,
	isAuthenticated: false,
	products: null,
	addProduct: noop,
	removeProduct: noop,
	deleteProduct: noop,
	deleteAll: noop,
	totalPrice: 0,
	setAmount: noop,
	category: 'all',
	search: '',
	allProducts: [],
	handleCategory: noop,
	handleSearch: noop
});