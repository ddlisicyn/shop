import { useState, useCallback, useEffect } from 'react';

const storageName = 'userCart';

export const useCart = () => {
	const [products, setProducts] = useState(null);

	const addProduct = useCallback((id) => {
		let data = JSON.parse(localStorage.getItem(storageName));

		console.log(data)

		if (data === null) {
			data = {};
		}

		if (id in data) {
			data[id]++;
		} else {
			data[id] = 1;
		}

		setProducts(data);

		localStorage.setItem(storageName, JSON.stringify(data));
	}, []);

	const removeProduct = useCallback((id) => {
		const data = JSON.parse(localStorage.getItem(storageName));

		data[id]--;

		console.log(data)

		setProducts(data);

		localStorage.setItem(storageName, JSON.stringify(data));
	}, []);

	const deleteProduct = useCallback((id) => {
		delete products[id];

		setProducts(products);

		localStorage.setItem(storageName, JSON.stringify(products));
	}, [products]);

	const deleteAll = useCallback(() => {
		localStorage.removeItem(storageName);
	}, []);

	const getTotalPrice = useCallback(() => {

	});

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem(storageName));

		if (!!data) {
			setProducts(data);
		}
	}, []);


	return { addProduct, removeProduct, deleteProduct, deleteAll, products }
};