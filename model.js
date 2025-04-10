const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true, //  Prevents duplicate email registrations
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

const TaskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  task: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model("User", UserSchema);
const Task = mongoose.model("Task", TaskSchema);

module.exports = { User, Task };

























// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
// });

// const TaskSchema = new mongoose.Schema({
//     userId: mongoose.Schema.Types.ObjectId,
//     task: String,
//     completed: Boolean,
// });

// const User = mongoose.model("User", UserSchema);
// const Task = mongoose.model("Task", TaskSchema);

// module.exports = { User, Task };
