const { Router } = require('express');
const Product = require('../models/Product');
const router = Router();

router.get('/', async (request, response) => {
	try {
		const products = await Product.find();
		response.json(products);
	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

router.get('/detail/:id', async (request, response) => {
	try {
		const product = await Product.find({ id: request.params.id });
		response.json(product);
	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

module.exports = router;