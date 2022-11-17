import React, { useCallback, useState, useContext } from 'react';
import { CategoryAndSearchContext } from '../context/Context';
import { useHttp } from '../hooks/useHttp';
import { useQuery } from '@tanstack/react-query';
import { Grid, Container, Typography } from '@mui/material';
import { ThumbnailCard } from '../components/ThumbnailCard';
import { Loader } from '../components/Loader';
import Pagination from '@mui/material/Pagination';
import { paginatedProducts } from '../utils/paginationUtils';
import { getFilteredProducts, searchCleaner } from '../utils/filteringProductsUtils';
import { AmountOfProductsDisplayer } from '../components/AmountOfProductsDisplayer';

export const MainPage = () => {
	const categoryAndSearchContext = useContext(CategoryAndSearchContext);
	const category = categoryAndSearchContext.category;
	const search = searchCleaner(categoryAndSearchContext.search);
	const amountOfItemsDisplayedOnPage = 15;
	let filteredProducts = [];
	let displayedProducts = [];
	const { request } = useHttp();
	const [page, setPage] = useState(1);

	const getProduct = useCallback(async () => {
		try {
			return await request(`/api/`, 'GET', null);
		} catch(e) {
			console.log(e.message);
		}
	}, [request]);

	const { status, data, error, isFetching } = useQuery({ queryKey: ['products'], queryFn: getProduct });

	if (status === 'success') {
		filteredProducts = getFilteredProducts(category, search, data);
		displayedProducts = paginatedProducts(amountOfItemsDisplayedOnPage, filteredProducts);
	}

	const handlePageChange = (event, value) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
		setPage(value);
	}

	if (status === 'loading') {
		return <Loader />
	}

	return (
		<Container>
			<Typography gutterBottom textAlign="center" variant="h6">
				{category === 'all' ? 'Весь каталог' : category}
			</Typography>
			<AmountOfProductsDisplayer filteredProducts={filteredProducts} />
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