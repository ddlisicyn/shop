import React from 'react';
import { Container, Box } from '@mui/material';

export const ProductCard = ({ product }) => {
	const { name, description, img, price, discountPrice } = product;

	return (
		<Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
			<Box>
				<img src={img} alt={name} width="240px" ></img>
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<h1>{name}</h1>
				<span>{description}</span>
				<h4>{price}</h4>
				<h5>{discountPrice}</h5>
			</Box>
		</Container>
	)
};