const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json({ extended: true }));

app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/redactor', require('./routes/redactor.routes'));
app.use('/api/cart', require('./routes/cart.routes'));
app.use('/api/', require('./routes/products.routes'));

if (process.env.NODE_ENV === 'production') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

const port = config.get('port') || 5000;

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {});
		app.listen(port, () => console.log(`App has been started on ${port}...`));
	} catch(e) {
		console.log('Server Error', e.message);
		process.exit(1)
	}
}

start()