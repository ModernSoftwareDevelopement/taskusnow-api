import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: false,
  },
  email_2: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  address_2: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
  skills: {
    type: [String],
  },
});

export const UserModel = mongoose.model('User', userModel);
