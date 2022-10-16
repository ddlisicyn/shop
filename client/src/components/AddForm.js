import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../context/Context';
import { useHttp } from '../hooks/useHttp';
import { Container, TextField, Button, Box, IconButton, Modal, MenuItem, ListItem }  from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { ColorAddForm } from './ColorAddForm';
import { ListItemColor } from './ListItemColor';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '95%',
	maxWidth: '800px',
	height: '100vh',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
	overflowY: 'scroll'
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
	},
	{
		value: 'Уход за телом',
		label: 'Уход за телом'
	}
];

const fields = [
	{
		id: "id",
		label: "Артикул",
		name: "id",
		placeholder: "Введите артикул"
	},
	{
		id: "name",
		label: "Название",
		name: "name",
		placeholder: "Введите название продукта"
	},
	{
		id: "description",
		label: "Описание",
		name: "description",
		placeholder: "Введите описание продукта...",
		multiline: true,
		rows: 6
	},
	{
		id: "img",
		label: "Изображение",
		name: "img",
		placeholder: "Вставьте ссылку на изображение"
	},
	{
		id: "capacity",
		label: "Вес/объем",
		name: "capacity",
		placeholder: "Введите вес или объем"
	},
	{
		id: "price",
		label: "Цена каталога",
		name: "price",
		placeholder: "Введите цену каталога"
	},
	{
		id: "discountPrice",
		label: "Цена со скидкой",
		name: "discountPrice",
		placeholder: "Введите цену со скидкой"
	}
];

export const AddForm = () => {
	const { loading,  request } = useHttp();
	const context = useContext(Context);
	const navigate = useNavigate();
  	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({ 
		id: '', 
		name: '',
		description: '',
		img: '',
		category: 'Дом',
		subcategories: [],
		colors: [],
		capacity: '',
		price: '',
		discountPrice: ''
	 });

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

	const addColor = (colorForm) => {
		const colors = form.colors;
		colors.push(colorForm);

		setForm({ ...form, 'colors': colors });
	}

	const handleDelete = (id) => {
		const colors = form.colors.filter(color => color.id !== id);

		setForm({ ...form, 'colors': colors });
	}

	const addProductHandler = async () => {
		try {
			await request('/api/redactor/generate', 'POST', { ...form }, { Authorization: `Bearer ${context.token}` });
			handleClose();
			setForm({ 
				id: '', 
				name: '',
				description: '',
				img: '',
				category: 'Дом',
				subcategories: [],
				capacity: '',
				price: '',
				discountPrice: ''
			 });
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
			{
				fields.map((item) => (
					<TextField 
						id={item.id}
						label={item.label}
						name={item.name}
						placeholder={item.placeholder}
						type="text"
						variant="outlined" 
						margin="normal"
						multiline={item.multiline}
						rows={item.rows || 1}
						sx={{ width: '100%' }}
						value={form[item.name]}
						onChange={changeHandler}
					/>
				))
			}
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
				<ListItem sx={{ padding: '8px 0px', flexWrap: 'wrap' }}>
					{
						form.colors && form.colors.map((elem) => (
							<ListItemColor key={elem.id} elem={elem} handleDelete={handleDelete} />
						))
					}
					<ColorAddForm addColor={addColor} />
				</ListItem>
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