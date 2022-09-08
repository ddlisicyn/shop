const {Schema, model, Types } = require('mongoose');

const schema = new Schema({
	id: {type: String, required: true, unique: true}, 
	name: {type: String, required: true},
	description: {type: String, required: true},
	img: {type: String, required: true},
	category: {type: String, required: true},
	subcategories: {type: [String]},
	capacity: {type: String, required: true},
	price: {type: Number, required: true},
	discountPrice: {type: Number, required: true}
});

module.exports = model ('Product', schema)