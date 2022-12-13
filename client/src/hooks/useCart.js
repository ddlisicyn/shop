import { useState, useEffect } from 'react';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils/localStorageUtils';

const storageName = 'userCart';

export const useCart = () => {
	const [products, setProducts] = useState({});

	useEffect(() => {
		setProducts(getDataFromLocalStorage(storageName));
	}, []);

	const addProduct = (productInfo) => {
		if (productInfo.id in products) {
			products[productInfo.id].amount++;
		} else {
			products[productInfo.id] = productInfo;
			products[productInfo.id].amount = 1;
		}

		setProducts({...products});
		setDataToLocalStorage(storageName, products);
	};

	const removeProduct = (productInfo) => {
		products[productInfo.id].amount--;

		setProducts({...products});
		setDataToLocalStorage(storageName, products);
	};

	const deleteProduct = (productInfo) => {
		delete products[productInfo.id];

		setProducts({...products});
		setDataToLocalStorage(storageName, products);
	};

	const deleteAll = () => {
		setProducts({});
		setDataToLocalStorage(storageName, {});
	};

	return { addProduct, removeProduct, deleteProduct, deleteAll, products }
};