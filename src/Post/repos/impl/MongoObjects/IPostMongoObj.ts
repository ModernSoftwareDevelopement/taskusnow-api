import mongoose, { Document } from 'mongoose';

export interface IPostMongoObj extends Document {
  id: string;
  category?: string;
  content: string;
  userid: string;
  userName: string;
}
