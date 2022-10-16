import React, { useContext, useState } from 'react';
import { Container, Button, Typography, Fade, Alert, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Context } from '../context/Context';
const shortid = require('shortid');

export const ProductCard = ({ product }) => {
	const [alert, setAlert] = useState(false);
	const { id, name, description, img, colors, capacity, price, discountPrice } = product;
	const [image, setImage] = useState(img);
	const [colorId, setColorId] = useState(Number(id));
	const context = useContext(Context);
	const formatted = description.split('\n').map(elem => <p key={shortid.generate()}>{elem}</p>);

	const handleClickAddProduct = () => {
		try {
			if (colors && Object.keys(colors).length) {
				const { colorHex, colorName } = colors.filter(color => color.id === Number(colorId))[0];
				context.addProduct(colorId, price, discountPrice, name, image, colorName, colorHex);
			} else {
				context.addProduct(id, price, discountPrice, name, image);
			}
			
			handleOpen();
			setTimeout(handleClose, 1000);
		} catch (e) {
			console.log(e.message)
		}
	}

	const handleOpen = () => setAlert(true);

	const handleClose = () => setAlert(false);

	const handleChange = (event) => {
		setColorId(event.target.value);
		setImage(colors.filter(color => color.id === event.target.value)[0].img);
	}

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
				<img src={image} alt={name} className="main-card__img"></img>
				<Typography gutterBottom variant="h6" component="div" sx={{ wordWrap: 'break-word', lineHieght: '1.25', marginTop: '25px' }} >
					{name}
				</Typography>
				<Typography variant="button" mt="25px" >
					{discountPrice.toLocaleString('ru-RU')},00 ₽
				</Typography>
				<Typography variant="overline" sx={{ textDecoration: "line-through", color: "#e06666", }}>
					{price.toLocaleString('ru-RU')},00 ₽
				</Typography>
				<Typography >
					Вес/объем: {capacity}
				</Typography>
				{
					colors && Object.keys(colors).length ? 
					<Box sx={{ minWidth: 120, marginTop: '30px' }}>
						<FormControl>
							<InputLabel>Цвет</InputLabel>
							<Select
							className="product-card__color-select"
							value={colorId}
							label="Цвет"
							onChange={handleChange}
							autoWidth
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
					<></>
				}
				<Button size="medium" variant="contained" sx={{ marginTop: '35px' }} onClick={handleClickAddProduct}>Добавить в корзину</Button>
				<Typography variant="h6" component="div" mt="50px" sx={{ wordWrap: 'break-word', textAlign: 'left' }} >
					Описание
				</Typography>
				{
					description.length ? 
					<Typography variant="body1" component="div" mb="20px" sx={{ wordWrap: 'break-word', textAlign: 'left' }} >
						{formatted}
					</Typography> :
					<>У продукта пока нет описания</>
				}
			</Container>
		</Container>
	)
};