import React, { useState, useContext } from 'react';
import { Context } from '../context/Context';
import { Container, Box, Typography, Tooltip, IconButton, ButtonGroup, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const CartProduct = ({ cartProduct }) => {
	const cart = useContext(Context);
	const id = cartProduct[0];
	const product = cartProduct[1];
	const [amount, setAmount] = useState(cartProduct[1].amount);
	const [show, setShow] = useState(true);

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

	return (
		<>
			{ show && amount ? 
				<Container className='cart-item' >
					<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
						<img src={product.img} style={{ width: '25%', maxWidth: '120px' }} alt='img'></img>
						<Box sx={{ display: 'flex', flexDirection: 'column' }}>
							<Typography variant="subtitle2" gutterBottom>
								{product.name}
							</Typography>
							<Box sx={{ 
								display: 'flex', 
								flexDirection: 'row', 
								alignItems: 'center'
								}}
							>
								<Box sx={{ width: '20px', height: '20px', backgroundColor: `${product.colorHex}` }} />
								<Typography sx={{ marginLeft: '5px' }} >{product.colorName}</Typography>
							</Box>
						</Box>
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
							<IconButton variant="outlined" color="primary" disabled={amount === 99} onClick={handleAdd}  >
								<AddIcon />
							</IconButton>
						</ButtonGroup>
						<Box>
							<Typography variant="subtitle2" >
								{(product.discountPrice * amount).toLocaleString('ru-RU')},00 ₽
							</Typography>
							<Typography variant="caption" sx={{ textDecoration: "line-through", color: "#e06666" }}>
								{(product.price * amount).toLocaleString('ru-RU')},00 ₽
							</Typography>
						</Box>
					</Box>
				</Container>
				: <></>
			}
		</>
	)
}