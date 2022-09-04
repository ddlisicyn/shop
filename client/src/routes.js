import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { CartPage } from './pages/CartPage';
import { AdminPage } from './pages/AdminPage';
import { RedactorPage } from './pages/RedactorPage';
import { DetailPage } from './pages/DetailPage';

export const useRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path="/redactor" exact element={ <RedactorPage /> }>
				</Route>
				<Route path="/detail/:id" exact element={ <DetailPage /> }>
				</Route>
				<Route path="*" element={ <Navigate to="/redactor" /> }>
				</Route>
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path="/" exact element={ <MainPage /> }>
			</Route>
			<Route path="/cart" exact element={ <CartPage /> }>
			</Route>
			<Route path="/admin" exact element={ <AdminPage /> }>
			</Route>
			<Route path="/detail/:id" exact element={ <DetailPage /> }>
			</Route>
			<Route path="/redactor" element={<Navigate to="/admin" />}>
			</Route>
			<Route path="*" element={<Navigate to="/" />}>
			</Route>
		</Routes>
	)
}