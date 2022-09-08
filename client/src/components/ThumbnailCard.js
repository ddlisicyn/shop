import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Container, Box, Typography, CardActions, Button, Fade, Alert } from '@mui/material';
import { Context } from '../context/Context';

export const ThumbnailCard = ({ product }) => {
	const [alert, setAlert] = useState(false);
	const cart = useContext(Context);
	const navigate = useNavigate();
	const { id, name, img, price, discountPrice } = product;

	const handleClickDetail = () => {
		navigate(`/detail/${id}`);
	}

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
			<Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
				<CardContent sx={{ width: '100%' }} onClick={handleClickDetail}>
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
								name.length > 45 ? name.substring(0, 42).trim() + '...' : 
								name.length < 45 ? name.padEnd(45, ' ') : name
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
					<Button size="medium" variant="contained" sx={{ marginBottom: '20px' }} onClick={handleClickAddProduct}>Добавить в корзину</Button>
				</CardActions>
			</Card>
		</Container>
	)
}