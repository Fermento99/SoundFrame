const mongoose = require('mongoose');

const connect = async() => await mongoose.connect('mongodb://localhost:27017/SoundFrameDBTest');
const disconnect = async() => await mongoose.connection.close();

module.exports = { connect, disconnect };