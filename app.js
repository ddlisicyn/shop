const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

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