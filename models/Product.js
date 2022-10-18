const {Schema, model, Types } = require('mongoose');

const ColorsSchema = new Schema({
	colorHex: {type: String, required: true},
	id: {type: Number, required: true, unique: true },
	colorName: {type: String, required: true },
	img: {type: String, required: true }
}); 

const schema = new Schema({
	id: {type: String, required: true, unique: true}, 
	name: {type: String, required: true},
	description: {type: String, required: true},
	img: {type: String, required: true},
	category: {type: String, required: true},
	colors: {type: [ColorsSchema]},
	subcategories: {type: [String]},
	capacity: {type: String, required: true},
	price: {type: Number, required: true},
	discountPrice: {type: Number, required: true}
});

module.exports = model ('Product', schema)