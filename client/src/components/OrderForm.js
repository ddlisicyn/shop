import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import { useHttp } from '../hooks/http.hook';
import { Container, TextField, Button, Box, Modal, Fade, Alert, Typography }  from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
	const envProcces = process.env.NODE_ENV;
	const cart = useContext(Context);
	const products = useContext(Context);
	const { loading, error, clearError, request } = useHttp();
	const navigate = useNavigate();
  	const [open, setOpen] = useState(false);
	const [openSuccessModal, setOpenSuccessModal] = useState(false);
	const [status, setStatus] = useState(true);
	const [form, setForm] = useState({ 
		name: '',
		telephone: '',
		city: '',
		description: ''
	});

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const handleCloseSuccessModal = () => {
		setOpenSuccessModal(false);
		products.handleCategory('all');
		navigate('/');
	}

	const changeHandler = event => {
		const name = event.target.name;
		let value = event.target.value;

		if (name === 'telephone') {
			value = formatPhoneNumber(value);
		}

		if (name === 'name') {
			value = formatSurnameAndName(value);
		}

		setForm({ ...form, [name]: value});
	}

	const handleRequestForm = async () => {
		const token = '5794071948:AAHNpCIJqSr3crWo1wlngRVTtSfy5YJ-qe8';
		const chat_id = envProcces === 'development' ? 446803360 : -1001311071865;
		const newLine = '%0A';
		let text = `Информация Клиента:${newLine}
			ФИО: ${form.name ? form.name : 'Клиент не указал информацию' }${newLine}
			Номер телефона: 8${form.telephone.split(/\W/).join('')}${newLine}
			Город: ${form.city ? form.city : 'Клиент не указал информацию'}${newLine}
			Комментарий к заказу: ${form.description ? form.description : 'Клиент не оставил комментарий'}${newLine}${newLine}
			Заказ:${newLine}`;
		try {
			for (let key in cart.products) {
				const id = key;
				const { name, amount, discountPrice } = cart.products[key];

				text += `• ${name.replace('&', '%26')}${newLine}
					Артикул: ${id}${newLine}
					Цена: ${discountPrice}${newLine}
					Количество: ${amount}${newLine}${newLine}`;

			}

			console.log(text);

			text += `${newLine}Конечная стоимость: ${cart.totalPrice}`;

			await request(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_id}&parse_mode=html&text=${text}`, 'POST');
			cart.deleteAll();
			handleClose();
			setOpenSuccessModal(true);
		} catch (e) {
			setTimeout(clearError, 2000);
		}
	}

	function formatSurnameAndName(value) {
		return value.replace(/\d+/g, '');
	}

	function formatPhoneNumber(value) {
		if (!value) return value;
	  
		const phoneNumber = value.replace(/[^\d]/g, '');
	  
		const phoneNumberLength = phoneNumber.length;
	  
		if (phoneNumberLength <= 3) return `(${phoneNumber})`;

		if (phoneNumberLength <= 6) {
		  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
		}
	  
		return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
		  3,
		  6
		)}-${phoneNumber.slice(6, 10)}`;
	  }

	  useEffect(() => {
		  setStatus(/\(\d{3}\)\s\d{3}-\d{2}\d{2}$/.test(form.telephone));
	  }, [form.telephone]);

  return (
    <div>
		<Button 
			variant="contained" 
			sx={{ width: '170px', marginTop: '20px' }} 
			onClick={handleOpen}
			disabled={!(cart.products && !!Object.keys(cart.products).length)}
		>
			Оформить заказ
		</Button>
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
						inputProps={{ maxLength: 100 }}
						sx={{ width: '100%' }}
						value={form.name}
						onChange={changeHandler}
					/>
					<Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
						<TextField
							value="+7"
							sx={{ width: '60px !important', marginRight: '5px', marginTop: '8px' }}
							disabled
						/>
						<TextField 
							id="telephone"
							label="Номер телефона"
							name="telephone"
							type="text"
							placeholder="(999) 999-9999"
							inputProps={{ maxLength: 14 }}
							variant="outlined" 
							margin="normal"
							error={!status}
							sx={{ width: '100%' }}
							required
							value={form.telephone}
							onChange={changeHandler}
						/>
					</Box>
					<TextField 
						id="city" 
						label="Город"
						name="city"
						type="text"
						placeholder="Введите город"
						variant="outlined" 
						margin="normal"
						inputProps={{ maxLength: 100 }}
						sx={{ width: '100%' }}
						value={form.city}
						onChange={changeHandler}
					/>
					<TextField 
						id="description" 
						label="Комментарий к заказу"
						name="description"
						type="text"
						placeholder="Здесь Вы можете оставить комментарий к заказу или указать время для связи с Вами"
						variant="outlined" 
						margin="normal"
						multiline
						rows={3}
						inputProps={{ maxLength: 300 }}
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
						onClick={handleRequestForm}
						disabled={loading || !status}
					>Отправить
					</Button>
				</Container>
			</Box>
		</Modal>
		<Modal
        open={openSuccessModal}
        onClose={handleCloseSuccessModal}
      	>
			<Box sx={style}>
				<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
					<CloseIcon sx={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} onClick={handleCloseSuccessModal} />
					<Typography variant="h4" gutterBottom textAlign="center">Спасибо!</Typography>
					<div className="svg-container">    
						<svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="100" width="100" viewBox="0 0 48 48" aria-hidden="true">
							<circle className="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
							<path className="tick" fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
						</svg>
					</div>
					<Typography variant="body1" gutterBottom mt="15px" textAlign="justify">Мы приняли ваш заказ и свяжемся с Вами в течение 24 часов по указанному номеру телефона.</Typography>
				</Container>
			</Box>
		</Modal>
		<Fade in={error}>
			<Alert 
				severity="error" 
				sx={{ position: 'absolute', top: '10vh', left: '3%', zIndex: '99999', minWidth: '200px' }}
			>
				Что-то пошло не так. Попробуйте снова!
			</Alert>
		</Fade>
    </div>
  );
}