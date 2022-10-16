import { useState, useCallback, useEffect } from 'react';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils/localStorageUtils';

const storageName = 'userCart';

export const useCart = () => {
	const [products, setProducts] = useState(null);
	const [totalPrice, setTotalPrice] = useState(0);

	const addProduct = useCallback((id, price, discountPrice, name, img, colorName, colorHex) => {
		let data = getDataFromLocalStorage(storageName);

		if (data === null || data === undefined) {
			data = {};
		}

		if (id in data) {
			data[id].amount++;
		} else {
			data[id] = {
				price,
				discountPrice,
				amount: 1,
				name,
				img,
				colorName,
				colorHex
			}
		}

		setProducts(data);

		setDataToLocalStorage(storageName, data);
	}, []);

	const removeProduct = useCallback((id) => {
		const data = getDataFromLocalStorage(storageName);

		data[id].amount--;

		setProducts(data);

		setDataToLocalStorage(storageName, data);
	}, []);

	const deleteProduct = useCallback((id) => {
		const data = getDataFromLocalStorage(storageName);
		
		delete data[id];

		setProducts(data);

		setDataToLocalStorage(storageName, data);
	}, []);

	const deleteAll = useCallback(() => {
		localStorage.removeItem(storageName);
		setProducts(null);
	}, []);

	const setAmount = useCallback((id, amount) => {
		const data = getDataFromLocalStorage(storageName);
		
		data[id].amount = amount;

		setProducts(data);

		setDataToLocalStorage(storageName, data);
	}, []);

	const getTotalPrice = useCallback(() => {
		const data = getDataFromLocalStorage(storageName);
		let totalPrice = 0;

		for (let key in data) {
			totalPrice += data[key].discountPrice * data[key].amount;
		}

		setTotalPrice(totalPrice);
	}, []);

	useEffect(() => {
		getTotalPrice();
	}, [products, getTotalPrice]);

	useEffect(() => {
		const data = getDataFromLocalStorage(storageName);

		if (!!data) {
			setProducts(data);
		}
	}, []);

	return { addProduct, removeProduct, deleteProduct, deleteAll, setAmount, products, totalPrice }
};