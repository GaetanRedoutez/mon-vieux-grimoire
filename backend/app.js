const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger/index');

const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/book');

const app = express();
app.use(bodyParser.json());

async function main() {
  // MongoDB connection string
  const connectionString =
    'mongodb+srv://redoutezgaetan:PVG7aTPwZdUdmPBB@mon-vieux-grimoire-clus.gxf76jf.mongodb.net/mon-vieux-grimoire?retryWrites=true&w=majority';

  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(connectionString);
    console.log('Connection to MongoDB with Mongoose : Success !');
  } catch (error) {
    console.error(
      'Connection to MongoDB with Mongoose : Failed !',
      ' Error : ',
      error
    );
  }
}

main().catch((err) => console.log(err));

// Middleware for handling CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Accept, Origin, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

// Routes for handling books and user authentication
app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);

// Serve static images from the 'images' directory
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
