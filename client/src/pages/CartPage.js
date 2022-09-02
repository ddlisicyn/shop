import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Context } from '../context/Context';
import { CartProduct } from '../components/CartProduct';
import { Grid, Container, Box, Typography } from '@mui/material';

export const CartPage = () => {
	const [cartProducts, setCartProducts] = useState({});
	const [totalPrice, setTotalPrice] = useState(0);
	const cart = useContext(Context);

	useEffect(() => {
		setCartProducts(cart.products);
		setTotalPrice(cart.totalPrice);
	}, [cart]);

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column' }} >
			<Grid
				container
				spacing={{ xs: 1, sm: 1, md: 1 }}
				columns={{ xs: 12, sm: 12, md: 12 }}
			>
				{
					cartProducts && Object.keys(cartProducts).length ?
					Object.entries(cartProducts).map(cartProduct => (
						<Grid item xs={12} sm={12} md={12} key={cartProduct[0]}>
							<CartProduct cartProduct={cartProduct} />
						</Grid>
					)) :
					'Корзина пуста'
				}
			</Grid>
			<Box>
				<Typography variant="h6" textAlign="right">
					Итог:
				</Typography>
				<Typography variant="h6" textAlign="right">
					{totalPrice}
				</Typography>
			</Box>
		</Container>
	)
};