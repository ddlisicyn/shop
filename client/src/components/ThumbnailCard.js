import React from 'react';
import { Card, CardContent } from '@mui/material';

export const ThumbnailCard = ({ product }) => {
	const { name, description, img, price, discountPrice } = product;

	return (
		<Card sx={{ display: 'flex', justifyContent: 'center' }} >
			<CardContent>
				<h1>{name}</h1>
				<img src={img} alt={name} width="240px"></img>
				<span>{description}</span>
				<p>price {price}</p>
				<p>discount price {discountPrice}</p>
			</CardContent>
		</Card>
	)
}