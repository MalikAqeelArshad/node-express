import mongoose from 'mongoose';

let database = [];
let connection = [];
const Database = (name) => {
	const dbName = name?.toUpperCase() || 'TEST';
	if (!dbName) return console.log(`Invalid Database`);

	const uri = process.env[`API_MONGODB_URI_${dbName}`];
	// console.info('uri', uri, dbName, connection);
	if (connection.includes(dbName)) return database[dbName];

	try {
		database[dbName] = mongoose.createConnection(uri);
		console.log('MongoDB Connected!');
		connection.push(dbName); // if database:connection not exist
	} catch(e) {
		console.log(`MongoDB not Connected: ${e.message}`);
	}
	return database[dbName];
}

export default Database;