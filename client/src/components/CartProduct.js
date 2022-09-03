import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Context } from '../context/Context';
import { Loader } from './Loader';
import { Container, Box, Typography, Tooltip, IconButton, ButtonGroup, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const CartProduct = ({ cartProduct }) => {
	const cart = useContext(Context);
	const id = cartProduct[0];
	const [product, setProduct] = useState({});
	const [amount, setAmount] = useState(cartProduct[1].amount);
	const [show, setShow] = useState(true);
	const { loading, request} = useHttp();

	const getProduct = useCallback(async (id) => {
		try {
			const fetched = await request(`/api/cart`, 'POST', { id } );
			setProduct(fetched);
		} catch(e) {}
	}, [request]);

	useEffect(() => {
		getProduct(id);
	}, [id, getProduct]);

	const handleRemove = () => {
		let newStateOfAmount = amount - 1;
		setAmount(newStateOfAmount);
		cart.removeProduct(id);
	}

	const handleAdd = () => {
		let newStateOfAmount = amount + 1;
		setAmount(newStateOfAmount);
		cart.addProduct(id);
	}

	const handleDelete = () => {
		cart.deleteProduct(id);
		setShow(false);
	}

	if (loading) {
		return <Loader />
	}

	return (
		<>
			{ show && amount ? 
				<Container className='cart-item' >
					<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
						<img src={product.img} style={{ width: '25%', maxWidth: '120px' }} alt='img'></img>
						<Typography variant="subtitle2" gutterBottom>
							{product.name}
						</Typography>
						<Tooltip title="Delete" sx={{ order: 999, marginLeft: 'auto' }}>
							<IconButton onClick={handleDelete}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					</Box>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
						<ButtonGroup variant="outlined" sx={{ display: 'flex', alignItems: 'center' }}>
							<IconButton variant="outlined" color="error" disabled={amount === 1}  onClick={handleRemove}>
								<RemoveIcon />
							</IconButton>
							<TextField 
								variant="outlined" 
								className="cart-item__amount-input" 
								value={amount} 
								InputProps={{
									readOnly: true,
								}} 
							/>
							<IconButton variant="outlined" color="primary" onClick={handleAdd} >
								<AddIcon />
							</IconButton>
						</ButtonGroup>
						<Box>
							<Typography variant="subtitle2" >
								{product.discountPrice * amount},00 ₽
							</Typography>
							<Typography variant="caption" sx={{ textDecoration: "line-through", color: "#e06666" }}>
								{product.price * amount},00 ₽
							</Typography>
						</Box>
					</Box>
				</Container>
				: <></>
			}
		</>
	)
}