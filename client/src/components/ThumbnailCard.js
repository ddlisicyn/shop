import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Container, Box, Typography, CardActions, Button } from '@mui/material';

export const ThumbnailCard = ({ product }) => {
	const navigate = useNavigate();
	const { id, name, img, price, discountPrice } = product;

	const handleClick = () => {
		navigate(`/detail/${id}`);
	}

	return (
		<Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
			<CardContent sx={{ width: '100%' }} onClick={handleClick}>
				<Box>
					<CardMedia
						component="img"
						width="100%"
						image={img}
						alt={name}
					/>
				</Box>
				<Container sx={{ textAlign: 'center', padding: '0 !important' }} >
					<Typography gutterBottom variant="subtitle1" component="div" sx={{ wordWrap: 'break-word', cursor: 'pointer' }} >
						{
							name.length > 50 ? name.substring(0, 46).trim() + '...' : name
						}
					</Typography>
					<Typography variant="subtitle2">
						{discountPrice},00 ₽
					</Typography>
					<Typography variant="caption" sx={{ textDecoration: "line-through", color: "#e06666" }}>
						{price},00 ₽
					</Typography>
				</Container>
			</CardContent>
			<CardActions>
				<Button size="medium" variant="contained">Добавить в корзину</Button>
      		</CardActions>
		</Card>
	)
}