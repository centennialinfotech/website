const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,  // Good to add
    trim: true        // Good to add
  },
  password: {
    type: String,
    required: true
  },
  role: {            // Optional: for future admin levels
    type: String,
    enum: ['admin', 'superadmin'],
    default: 'admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Admin', AdminSchema); 