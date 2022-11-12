import React, { useCallback, useState, useContext } from 'react';
import { Context } from '../context/Context';
import { useHttp } from '../hooks/useHttp';
import { useQuery } from '@tanstack/react-query';
import { Grid, Container, Typography } from '@mui/material';
import { ThumbnailCard } from '../components/ThumbnailCard';
import { Loader } from '../components/Loader';
import Pagination from '@mui/material/Pagination';
import { paginatedProducts } from '../utils/paginationUtils';

export const MainPage = () => {
	const context = useContext(Context);
	const { request } = useHttp();
	const [page, setPage] = useState(1);
	const amountOfItemsDisplayedOnPage = 15;
	let filteredProducts = [];
	let displayedProducts = [];

	const getProduct = useCallback(async () => {
		try {
			const fetched = await request(`/api/`, 'GET', null);
			return fetched;
		} catch(e) {}
	}, [request]);

	const { status, data, error, isFetching } = useQuery({ queryKey: ['products'], queryFn: getProduct });

	if (status === 'success') {
		const category = context.category;
		const search = context.search.toLowerCase().replace(/[^a-zа-я0-9\s]+/g, '');
	
		if (search === '') {
			if (category === 'all') {
				filteredProducts = data;
			} else {
				filteredProducts = data.filter(product => product.category === category);
			}
		} else {
			filteredProducts = data.filter(product => {
				const name = product.name.toLowerCase().replace(/[^a-zа-я0-9\s]+/g, '');
	
				if (!name.includes(search)) {
					return
				}
	
				return product
			});
		}
	
		displayedProducts = paginatedProducts(amountOfItemsDisplayedOnPage, filteredProducts);
	}

	const handlePageChange = (event, value) => {
		setPage(value);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}

	if (status === 'loading') {
		return <Loader />
	}

	return (
		<Container>
			<Typography gutterBottom variant="subtitle2">
				Всего {filteredProducts?.length === 1 ? <>найден {filteredProducts?.length} товар</> : 
				<>
					{
						filteredProducts?.length <= 4 && filteredProducts?.length > 0 ? 
						<>найдено {filteredProducts?.length} товара</> : 
						<>найдено {filteredProducts?.length} товаров</>
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