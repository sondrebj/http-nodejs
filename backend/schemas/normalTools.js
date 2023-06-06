const mongoose = require('mongoose');

const normalToolSchema = new mongoose.Schema({
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
  
module.exports = mongoose.model('NormalTool', normalToolSchema);