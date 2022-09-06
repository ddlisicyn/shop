import { useState, useCallback } from 'react';

export const useProducts = () => {
	const [category, setCategory] = useState('all');
	const [search, setSearch] = useState('');

	const handleCategory = useCallback((category) => {
		setCategory(category);
	}, []);

	const handleSearch = useCallback((search) => {
		setSearch(search);
	}, []);



	return { category, search, handleCategory, handleSearch }
};