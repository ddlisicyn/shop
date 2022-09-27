import React, { useState } from 'react';
import { Container, TextField, Button, Box, IconButton, Modal }  from '@mui/material';
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
	overflowY: 'scroll'
};


export const ColorAddForm = ({ addColor }) => {
  	const [open, setOpen] = useState(false);
	const [form, setForm] = useState({ 
		id: '', 
		colorName: '',
		colorHex: '',
		img: ''
	 });

	const handleOpen = () => setOpen(true);

	const handleClose = () => setOpen(false);

	const changeHandler = event => {
		setForm({ ...form, [event.target.name]: event.target.value });
	}

  return (
    <div>
		<IconButton onClick={handleOpen}>
			<AddIcon 
				sx={{ color: '#1976d2' }}
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
					id="colorHex"
					label="Цвет"
					name="colorHex"
					type="text"
					placeholder="Введите цвет в hex"
					variant="outlined" 
					margin="normal" 
					sx={{ width: '100%' }}
					value={form.color}
					onChange={changeHandler}
				/>
				<TextField 
					id="colorName" 
					label="Название"
					name="colorName"
					type="text"
					placeholder="Название"
					variant="outlined" 
					margin="normal"
					sx={{ width: '100%' }}
					value={form.name}
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
			</Container>
			<Container 
				sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: '15px', padding: 0 }} 
			>
				<Button 
					variant="contained" 
					color="primary"
					sx={{ marginRight: '15px' }}
					onClick={() => addColor(form)}
				>Добавить
				</Button>
			</Container>
        </Box>
      </Modal>
    </div>
  );
}