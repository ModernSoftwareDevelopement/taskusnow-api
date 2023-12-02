import { postRepository } from '../../repos';
import { CreatePostUseCase } from '../../useCases/CreatePostUseCase';
import { CreatePostController } from './CreatePostController';
import { GetAllPostsUseCase } from '../../useCases/GetAllPostsUseCase';
import { GetAllPostsController } from './GetAllPostsController';
import { GetPostByIDUseCase } from '../../useCases/GetPostByIDUseCase';
import { GetPostByIDController } from './GetPostByIDController';

const createPostUseCase = new CreatePostUseCase(postRepository);
const createPostController = new CreatePostController(createPostUseCase);

const getPostByIDUseCase = new GetPostByIDUseCase(postRepository);
const getPostByIDController = new GetPostByIDController(getPostByIDUseCase);

const getAllPostsUseCase = new GetAllPostsUseCase(postRepository);
const getAllPostsController = new GetAllPostsController(getAllPostsUseCase);

export { createPostController, getPostByIDController, getAllPostsController };
