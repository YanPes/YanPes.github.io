import { useParams } from '@modern-js/runtime/router';

const PostRoute = () => {
  const { post } = useParams();

  return <div>Hello from posts {post}</div>;
};

export default PostRoute;
