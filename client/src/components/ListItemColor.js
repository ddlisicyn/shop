import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const ListItemColor = ({ elem, handleDelete }) => {
	return (
		<Box sx={{ 
			display: 'flex', 
			flexDirection: 'row', 
			alignItems: 'center', 
			border: '1px solid rgba(133, 133, 133, 0.6)', 
			borderRadius: '5px', 
			padding: '5px',
			margin: '5px 5px 5px 0'
			}}
		>
			<Box sx={{ width: '20px', height: '20px', backgroundColor: `${elem.colorHex}` }} />
			<Typography sx={{ marginLeft: '5px' }} >{elem.colorName}</Typography>
			<IconButton sx={{ marginLeft: '5px' }}  onClick={() => handleDelete(elem.id)}>
				<DeleteIcon />
			</IconButton>
		</Box>
	)
}