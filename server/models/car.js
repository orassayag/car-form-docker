const mongoose = require('mongoose');

// Create the car schema.
const Car = mongoose.model('car', new mongoose.Schema({
    vehicleNumber: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 250,
        trim: true
    },
    carType: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 250,
        trim: true
    },
    carModel: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 250,
        trim: true
    }
}));

module.exports = {
    Car: Car
};