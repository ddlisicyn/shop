import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Container, TextField, Button, Box, IconButton, Modal, MenuItem }  from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

const categories = [
	{
		value: 'Дом',
		label: 'Дом',	
	},
	{
		value: 'Красота',
		label: 'Красота',	
	},
	{
		value: 'Здоровье',
		label: 'Здоровье',	
	}
];

export const AddForm = () => {
	const { loading,  request } = useHttp();
	const auth = useContext(AuthContext);
	const navigate = useNavigate();
  	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({ 
		id: '', 
		name: '',
		description: '',
		img: '',
		category: 'Дом',
		subcategories: [],
		price: '',
		discountPrice: ''
	 });

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	const addProductHandler = async () => {
		try {
			await request('/api/redactor/generate', 'POST', { ...form }, { Authorization: `Bearer ${auth.token}` });
			navigate(`/detail/${form.id}`);
		} catch (e) {}
	}

  return (
    <div>
		<IconButton onClick={handleOpen}>
			<AddIcon 
				sx={{ color: '#fff' }}
			/>
		</IconButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
		<Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 0 }} >
				<TextField 
					id="id" 
					label="Артикул"
					name="id"
					type="text"
					placeholder="Введите артикул"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%' }}
					value={form.id}
					onChange={changeHandler}
				/>
				<TextField 
					id="name"
					label="Название"
					name="name"
					type="text"
					placeholder="Введите название продукта"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%' }}
					value={form.name}
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
				<TextField 
					id="img"
					label="Изображение"
					name="img"
					type="text"
					placeholder="Вставьте ссылку на изображение"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%' }}
					value={form.img}
					onChange={changeHandler}
				/>
				<TextField
					id="category"
					select
					label="Категория"
					name="category"
					helperText="Выберете категорию"
					sx={{ width: '100%' }}
					value={form.category}
					onChange={changeHandler}
					>
					{categories.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField 
					id="price"
					label="Цена каталога"
					name="price"
					type="text"
					placeholder="Введите цену каталога"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%' }}
					value={form.price}
					onChange={changeHandler}
				/>
				<TextField 
					id="discountPrice"
					label="Цена со скидкой"
					name="discountPrice"
					type="text"
					placeholder="Введите цену со скидкой"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%' }}
					value={form.discountPrice}
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