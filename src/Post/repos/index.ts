import { IPostRepository } from './IPostRepository';
import { InMemoryPostRepository } from './impl/InMemoryPostRepository';
import { MongoDbPostRepository } from './impl/MongoDbPostRepository';

let postRepository: IPostRepository;

if (process.env.DB_TYPE === 'MONGO_DB') {
  postRepository = new MongoDbPostRepository();
} else {
  postRepository = new InMemoryPostRepository();
}

export { postRepository };
