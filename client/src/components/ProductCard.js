import React, { useContext, useState } from 'react';
import { Container, Button, Typography, Fade, Alert } from '@mui/material';
import { Context } from '../context/Context';

export const ProductCard = ({ product }) => {
	const [alert, setAlert] = useState(false);
	const { id, name, description, img, capacity, price, discountPrice } = product;
	const cart = useContext(Context);

	const handleClickAddProduct = () => {
		cart.addProduct(id, discountPrice);
		handleOpen();
		setTimeout(handleClose, 1000);
	}

	const handleOpen = () => setAlert(true);

	const handleClose = () => setAlert(false);

	return (
		<Container>
			<Fade in={alert}>
				<Alert 
					severity="info" 
					sx={{ position: 'fixed', top: '8vh', right: '1%', zIndex: '99999', minWidth: '200px' }}
				>
					Товар добавлен в корзину
				</Alert>
			</Fade>
			<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', background: '#fff', minHeight: '90vh', borderRadius: '10px' }} >
				<img src={img} alt={name} width="280px"></img>
				<Typography gutterBottom variant="h6" component="div" sx={{ wordWrap: 'break-word', lineHieght: '1.25', marginTop: '25px' }} >
					{name}
				</Typography>
				<Typography variant="button" mt="25px" >
					{discountPrice},00 ₽
				</Typography>
				<Typography variant="overline" sx={{ textDecoration: "line-through", color: "#e06666", }}>
					{price},00 ₽
				</Typography>
				<Typography >
					Вес/объем: {capacity}
				</Typography>
				<Button size="medium" variant="contained" sx={{ marginTop: '35px' }} onClick={handleClickAddProduct}>Добавить в корзину</Button>
				<Typography variant="h6" component="div" mt="50px" sx={{ wordWrap: 'break-word' }} >
					Описание
				</Typography>
				{
					description.length ? 
					<Typography variant="body1" component="div" mb="20px" sx={{ wordWrap: 'break-word', textAlign: 'justify' }} >
						{description}
					</Typography> :
					<>У продукта пока нет описания</>
				}
			</Container>
		</Container>
	)
};