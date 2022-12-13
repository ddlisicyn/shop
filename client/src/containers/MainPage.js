import React, { useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';
import { useQuery } from '@tanstack/react-query';
import { Grid, Container, Typography } from '@mui/material';
import { ThumbnailCard } from '../components/ThumbnailCard';
import { Loader } from '../components/Loader';
import Pagination from '@mui/material/Pagination';
import { paginatedProducts } from '../utils/paginationUtils';
import { getFilteredProducts, categoryNameConverter } from '../utils/filteringProductsUtils';
import { AmountOfProductsDisplayer } from '../components/AmountOfProductsDisplayer';
import { NotFoundPage } from '../components/NotFoundPage';

const amountOfItemsDisplayedOnPage = 15;

export const MainPage = () => {
	const navigate = useNavigate();
	let { category = 'all', search, page = 1 } = useParams();
	const { request } = useHttp();

	const getProduct = useCallback(async () => {
		try {
			const data = await request(`/api/`, 'GET', null);
			return data.map(product => {
				if (product.category !== 'Здоровье') {
					product.price = Math.round(product.price * 1.07);
					product.discountPrice = Math.round(product.discountPrice * 1.07);
				}

				return product
			})
		} catch(e) {
			console.log(e.message);
		}
	}, [request]);

	const { data, isError, isLoading } = useQuery({ queryKey: ['products'], queryFn: getProduct });

	if (isError) {
		return null
	}

	if (isLoading) {
		return <Loader />
	}

	//TODO: поправить на useSearchParams()
	if (category.includes('search=')) {
		search = category.replace('search=', '');
		category = null;
	}

	const filteredProducts = getFilteredProducts(category, search, data);
	const displayedProducts = paginatedProducts(amountOfItemsDisplayedOnPage, filteredProducts);

	if ((category && !categoryNameConverter(category)) || page > displayedProducts.length) {
		return <NotFoundPage />
	}

	const handlePageChange = (event, value) => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});

		search ? 
		navigate(`/search=${search}&page=${value}`):
		navigate(`/${category}&page=${value}`);
	}

	return (
		<Container>
			<Typography gutterBottom textAlign="center" variant="h6">
				{categoryNameConverter(category)}
			</Typography>
			{
				search && 
				<Typography gutterBottom variant="subtitle2">
					Товары по запросу <i>«{search}»</i>
				</Typography>
			}
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
				page={parseInt(page)} 
				color="primary" 
				onChange={handlePageChange}
			/>
		</Container>
	)
};