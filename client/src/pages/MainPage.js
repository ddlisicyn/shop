import React, { useCallback, useState, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Grid } from '@mui/material';
import { ThumbnailCard } from '../components/ThumbnailCard';
import { Loader } from '../components/Loader';

export const MainPage = () => {
	const [products, setProducts] = useState([]);
	const { loading, request} = useHttp();

	const getProduct = useCallback(async () => {
		try {
			const fetched = await request(`/api/`, 'GET', null);
			setProducts(fetched);
		} catch(e) {}
	}, [request]);

	useEffect(() => {
		getProduct()
	}, [getProduct]);

	if (loading) {
		return <Loader />
	}

	return (
		<Grid
			container
			spacing={{ xs: 2, sm: 3, md: 4 }}
			columns={{ xs: 12, sm: 8, md: 6 }}
		>
			{
				products.length ?  
				products.map((product) => (
					<Grid item xs={12} sm={4} md={2} key={product.id}>
						<ThumbnailCard product={product} />
					</Grid>
				)) :
				'В магазине пока нет товаров'
			}
		</Grid>
	)
};