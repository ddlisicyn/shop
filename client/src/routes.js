import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage } from './containers/MainPage';
import { CartPage } from './containers/CartPage';
import { AdminPage } from './containers/AdminPage';
import { RedactorPage } from './containers/RedactorPage';
import { DetailPage } from './containers/DetailPage';
import { routes } from './constants';

const { redactor, detail, core, cart, admin } = routes;

export const getRoutes = isAuthenticated => {
	if (isAuthenticated) {
		return (
			<Routes>
				<Route path={redactor} exact element={ <RedactorPage /> }>
				</Route>
				<Route path={`${detail}/:id`} exact element={ <DetailPage /> }>
				</Route>
				<Route path="*" element={ <Navigate to={redactor}/> }>
				</Route>
			</Routes>
		)
	}

	return (
		<Routes>
			<Route path={core} exact element={ <MainPage /> } />
			<Route path={`${core}/:category`} exact element={ <MainPage /> } />
			<Route path={`${core}/:category&page=:page`} exact element={ <MainPage /> } />
			<Route path={`${core}/search`} element={ <MainPage /> } />
			<Route path={`${core}/search=:search`} exact element={ <MainPage /> } />
			<Route path={`${core}/search=:search&page=:page`} exact element={ <MainPage /> } />
			<Route path={cart} exact element={ <CartPage /> } />
			<Route path={admin} exact element={ <AdminPage /> } />
			<Route path={`${detail}/:id`} exact element={ <DetailPage /> } />
			<Route path={redactor} element={<Navigate to={admin} />} />
			<Route path="*" element={<Navigate to={core} />} />
		</Routes>
	)
}