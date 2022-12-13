export function getFilteredProducts(category, search, allProducts) {

    if (search === '' && category === 'all') {
        return allProducts
    }

    if (search) {
        return allProducts.filter(product => searchCleaner(product.name).includes(search));
    }

    return allProducts.filter(product => category === 'all' ? 
        product : product.category === categoryNameConverter(category));
}

//убирает мусор в поисковом запросе и оставляет только буквы и цифры
export function searchCleaner(searchString) {
    return searchString.toLowerCase().replace(/[^a-zа-я0-9\s]+/g, '');
}

export function categoryNameConverter(categoryName) {
    const categoryNameMatch = {
        'all': 'Весь каталог',
        'home': 'Дом',
        'beauty': 'Красота',
        'health': 'Здоровье',
        'body-care': 'Уход за телом'
    };

    return categoryNameMatch[categoryName];
}
		