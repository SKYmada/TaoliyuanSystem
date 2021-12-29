const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/tly');

module.exports = mongoose