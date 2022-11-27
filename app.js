const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./API/routes/tourRoute');
const userRouter = require('./API/routes/userRoute');

const app = express();

//Add middleware
app.use(express.json());
app.use(morgan('dev'));

// Create our own Middleware
app.use((req, res, next) => {
  console.log('Hello, This is come from Middleware 👋🙋‍♂️');
  next();
});
//Manipulate request parameters
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// we can do even nicer
//Mount Router
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
