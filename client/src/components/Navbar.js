import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
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
import HomeIcon from '@mui/icons-material/Home';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { SearchPanel } from './SearchPanel';
import { AddForm } from './AddForm';

const drawerWidth = 260;

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
  const auth = useContext(AuthContext)
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => setOpen(true);

  const handleDrawerClose = () => setOpen(false);

  const logoutHandler = (event) => {
	  event.preventDefault()
	  auth.logout()
	  navigate('/admin')
  }

  return (
    <Box sx={{ display: 'flex' }}>
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
						isAuthenticated ? 
						<></> : 
						<IconButton>
							<NavLink to='/' >
								<HomeIcon sx={{ color: '#fff' }} />
							</NavLink>
						</IconButton>
					}
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					{
						open ? <></> : <SearchPanel open={open}/>
					}
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
								<AddShoppingCartIcon sx={{ color: '#fff' }} />
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
				<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<ImportContactsIcon />
					</ListItemIcon>
					<ListItemText>Весь каталог</ListItemText>
				</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<AutoFixHighIcon />
					</ListItemIcon>
					<ListItemText>Красота</ListItemText>
				</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<HouseIcon />
					</ListItemIcon>
					<ListItemText>Дом</ListItemText>
				</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
				<ListItemButton>
					<ListItemIcon>
						<FavoriteBorderIcon />
					</ListItemIcon>
					<ListItemText>Здоровье</ListItemText>
				</ListItemButton>
				</ListItem>
			</List>
		</Drawer>
    </Box>
  );
}