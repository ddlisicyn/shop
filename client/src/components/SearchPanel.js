import React, { useState, useCallback, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHttp } from '../hooks/http.hook';
import { Context } from '../context/Context';
import { Container, Box, List, Divider, ListItem, Paper, Popper, Typography } from '@mui/material/';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


export const SearchPanel = () => {
	const wrapperRef = useRef(null);
	const navigate = useNavigate();
	const products = useContext(Context);
	const [anchorEl, setAnchorEl] = useState(null);
	const [open, setOpen] = useState(false);
	const [allProducts, setAllProducts] = useState([]);
	const [value, setValue] = useState('');
	const [filteredProducts, setFilteredProducts] = useState([]);
	const { request } = useHttp();
	useOutsideClose(wrapperRef);

	const getProduct = useCallback(async () => {
		try {
			const fetched =  await request(`/api/`, 'GET', null);
			setAllProducts(fetched);
			setFilteredProducts(fetched);
		} catch(e) {}
	}, [request]);

	useEffect(() => {
		getProduct();
	}, [getProduct]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		
		if (event.target.value !== '') {
			handleOpen();
		}
	};

	const handleChange = (event) => {
		setValue(event.target.value);

		if (!(event.target.value === '')) {
			handleOpen();
		} else {
			handleClose();
		}

		setFilteredProducts(allProducts.filter(product => {
			const name = product.name.toLowerCase().replace(/[^a-zа-я0-9\s]+/g, '');

			if (!name.includes(event.target.value.trim().toLowerCase().replace(/[^a-zа-я0-9\s]+/g, ''))) {
				return
			}

			return product
		}));
	}

	function useOutsideClose(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					handleClose();
				}
			}
		  
			document.addEventListener("mousedown", handleClickOutside);
				return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			setValue('');
			handleClose();
			navigate('/');
			products.handleSearch(value);
		}
	}

	const handleClickSearchButton = () => {
		setValue('');
		handleClose();
		navigate('/');
		products.handleSearch(value);
	}

	const handleClose = () => setOpen(false);

	const handleOpen = () => setOpen(true);

	return (
		<Container>
			<Paper 
				component="form"
				sx={{ p: 0, display: 'flex', alignItems: 'center', minWidth: '220px', height: '35px', margin: 'auto 0px' }}
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder="Поиск товара"
					onChange={handleChange}
					onClick={handleClick}
					onKeyPress={handleKeyPress}
					value={value}
				/>
				<IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleClickSearchButton}>
					<SearchIcon />
				</IconButton>
			</Paper>
			<Popper
				open={open}
				anchorEl={anchorEl}
				onClick={handleClose}
				anchororigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				sx={{
					maxHeight: '100vh',
					overflow: 'hidden',
					background: '#fff', 
					zIndex: 9999,
					borderRadius: '5px'
				}}
			>
			<List sx={{ width: '100%', maxWidth: 414, bgcolor: 'background.paper' }} ref={wrapperRef}>
				{
					filteredProducts.map((product) => (
						<Box key={product.id} onClick={() => {					
							navigate(`/detail/${product.id}`);
							setValue('');
						}}
						>
							<ListItem sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}>
								<img style={{ width: '50px' }} src={product.img} alt={product.name}/>
								<Typography sx={{ p: 0, width: '100%', marginLeft: '5px' }}>{product.name}</Typography>
							</ListItem>
							<Divider />
						</Box>
					))
				}
			</List>
		</Popper>
	  </Container>
	  );
};