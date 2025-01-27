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
  const [upsertId, setUpsertId] = useState("");
  const [upsertTitle, setUpsertTitle] = useState("");
  const [upsertBody, setUpsertBody] = useState("");

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
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex flex-wrap gap-4 mb-8">
        <button onClick={() => navigate("/testPage")} className="bg-blue-100 text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-200">
          Click Me
        </button>
        <button
          onClick={async () => {
            setFetchEnabled(false);
            try {
              await clearPostsCache();
            } catch (error) {
              console.error("Failed to clear the posts cache:", error);
            }
          }}
          className="bg-red-100 text-red-700 px-4 py-2 rounded shadow hover:bg-red-200"
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
          className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded shadow hover:bg-yellow-200"
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
          className="bg-green-100 text-green-700 px-4 py-2 rounded shadow hover:bg-green-200"
        >
          Remove Last
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Reorder Item</h3>
          <input
            type="number"
            placeholder="Enter index to reorder"
            value={reorderIndex}
            onChange={(e) => setReorderIndex(e.target.value)}
            className="border border-gray-300 bg-gray-100 rounded px-4 py-2 w-full mb-4"
          />
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
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-200"
          >
            Reorder to Top
          </button>
        </div>

        {/* Delete Item */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Delete Item</h3>
          <input
            type="number"
            placeholder="Enter index to delete"
            value={deleteIndex}
            onChange={(e) => setDeleteIndex(e.target.value)}
            className="border border-gray-300 bg-gray-100 rounded px-4 py-2 w-full mb-4"
          />
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
            className="bg-red-100 text-red-700 px-4 py-2 rounded shadow hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Add Item Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-5">
        <button
          onClick={async () => {
            try {
              await addNewItem();
            } catch (error) {
              console.error("Failed to add a new item:", error);
            }
          }}
          className="bg-gray-200 text-gray-600 px-3 py-1 rounded shadow hover:bg-gray-300 text-sm"
        >
          Add New Item
        </button>

        {/* Upsert Post */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Upsert Post</h3>
          <input
            type="number"
            placeholder="Enter Post ID"
            value={upsertId}
            onChange={(e) => setUpsertId(e.target.value)}
            className="border border-gray-300 bg-gray-100 rounded px-4 py-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Enter Post Title"
            value={upsertTitle}
            onChange={(e) => setUpsertTitle(e.target.value)}
            className="border border-gray-300 bg-gray-100 rounded px-4 py-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Enter Post Body"
            value={upsertBody}
            onChange={(e) => setUpsertBody(e.target.value)}
            className="border border-gray-300 bg-gray-100 rounded px-4 py-2 w-full mb-4"
          />
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
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded shadow hover:bg-blue-200"
          >
            Upsert Post
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        {posts && (
          <ul className="space-y-4">
            {posts.map((post, index) => (
              <li key={post.id} className="border-b pb-4">
                <h3 className="text-lg font-semibold">
                  #{index + 1}: {post.title}
                </h3>
                <p className="text-gray-600">{post.body}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RTKQueryTestPage;
