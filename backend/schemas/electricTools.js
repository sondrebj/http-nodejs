const mongoose = require('mongoose');

const electricToolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_name: {
        type: String,
        required: true
    }
  });
  
module.exports = mongoose.model('ElectricTool', electricToolSchema);