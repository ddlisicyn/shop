import { useState, useCallback, useEffect } from 'react';

const storageName = 'userCart';

export const useCart = () => {
	const [products, setProducts] = useState(null);
	const [totalPrice, setTotalPrice] = useState(0);

	const addProduct = useCallback((id, price) => {
		let data = JSON.parse(localStorage.getItem(storageName));

		if (data === null) {
			data = {};
		}

		if (id in data) {
			data[id].amount++;
		} else {
			data[id] = {
				price: price,
				amount: 1
			}
		}

		setProducts(data);

		localStorage.setItem(storageName, JSON.stringify(data));
	}, []);

	const removeProduct = useCallback((id) => {
		const data = JSON.parse(localStorage.getItem(storageName));

		data[id].amount--;

		setProducts(data);

		localStorage.setItem(storageName, JSON.stringify(data));
	}, []);

	const deleteProduct = useCallback((id) => {
		const data = JSON.parse(localStorage.getItem(storageName));
		
		delete data[id];

		setProducts(data);

		localStorage.setItem(storageName, JSON.stringify(data));
	}, []);

	const deleteAll = useCallback(() => {
		localStorage.removeItem(storageName);
	}, []);

	const setAmount = useCallback((id, amount) => {
		const data = JSON.parse(localStorage.getItem(storageName));
		
		data[id].amount = amount;

		setProducts(data);

		localStorage.setItem(storageName, JSON.stringify(data));
	}, []);

	const getTotalPrice = useCallback(() => {
		const data = JSON.parse(localStorage.getItem(storageName));
		let totalPrice = 0;

		for (let key in data) {
			totalPrice += data[key].price * data[key].amount;
		}

		setTotalPrice(totalPrice);
	}, []);

	useEffect(() => {
		getTotalPrice();
	}, [products, getTotalPrice]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (!!data) {
			setProducts(data);
		}
	}, []);


	return { addProduct, removeProduct, deleteProduct, deleteAll, setAmount, products, totalPrice }
};