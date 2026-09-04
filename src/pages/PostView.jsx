import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

function PostView({ setToastMessage }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const savedPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    const foundPost = savedPosts.find(
      (post) => post.id === Number(id)
    );

    setPost(foundPost);
  }, [id]);

  function handleDelete() {
  const confirmed = window.confirm(
    "Are you sure you want to delete this post?"
  );

  if (!confirmed) {
    return;
  }

  const savedPosts =
    JSON.parse(localStorage.getItem("posts")) || [];

  const updatedPosts = savedPosts.filter(
    (post) => post.id !== Number(id)
  );

  localStorage.setItem(
    "posts",
    JSON.stringify(updatedPosts)
  );
  setToastMessage("Post deleted successfully.");
  navigate("/");
}

  if (!post) {
    return (
      <main>
        <h1>Post Not Found</h1>

        <Link to="/">
          ← Back to Posts
        </Link>
      </main>
    );
  }

  return (
    <main>
      <Link
        to={`/${location.search}`}
        className="back-link"
        >
          ← Back to Posts
      </Link>

      <article className="post-view">
        <h1>{post.title}</h1>

        <p className="post-meta">
          By {post.author} · Created: {post.createdAt}
        </p>

        {post.updatedAt && (
            <p className="post-meta">
                Updated: {post.updatedAt}
            </p>
        )}

        <div className="post-content">
          <p>{post.content}</p>
        </div>

        {post.tags.length > 0 && (
          <div className="post-tags">
            {post.tags.map((tag) => (
              <span
                className="tag"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="post-actions">
            <Link
                to={`/posts/${post.id}/edit`}
                className="edit-button"
            >
                Edit Post
            </Link>
            
            <button
                type="button"
                className="delete-button"
                onClick={handleDelete}
            >
                Delete Post
            </button>
        </div>
      </article>
    </main>
  );
}

export default PostView;