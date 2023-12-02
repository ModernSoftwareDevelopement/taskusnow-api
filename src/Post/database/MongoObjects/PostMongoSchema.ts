import { IPostMongoObj } from './IPostMongoObj';
import mongoose from 'mongoose';

const PostMongoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    category: { type: String, required: false },
    userid: { type: String, required: true },
    userName: { type: String, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  },
);

PostMongoSchema.virtual('id').get(function (this: IPostMongoObj) {
  return this._id.toHexString();
});

PostMongoSchema.set('toObject', { virtuals: true });
PostMongoSchema.set('toJSON', { virtuals: true });

export { PostMongoSchema };
