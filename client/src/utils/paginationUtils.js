export function paginatedProducts(chunkSize, filteredProducts) {
    const paginatedProducts = [];

    for (let i = 0; i < filteredProducts.length; i += chunkSize) {
        const chunk = filteredProducts.slice(i, i + chunkSize);
        paginatedProducts.push(chunk);
    }

    return paginatedProducts;
}