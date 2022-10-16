import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { useHttp } from '../hooks/http.hook';
import { Grid, Container, Typography } from '@mui/material';
import { ThumbnailCard } from '../components/ThumbnailCard';
import { Loader } from '../components/Loader';

export const MainPage = () => {
	const context = useContext(Context);
	const [allProducts, setAllProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const { loading, request } = useHttp();

	const getProduct = useCallback(async () => {
		try {
			const fetched =  await request(`/api/`, 'GET', null);
			setAllProducts(fetched);
			setFilteredProducts(fetched);
		} catch(e) {}
	}, [request]);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	useEffect(() => {
		const category = context.category;
		const search = context.search.toLowerCase().replace(/[^a-zа-я0-9\s]+/g, '');

		if (search === '') {
			if (category === 'all') {
				setFilteredProducts(allProducts);
			} else {
				setFilteredProducts(allProducts.filter(product => product.category === category));
			}
		} else {
			setFilteredProducts(allProducts.filter(product => {
				const name = product.name.toLowerCase().replace(/[^a-zа-я0-9\s]+/g, '');
	
				if (!name.includes(search)) {
					return
				}
	
				return product
			}));
		}

	}, [context.category, context.search, allProducts]);

	if (loading) {
		return <Loader />
	}

	return (
		<Container>
			<Typography gutterBottom variant="subtitle2">
				Всего {filteredProducts.length === 1 ? <>найден {filteredProducts.length} товар</> : 
				<>
					{
						filteredProducts.length <= 4 && filteredProducts.length > 0 ? <>найдено {filteredProducts.length} товара</> : <>найдено {filteredProducts.length} товаров</>
					}
				</>
				}
			</Typography>
			<Grid
				container
				spacing={{ xs: 2, sm: 3, md: 4 }}
				columns={{ xs: 12, sm: 8, md: 6 }}
			>
				{
					filteredProducts.length ?  
					filteredProducts.map((product) => (
						<Grid item xs={12} sm={4} md={2} key={product.id}>
							<ThumbnailCard product={product} />
						</Grid>
					)) :
					<></>
				}
			</Grid>
		</Container>
	)
};