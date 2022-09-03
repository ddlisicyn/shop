import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import { useHttp } from '../hooks/http.hook';
import { Container, TextField, Button, Box, Modal }  from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '95%',
	maxWidth: '800px',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
};

export const OrderForm = () => {
	const { loading,  request } = useHttp();
	const auth = useContext(Context);
	const navigate = useNavigate();
  	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({ 
		name: '',
		telephone: '+7(___)___-__-__',
		city: ''
	 });

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	const addProductHandler = async () => {
		try {
			await request('/api/redactor/generate', 'POST', { ...form }, { Authorization: `Bearer ${auth.token}` });
			handleClose();
			navigate(`/detail/${form.id}`);
		} catch (e) {}
	}

  return (
    <div>
		<Button variant="contained" sx={{ width: '170px', marginTop: '20px' }} onClick={handleOpen}>Оформить заказ</Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
		<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }} >
				<TextField 
					id="name" 
					label="Фамилия, Имя"
					name="name"
					type="text"
					placeholder="Иванов Иван"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%' }}
					value={form.name}
					onChange={changeHandler}
				/>
				<TextField 
					id="telephone"
					label="Номер телефона"
					name="telephone"
					type="number"
					placeholder="+7(999)999-99-99"
					pattern="2[0-9]{3}-[0-9]{3}"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%' }}
					required
					value={form.telephone}
					onChange={changeHandler}
				/>
				<TextField 
					id="description" 
					label="Описание"
					name="description"
					type="text"
					placeholder="Описание продукта..."
					variant="outlined" 
					margin="normal"
					multiline
					rows={4}
					sx={{ width: '100%' }}
					value={form.description}
					onChange={changeHandler}
				/>
			</Container>
			<Container 
				sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '15px', padding: 0 }} 
			>
				<Button 
					variant="contained" 
					color="primary"
					sx={{ marginRight: '15px' }}
					onClick={addProductHandler}
					disabled={loading}
				>Добавить
				</Button>
			</Container>
        </Box>
      </Modal>
    </div>
  );
}