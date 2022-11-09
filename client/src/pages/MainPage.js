import React, { useCallback, useState, useEffect, useContext } from 'react';
import { Context } from '../context/Context';
import { useHttp } from '../hooks/useHttp';
import { Grid, Container, Typography } from '@mui/material';
import { ThumbnailCard } from '../components/ThumbnailCard';
import { Loader } from '../components/Loader';
import Pagination from '@mui/material/Pagination';
import { paginatedProducts } from '../utils/paginationUtils';

export const MainPage = () => {
	const context = useContext(Context);
	const { loading, request } = useHttp();
	const [allProducts, setAllProducts] = useState([]);
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [displayedProducts, setDisplayedProducts] = useState([[]]);
	const [page, setPage] = useState(1);
	const amountOfItemsDisplayedOnPage = 15;

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

		setPage(1);

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

	useEffect(() => {
		setDisplayedProducts(paginatedProducts(amountOfItemsDisplayedOnPage, filteredProducts));
	}, [filteredProducts])

	const handlePageChange = (event, value) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		setPage(value);
	}

	if (loading) {
		return <Loader />
	}

	return (
		<Container>
			<Typography gutterBottom variant="subtitle2">
				Всего {filteredProducts.length === 1 ? <>найден {filteredProducts.length} товар</> : 
				<>
					{
						filteredProducts.length <= 4 && filteredProducts.length > 0 ? 
						<>найдено {filteredProducts.length} товара</> : 
						<>найдено {filteredProducts.length} товаров</>
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
					displayedProducts[page - 1]?.length ?  
					displayedProducts[page - 1].map((product) => (
						<Grid item xs={12} sm={4} md={2} key={product.id}>
							<ThumbnailCard product={product} />
						</Grid>
					)) :
					<></>
				}
			</Grid>
			<Pagination
				className="main-pagination"
				count={displayedProducts.length}
				boundaryCount={0} 
				page={page} 
				color="primary" 
				onChange={handlePageChange}
			/>
		</Container>
	)
};