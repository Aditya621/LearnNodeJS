const express = require('express');
const fs = require('fs');

const app = express();

//Add middleware
app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello this is come from server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('you can post this endpoint...');
// });
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/API/dev-data/data/tours-simple.json`)
);

//Create
//And post is to create a new tour
// we send data from client to the server
const createTour = (req, res) => {
  //   console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/API/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), // for making json object
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
//Read
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
};
// Read
const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  // find Id from tours object
  const tour = tours.find((el) => el.id === id);

  // if id is greater than total number of Id
  //   if (id > tours.length) {
  if (!tour) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }
  //   console.log(typeof tour);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
//update
// put => we expexct that our application receives entire new updated Object
// patch => we only need to update some properties of Object
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here ...>',
    },
  });
};
//Delete
const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid Id',
    });
  }

  //204 means no content
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours', createTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// we can do even nicer
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
