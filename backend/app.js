const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const bookRoutes = require('./routes/book');

const app = express();
app.use(bodyParser.json());

main().catch((err) => console.log(err));

async function main() {
  const connectionString =
    'mongodb+srv://redoutezgaetan:PVG7aTPwZdUdmPBB@mon-vieux-grimoire-clus.gxf76jf.mongodb.net/mon-vieux-grimoire?retryWrites=true&w=majority';

  try {
    await mongoose.connect(connectionString);
    console.log('Connection to MongoDB with Mongoose : Success !');
  } catch (error) {
    console.error('Connection to MongoDB with Mongoose : Failed !');
  }
}

app.use('/api/books', bookRoutes);

module.exports = app;
