import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardMedia, Container, Box, 
	Typography, CardActions, Button, Fade, Alert, FormControl, 
	InputLabel, Select, MenuItem, Link } from '@mui/material';
import { UserCartContext } from '../context/Context';

//TODO: сделать что-то на подобие lazy img

export const ThumbnailCard = ({ product }) => {
	const userCartContext = useContext(UserCartContext);
	const navigate = useNavigate();
	let { id, name, img, price, discountPrice, colors } = product;
	const [alert, setAlert] = useState(false);
	const [image, setImage] = useState(img);
	const [colorId, setColorId] = useState(Number(id));

	const handleClickDetail = (event) => {
		event.preventDefault();
		navigate(`/detail/${id}`);
	}

	const handleClickAddProduct = () => {
		try {
			if (colors && Object.keys(colors).length) {
				id = colorId;
				const { colorHex, colorName } = colors.filter(color => color.id === Number(colorId))[0];
				userCartContext.addProduct({id, price, discountPrice, name, image, colorName, colorHex});
			} else {
				userCartContext.addProduct({id, price, discountPrice, name, image});
			}

			handleOpen();
			setTimeout(handleClose, 1000);
		} catch (e) {
			console.log(e.message);
		}
	}

	const handleOpen = () => setAlert(true);

	const handleClose = () => setAlert(false);

	const handleChange = (event) => {
		setColorId(event.target.value);
		setImage(colors.filter(color => color.id === event.target.value)[0].img);
	}

	return (
		<Container sx={{ padding: '0px !important' }} >
			<Fade in={alert}>
				<Alert 
					severity="info" 
					sx={{ position: 'fixed', top: '8vh', right: '1%', zIndex: '99999', minWidth: '200px' }}
				>
					Товар добавлен в корзину
				</Alert>
			</Fade>
			<Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
				<CardContent sx={{ width: '100%', padding: '16px 16px 4px 16px' }}>
					<Link href={`/detail/${id}`} onClick={handleClickDetail}>
						<CardMedia
							component="img"
							width="100%"
							height="100%"
							image={image}
							alt={name}
							sx={{ cursor: 'pointer' }}
						/>
					</Link>
					<Container className="thumbnailcard__description" sx={{ textAlign: 'center', padding: '0 !important' }} >
						<Link href={`/detail/${id}`} underline="none" color="black" onClick={handleClickDetail}>
							<Typography 
								gutterBottom 
								variant="subtitle1" 
								component="div" 
								className="thumbnailcard__description-name" 
								sx={{ wordWrap: 'break-word', cursor: 'pointer' }}
							>
							{name}
							</Typography>
						</Link>
						<Typography variant="subtitle2">
							{discountPrice.toLocaleString('ru-RU')},00 ₽
						</Typography>
						<Typography variant="caption" sx={{ textDecoration: "line-through", color: "#e06666" }}>
							{price.toLocaleString('ru-RU')},00 ₽
						</Typography>
					</Container>
					{
					colors && Object.keys(colors).length ? 
					<Box sx={{ display: 'flex', justifyContent: 'center', minWidth: 120, marginTop: '5px' }}>
						<FormControl>
							<InputLabel>Цвет</InputLabel>
							<Select
								className="thumbnail-card__color-select"
								value={colorId}
								label="Цвет"
								onChange={handleChange}
							>
								{
									colors.map((color) => (
										<MenuItem key={color.id} value={color.id}>
											<Box sx={{ width: '20px', height: '20px', backgroundColor: `${color.colorHex}` }} />
											<Typography sx={{ marginLeft: '5px' }}>{color.colorName}</Typography>
										</MenuItem>
									))
								}
							</Select>
						</FormControl>
					</Box> :
					<Box sx={{ height: '45px' }}/>
					}
				</CardContent>
				<CardActions>
					<Button size="medium" variant="contained" sx={{ marginBottom: '10px' }} onClick={handleClickAddProduct}>Добавить в корзину</Button>
				</CardActions>
			</Card>
		</Container>
	)
}