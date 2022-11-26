const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello this is come from server side', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send('you can post this endpoint...');
});

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
