import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { CategoryAndSearchContext, Context } from '../context/Context';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import HouseIcon from '@mui/icons-material/House';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CleanHandsIcon from '@mui/icons-material/CleanHands';
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { SearchPanel } from './SearchPanel';
import { AddForm } from './AddForm';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const drawerWidth = 260;

const categories = [
	{ name: 'all', value: 'Весь каталог', icon: <ImportContactsIcon /> },
	{ name: 'Дом', value: 'Дом', icon: <HouseIcon /> },
	{ name: 'Красота', value: 'Красота', icon: <AutoFixHighIcon />},
	{ name: 'Здоровье', value: 'Здоровье', icon: <FavoriteBorderIcon /> },
	{ name: 'Уход за телом', value: 'Уход за телом', icon: <CleanHandsIcon /> }
];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const Navbar = ({ isAuthenticated }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const сategoryAndSearchContext = useContext(CategoryAndSearchContext);
	const context = useContext(Context);
	const [open, setOpen] = useState(false);
	const [amountOfProductsInCart, setAmountOfProductsInCart] = useState(0);

	const handleDrawerOpen = () => setOpen(true);

	const handleDrawerClose = () => setOpen(false);

	const handleHomeButton = () => {		
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
		сategoryAndSearchContext.handleSearch('');
		сategoryAndSearchContext.handleCategory('all');
		navigate('/');
	}

	const logoutHandler = (event) => {
		event.preventDefault()
		context.logout()
		navigate('/admin')
	}

	useEffect(() => {
		let amount = 0;

		for (let key in context.products) {
			amount += +context.products[key].amount;
		}

		setAmountOfProductsInCart(amount);
	}, [context.products]);

	return (
		<Box sx={{ display: 'flex', marginBottom: '20px' }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						{
							isAuthenticated ? 
							<AddForm /> :
							<IconButton
								color="inherit"
								aria-label="open drawer"
								onClick={handleDrawerOpen}
								edge="start"
								sx={{ mr: 0, ...(open && { display: 'none' }) }}
							>
								<MenuIcon />
							</IconButton>
						}
						{
							!isAuthenticated &&
							<IconButton onClick={handleHomeButton} >
								<HomeIcon sx={{ color: '#fff' }} />
							</IconButton>
						}
						{
							!open && <SearchPanel open={open}/>
						}
					</div>
					<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						{
							isAuthenticated ? 
							<Button 
								variant="text" 
								sx={{ color: '#fff' }}
								onClick={logoutHandler}
							>
								Выйти
							</Button> : 
							<IconButton>
								<NavLink to='/cart'>
									<StyledBadge badgeContent={amountOfProductsInCart} color="primary">
										<ShoppingCartIcon sx={{ color: '#fff' }} />
									</StyledBadge>
								</NavLink>
							</IconButton>
						}
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
				width: drawerWidth,
				flexShrink: 0,
				'& .MuiDrawer-paper': {
					width: drawerWidth,
					boxSizing: 'border-box',
				},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					{
						categories.map((category) => (
							<ListItem disablePadding key={category.name + category.value}>
								<ListItemButton onClick={() => {
									сategoryAndSearchContext.handleSearch('');
									сategoryAndSearchContext.handleCategory(category.name);		
									window.scrollTo({
										top: 0,
										behavior: 'smooth'
									});		
									navigate('/');
									handleDrawerClose();
								}}>
									<ListItemIcon>
										{category.icon}
									</ListItemIcon>
									<ListItemText>{category.value}</ListItemText>
								</ListItemButton>
							</ListItem>
						))
					}
				</List>
			</Drawer>
		</Box>
	);
}