import React, { useContext, useState } from 'react';
import { Container, TextField, Button, Snackbar, Alert }  from '@mui/material';
import { useHttp } from '../hooks/useHttp';
import { Context } from '../context/Context';

export const AdminPage = () => {
	const context = useContext(Context);
	const { loading, /* error, */ request } = useHttp();
	const [form, setForm] = useState({ email: '', password: '' });
	/* const [alert, setAlert] = useState(false); */

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	const registerHandler = async () => {
		try {
			const data = await (request('/api/admin/register', 'POST', { ...form }));
			console.log(data);
		} catch(e) {}
	}

	const loginHandler = async () => {
		try {
			const data = await request('/api/admin/login', 'POST', { ...form });
			context.login(data.token, data.userId);
		} catch (e) {}
	}

	return (
		<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
		<h3>Введите данные для входа в панель администратора</h3>
		<Snackbar open={false} autoHideDuration={6000}>
			<Alert severity="error" sx={{ width: '100%' }}>
			</Alert>
		</Snackbar>
			<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }} >
				<TextField 
					id="email" 
					label="Email"
					name="email"
					type="text"
					placeholder="Введите почту"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%', maxWidth: '380px' }}
					value={form.email}
					onChange={changeHandler}
				/>
				<TextField 
					id="password"
					label="Пароль"
					name="password"
					type="password"
					placeholder="Введите пароль"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%', maxWidth: '380px' }}
					value={form.password}
					onChange={changeHandler}
				/>
			</Container>
			<Container 
				sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '15px', padding: 0 }} 
			>
				<Button 
					variant="contained" 
					color="success"
					sx={{ marginRight: '15px' }}
					onClick={loginHandler}
					disabled={loading}
				>Войти</Button>
				<Button 
					variant="contained" 
					color="warning"
					onClick={registerHandler}
					disabled
				>Зарегистрироваться</Button>
			</Container>
		</Container>
	)
};