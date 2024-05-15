const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'EMail is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
});

const TaskModel = model('Tasks', MySchema);
const UserModel = model('Users', userSchema);

module.exports = { TaskModel, UserModel };
