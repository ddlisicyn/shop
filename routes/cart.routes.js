const { Router } = require('express');
const Product = require('../models/Product');
const router = Router();

router.post('/', async (request, response) => {
	try {
		const { id } = request.body;

		const product = await Product.findOne({ id }).exec();
		response.json(product);
	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

module.exports = router;