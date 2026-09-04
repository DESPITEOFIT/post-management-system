import { Link, useLocation } from "react-router-dom";

function PostCard({ post }) {
  const location = useLocation();
  return (
    <article className="post-card">
      <h2>{post.title}</h2>

      <p className="post-meta">
        By {post.author} · {post.createdAt}
      </p>

      <p className="post-excerpt">
        {post.excerpt}
      </p>

      <Link
        to={`/posts/${post.id}${location.search}`}
        className="read-more-button"
      >
        Read More
      </Link>
    </article>
  );
}

export default PostCard;