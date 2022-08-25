import React from 'react';
import { Container, TextField, Button }  from '@mui/material';

export const AdminPage = () => {
	return (
		<Container sx={{ display: 'flex', flexDirection: 'column' }} >
		<h3>Введите данные для входа в панель администратора</h3>
			<TextField id="outlined-basic" label="Email" variant="outlined" margin="normal" sx={{ width: '100%', maxWidth: '400px' }} />
			<TextField id="outlined-basic" label="Password" variant="outlined" margin="normal" sx={{ width: '100%', maxWidth: '400px' }} />
			<Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: '15px', padding: 0 }} >
				<Button variant="contained" color="success" >Войти</Button>
				<Button variant="contained" color="warning" >Зарегистрироваться</Button>
			</Container>
		</Container>
	)
};