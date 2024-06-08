/*------------------------ Core Packages --------------- */
const express = require('express');
const server = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");

/*------------------------ Custom Packages --------------- */
const imageRoutes = require('./routes/imageRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFoundHandler = require('./middleware/notFoundHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.json');

dotenv.config();

// Rate limiter to limit requests from a single IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, 
  message: "Too many requests from this IP, please try again in an hour!",
});

/*------------------------ Packages To Servers --------------- */
server.options("*", cors()); 
server.use(cors()); 
server.use(helmet()); 
server.use("/api", limiter); 
server.use(express.json({ limit: "10kb" })); 
server.use(express.urlencoded({ extended: true })); // Body parser for URL encoded data
server.use(morgan('dev')); 

/*------------------------ Routes --------------- */
server.get('/hema', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Importing imageRoutes 
server.use('/api/images', imageRoutes);

// Serve Swagger documentation
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

/*------------------------ Middlewares --------------- */
// First middleware for logging request details
server.use((req, res, next) => {
  console.log(`Request URL: ${req.url}, Method: ${req.method}, Query: ${JSON.stringify(req.query)}`);
  next();
});


// second middleware for handling 404 Not Found
server.use(notFoundHandler);

// third middleware for error handling
server.use(errorHandler);

/*------------------------ Server --------------- */
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
