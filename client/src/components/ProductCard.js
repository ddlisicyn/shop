import React, { useContext } from 'react';
import { Container, Button, Typography } from '@mui/material';
import { Context } from '../context/Context';

export const ProductCard = ({ product }) => {
	const { id, name, description, img, price, discountPrice } = product;
	const cart = useContext(Context);

	const handleClickAddProduct = () => {
		cart.addProduct(id);
	}

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', background: '#fff', minHeight: '90vh', borderRadius: '10px' }} >
			<img src={img} alt={name} width="240px"></img>
			<Typography gutterBottom variant="h6" component="div" sx={{ wordWrap: 'break-word', lineHieght: '1.25', marginTop: '25px' }} >
				{name}
			</Typography>
			<Typography variant="button" mt="25px" >
				{discountPrice},00 ₽
			</Typography>
			<Typography variant="overline" sx={{ textDecoration: "line-through", color: "#e06666", }}>
				{price},00 ₽
			</Typography>
			<Button size="medium" variant="contained" mt="25px" onClick={handleClickAddProduct}>Добавить в корзину</Button>
			<Typography variant="h6" component="div" mt="50px" sx={{ wordWrap: 'break-word' }} >
				Описание
			</Typography>
			<Typography variant="body1" component="div" mb="20px" sx={{ wordWrap: 'break-word', textAlign: 'justify' }} >
				{description}
			</Typography>
		</Container>
	)
};