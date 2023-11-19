import { Post } from './Post';
describe('Post Entity', () => {
  const id: string = new Date().getTime().toString();
  let category: string;
  let content: string;
  let userid: string;
  let userName: string;

  const init = () => {
    return new Post({
      id,
      category,
      content,
      userid,
      userName,
    });
  };

  beforeEach(() => {
    category = 'rental';
    content = 'Looking for a room for a family';
    userid = '111';
    userName = 'Dummy';
  });

  it('should create valid post', () => {
    const post = init();

    expect(post.validate()).toMatchObject({ valid: true });
  });

  it('should detect empty content', () => {
    content = '';
    const post = init();

    expect(post.validate()).toMatchObject({ valid: false });
  });

  it('should detect empty category', () => {
    category = '';
    const post = init();

    expect(post.validate()).toMatchObject({ valid: false });
  });

  it('should detect Invalid User ID', () => {
    userid = '';
    const post = init();

    expect(post.validate()).toMatchObject({ valid: false });
  });
});
