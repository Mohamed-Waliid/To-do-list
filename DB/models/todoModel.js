const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  isCompleted: {
    type: Boolean,
    default: false 
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
}, { timestamps: true }); 

module.exports = mongoose.model('Todo', todoSchema);
