import { GetCommentsController } from './getComments/GetCommentsController';
import { GetCommentsUseCase } from '../../useCases/getComments/GetCommentsUseCase';
import { GetCommentsRepo} from '../../repos/index';
const getCommentsUseCase = new GetCommentsUseCase(GetCommentsRepo);

const getCommentsController = new GetCommentsController(getCommentsUseCase);


export { getCommentsController };
