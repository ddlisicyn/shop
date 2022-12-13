import React, { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard';

export const DetailPage = () => {
	const { request, loading } = useHttp();
	const [product, setProduct] = useState(null);
	const productId = useParams().id;

	const getProduct = useCallback(async () => {
		try {
			const fetched = await request(`/api/detail/${productId}`, 'GET', null);
			setProduct(fetched.map(product => {
				if (product.category !== 'Здоровье') {
					product.price = Math.round(product.price * 1.07);
					product.discountPrice = Math.round(product.discountPrice * 1.07);
				}

				return product
			}));
		} catch(e) {}
	}, [productId , request]);

	useEffect(() => {
		getProduct()
	}, [getProduct]);

	if (loading) {
		return <Loader />
	}

	return (
		<>
			{
				!loading && product && <ProductCard product={product[0]} />
			}
		</>
	)
}