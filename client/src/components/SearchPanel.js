import React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export const SearchPanel = () => {
	return (
		<Paper
		  component="form"
		  sx={{ p: 0, display: 'flex', alignItems: 'center', minWidth: '160px', height: '35px', margin: 'auto 20px' }}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder="Поиск товара"
			/>
			<IconButton type="button" sx={{ p: '10px' }} aria-label="search">
				<SearchIcon />
			</IconButton>
		</Paper>
	  );
};