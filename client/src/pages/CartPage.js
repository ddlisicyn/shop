import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import { CartProduct } from '../components/CartProduct';
import { Grid, Container, Box, Typography } from '@mui/material';
import { OrderForm } from '../components/OrderForm';

export const CartPage = () => {
	const [cartProducts, setCartProducts] = useState({});
	const [totalPrice, setTotalPrice] = useState(0);
	const cart = useContext(Context);

	useEffect(() => {
		setCartProducts(cart.products);
		setTotalPrice(cart.totalPrice);
	}, [cart]);

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
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
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: '10px'  }}>
				<Typography variant="h6">
					Итог:
				</Typography>
				<Typography variant="h6">
					{totalPrice.toLocaleString('ru-RU')},00 ₽
				</Typography>
			</Box>
			<OrderForm />
		</Container>
	)
};