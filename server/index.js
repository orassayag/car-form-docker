// Express App Setup.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

// Connect to the database server.
const db = 'mongodb://mongodb:27017/cars';
mongoose.connect(db, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`Connected to ${db}...`);
  });

const {
  Car
} = require('./models/car');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/addCar', async (req, res) => {
  let car;
  try {
    car = await new Car({
      vehicleNumber: req.body.vehicleNumber,
      carType: req.body.carType,
      carModel: req.body.carModel
    }).save();
  } catch (err) {
    console.error('Failed to create the car.', err);
  }

  if (!car) {
    return res.status(400).send('Failed to save the car on the database.');
  }

  return res.status(200).send(car);
});

app.get('/getAllCars', async (req, res) => {
  Car.find({}, function (err, cars) {
    if (err) throw err;
    return res.status(200).send(cars);
  });
});

app.listen(5000, err => {
  console.log('Listening to port 5000...');
});