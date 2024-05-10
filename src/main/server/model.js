const { Schema, model } = require('mongoose');

const MySchema = new Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TaskModel = model('SampleDB', MySchema);

module.exports = TaskModel;
