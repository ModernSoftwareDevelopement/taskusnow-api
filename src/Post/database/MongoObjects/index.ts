import mongoose from 'mongoose';
import { IPostMongoObj } from './IPostMongoObj';
import { PostMongoSchema } from './PostMongoSchema';

const PostModel = mongoose.model<IPostMongoObj>('Post', PostMongoSchema);

export { PostModel };
