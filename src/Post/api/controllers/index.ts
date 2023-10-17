import { postRepository } from '../../repos';
import { CreatePostUseCase } from '../../userCases/CreatePostUseCase';
import { GetPostByIDUseCase } from '../../userCases/GetPostByIDUseCase';
import { CreatePostController } from './CreatePostController';
import { GetPostByIDController } from './GetPostByIDController';

const createPostUseCase = new CreatePostUseCase(postRepository);
const createPostController = new CreatePostController(createPostUseCase);

const getPostByIDUseCase = new GetPostByIDUseCase(postRepository);
const getPostByIDController = new GetPostByIDController(getPostByIDUseCase);

export { createPostController, getPostByIDController };
