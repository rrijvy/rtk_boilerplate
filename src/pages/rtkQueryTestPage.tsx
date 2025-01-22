import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetPostsQuery,
  useRemoveFirstPostMutation,
  useRemoveLastPostMutation,
  useClearPostsCacheMutation,
} from "../redux/queries/jsonPlaceholderQuery";

const RTKQueryTestPage = () => {
  const [fetchEnabled, setFetchEnabled] = useState(true);
  const {
    data: posts,
    error,
    isLoading,
  } = useGetPostsQuery(undefined, {
    skip: !fetchEnabled,
  });
  const [removeFirstPost] = useRemoveFirstPostMutation();
  const [removeLastPost] = useRemoveLastPostMutation();
  const [clearPostsCache] = useClearPostsCacheMutation();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) {
    return <p>{error instanceof Error ? error.message : "An error occurred."}</p>;
  }

  return (
    <div>
      <button onClick={() => navigate("/testPage")}>Click Me</button>

      <button
        onClick={async () => {
          setFetchEnabled(false);
          try {
            await clearPostsCache();
          } catch (error) {
            console.error("Failed to clear the posts cache:", error);
          }
        }}
      >
        Clear
      </button>

      <button
        onClick={async () => {
          try {
            await removeFirstPost();
          } catch (error) {
            console.error("Failed to remove the first post:", error);
          }
        }}
      >
        Remove First
      </button>

      <button
        onClick={async () => {
          try {
            await removeLastPost();
          } catch (error) {
            console.error("Failed to remove the last post:", error);
          }
        }}
      >
        Remove Last
      </button>

      <h1>Posts</h1>
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RTKQueryTestPage;
