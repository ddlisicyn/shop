import { createContext } from 'react';

function noop() {}

export const UserCartContext = createContext({
	products: {},
	addProduct: noop,
	removeProduct: noop,
	deleteProduct: noop,
	deleteAll: noop
})

export const Context = createContext({
	token: null,
	userId: null,
	login: noop,
	logout: noop,
	isAuthenticated: false
});