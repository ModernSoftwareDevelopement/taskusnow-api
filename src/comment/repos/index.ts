import { InMemoryGetCommentsRepository } from './getComments/impl/InMemoryGetCommentsRepository';

const GetCommentsRepo = new InMemoryGetCommentsRepository();

export { GetCommentsRepo };