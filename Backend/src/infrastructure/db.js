const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
module.exports = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB conectado');
};