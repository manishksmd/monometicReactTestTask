/*
 * Database connectivity
 */
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://monometic:monometic2780@localhost:27017/monometic');
//check if we are connected successfully or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

export default db;
