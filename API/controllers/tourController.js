const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`API/dev-data/data/tours-simple.json`)
);

//Create
//And post is to create a new tour
// we send data from client to the ser
exports.createTour = (req, res) => {
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
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    data: {
      tours,
    },
  });
};
// Read
exports.getTour = (req, res) => {
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
exports.updateTour = (req, res) => {
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
exports.deleteTour = (req, res) => {
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
