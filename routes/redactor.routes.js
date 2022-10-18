const { Router } = require('express');
const Product = require('../models/Product');
const auth = require('../middleware/auth.middleware');
const router = Router();

router.post('/generate', auth, async (request, response) => {
	try {
		const { id, name, description, img, category, colors, capacity, subcategories, price, discountPrice } = request.body;

		const existing = await Product.findOne({ id });

		if (existing) {
			return response.json({ link: existing });
		}

		const product = new Product({
			id, name, description, img, category, colors, capacity, subcategories, price, discountPrice
		});

		await product.save()

		response.status(201).json({ product });

	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

/* router.delete('/', auth, async (request, response) => {
	try {
		const { idlinkId } = request.body;

		await Product.findOneAndDelete(id);

		response.status(200).json({ message: "Товар успешно удалена" });

	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

router.get('/', auth, async (request, response) => {
	try {
		const products = await Product.find({ owner: request.user.userId });
		response.json(products);
	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
});

router.get('/:id', auth, async (request, response) => {
	try {
		const link = await Link.findById(request.params.id);
		response.json(link);
	} catch(e) {
		response.status(500).json({ message: "Что-то пошло не так, попробуйте снова" });
	}
}); */

module.exports = router