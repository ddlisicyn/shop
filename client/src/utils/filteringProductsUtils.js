export function getFilteredProducts(category, search, allProducts) {
    if (search === '' && category === 'all') {
        return allProducts
    }

    if (search) {
        return allProducts.filter(product => searchCleaner(product.name).includes(search));
    }

    return allProducts.filter(product => category === 'all' ? 
        product : product.category === category);
}

//убирает мусор в поисковом запросе и оставляет только буквы и цифры
export function searchCleaner(searchString) {
    return searchString.toLowerCase().replace(/[^a-zа-я0-9\s]+/g, '');
}
		