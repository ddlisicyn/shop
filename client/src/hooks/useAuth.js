import { useState, useCallback, useEffect } from 'react';
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils/localStorageUtils';

const storageName = 'userData';

export const useAuth = () => {
	const [token, setToken] = useState(null);
	const [userId, setUserId] = useState(null);

	const login = useCallback((jwtToken, id) => {
		setToken(jwtToken);
		setUserId(id);
		const data = { userId: id, token: jwtToken };

		setDataToLocalStorage(storageName, data);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUserId(null);

		localStorage.removeItem(storageName);
	}, []);

	useEffect(() => {
		const data = getDataFromLocalStorage(storageName);

		if (data && data.token) {
			login(data.token, data.userId);
		}
	}, [login]);


	return { login, logout, token, userId }
};