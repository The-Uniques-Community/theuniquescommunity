const mongoose = require('mongoose');
require('dotenv').config();

const dbconnect = () => {
	mongoose.connect(process.env.MONGODB_URI);

	const connection = mongoose.connection;

	connection.once('open', () => {
		console.log('MongoDB database connection established successfully');
	});
}

module.exports = dbconnect;
