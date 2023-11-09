import { Post } from '../../domain/entity/Post';
import { IPostRepository } from '../IPostRepository';
import mongoose, { Document } from 'mongoose';
import { PostModel } from './MongoObjects';

export class MongoDbPostRepository implements IPostRepository {
  constructor() {
    mongoose.connect('mongodb://localhost:7000/vaccine');
  }
  async getAll(): Promise<Post[]> {
    const allPostDocs = await PostModel.find();
    const posts: Post[] = allPostDocs.map((post) => post.toObject());
    return posts;
  }

  async add(post: Post): Promise<Post> {
    const postDoc = new PostModel(post);
    const savedPost = await postDoc.save();
    return savedPost.toObject();
  }

  async update(post: Post): Promise<Post> {
    const id = post.Id;
    const postDoc = new PostModel(post);
    const updatedPost = await PostModel.findByIdAndUpdate<Post>(id, postDoc, {
      new: true,
    });

    if (updatedPost) {
      return updatedPost;
    } else {
      throw Error(`Post not found for the Id: ${id}`);
    }
  }

  async getByID(id: string): Promise<Post> {
    const postDoc = await PostModel.findById(id);
    if (postDoc) {
      return postDoc.toObject();
    } else {
      throw Error(`Post not found for the Id: ${id}`);
    }
  }

  async search(searchString: string): Promise<Post[]> {
    // const result = PostModel.find({$or [
    //   {content: {$regex: searchString}}
    // ]});

    const result = await PostModel.find({
      $or: [
        { content: /searchString/ },
        { category: /searchString/ },
        { userName: /searchString/ },
      ],
    });
    const posts: Post[] = result.map((post) => post.toObject());
    return posts;
  }

  async remove(id: string): Promise<boolean> {
    const result = await PostModel.findByIdAndDelete(id);
    return result ? true : false;
  }
}
