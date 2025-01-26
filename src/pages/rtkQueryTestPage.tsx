import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetPostsQuery,
  useRemoveFirstPostMutation,
  useRemoveLastPostMutation,
  useClearPostsCacheMutation,
  useReorderItemMutation,
  useDeleteItemAtIndexMutation,
  useAddNewItemMutation,
  useUpsertDataMutation,
} from "../redux/queries/jsonPlaceholderQuery";

const RTKQueryTestPage = () => {
  const [fetchEnabled, setFetchEnabled] = useState(true);
  const [reorderIndex, setReorderIndex] = useState("");
  const [deleteIndex, setDeleteIndex] = useState("");
  const [upsertId, setUpsertId] = useState(""); // New state for Upsert ID
  const [upsertTitle, setUpsertTitle] = useState(""); // New state for Upsert Title
  const [upsertBody, setUpsertBody] = useState(""); // New state for Upsert Body

  const { data: posts, error, isLoading } = useGetPostsQuery(undefined, { skip: !fetchEnabled });
  const [removeFirstPost] = useRemoveFirstPostMutation();
  const [removeLastPost] = useRemoveLastPostMutation();
  const [clearPostsCache] = useClearPostsCacheMutation();
  const [reorderItem] = useReorderItemMutation();
  const [deleteItemAtIndex] = useDeleteItemAtIndexMutation();
  const [addNewItem] = useAddNewItemMutation();
  const [upsertData] = useUpsertDataMutation();
  const navigate = useNavigate();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error instanceof Error ? error.message : "An error occurred."}</p>;

  // Input validation and conversion helpers
  const parseIndex = (input: string): number => {
    const parsed = parseInt(input, 10);
    return isNaN(parsed) ? -1 : parsed;
  };

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

      <div>
        <h3>Reorder Item</h3>
        <input type="number" placeholder="Enter index to reorder" value={reorderIndex} onChange={(e) => setReorderIndex(e.target.value)} />
        <button
          onClick={async () => {
            const index = parseIndex(reorderIndex);
            if (index >= 0 && index < (posts?.length || 0)) {
              try {
                await reorderItem(index);
              } catch (error) {
                console.error("Failed to reorder the item:", error);
              }
            } else {
              alert("Invalid index!");
            }
          }}
        >
          Reorder to Top
        </button>
      </div>

      <div>
        <h3>Delete Item</h3>
        <input type="number" placeholder="Enter index to delete" value={deleteIndex} onChange={(e) => setDeleteIndex(e.target.value)} />
        <button
          onClick={async () => {
            const index = parseIndex(deleteIndex);
            if (index >= 0 && index < (posts?.length || 0)) {
              try {
                await deleteItemAtIndex(index);
              } catch (error) {
                console.error("Failed to delete the item:", error);
              }
            } else {
              alert("Invalid index!");
            }
          }}
        >
          Delete
        </button>
      </div>

      <button
        onClick={async () => {
          try {
            await addNewItem(); // Add a new item to the list
          } catch (error) {
            console.error("Failed to add a new item:", error);
          }
        }}
      >
        Add New Item
      </button>

      <div>
        <h3>Upsert Post</h3>
        <input type="number" placeholder="Enter Post ID" value={upsertId} onChange={(e) => setUpsertId(e.target.value)} />
        <input type="text" placeholder="Enter Post Title" value={upsertTitle} onChange={(e) => setUpsertTitle(e.target.value)} />
        <input type="text" placeholder="Enter Post Body" value={upsertBody} onChange={(e) => setUpsertBody(e.target.value)} />
        <button
          onClick={async () => {
            const id = parseIndex(upsertId);
            if (id <= 0 || !upsertTitle || !upsertBody) {
              alert("Invalid input!");
              return;
            }
            try {
              await upsertData({ id, title: upsertTitle, body: upsertBody });
              alert("Post upserted successfully!");
            } catch (error) {
              console.error("Failed to upsert the post:", error);
            }
          }}
        >
          Upsert Post
        </button>
      </div>

      <h1>Posts</h1>
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li key={post.id}>
              <h3>
                #{index + 1}: {post.title}
              </h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RTKQueryTestPage;
