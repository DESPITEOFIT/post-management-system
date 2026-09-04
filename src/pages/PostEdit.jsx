import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostEdit({ setToastMessage }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    tags: ""
  });

  const [errors, setErrors] = useState({});
  const [postFound, setPostFound] = useState(true);

  useEffect(() => {
    const savedPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    const foundPost = savedPosts.find(
      (post) => post.id === Number(id)
    );

    if (!foundPost) {
      setPostFound(false);
      return;
    }

    setFormData({
      title: foundPost.title,
      author: foundPost.author,
      content: foundPost.content,
      tags: foundPost.tags.join(", ")
    });
  }, [id]);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.author.trim()) {
      newErrors.author = "Author is required.";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required.";
    } else if (formData.content.trim().length < 20) {
      newErrors.content =
        "Content must be at least 20 characters.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const savedPosts =
      JSON.parse(localStorage.getItem("posts")) || [];

    const updatedPosts = savedPosts.map((post) => {
      if (post.id === Number(id)) {
        return {
          ...post,
          title: formData.title.trim(),
          author: formData.author.trim(),
          content: formData.content.trim(),
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag !== ""),
          excerpt: formData.content.trim().slice(0, 120),
          updatedAt: new Date().toLocaleDateString()
        };
      }

      return post;
    });

    localStorage.setItem(
      "posts",
      JSON.stringify(updatedPosts)
    );

    setToastMessage("Post updated successfully.");

    navigate(`/posts/${id}`);
  }

  if (!postFound) {
    return (
      <main>
        <h1>Post Not Found</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />

          {errors.title && (
            <p className="form-error">
              {errors.title}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>

          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />

          {errors.author && (
            <p className="form-error">
              {errors.author}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>

          <textarea
            id="content"
            name="content"
            rows="8"
            value={formData.content}
            onChange={handleChange}
          ></textarea>

          {errors.content && (
            <p className="form-error">
              {errors.content}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="tags">Tags</label>

          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Save Changes
        </button>
      </form>
    </main>
  );
}

export default PostEdit;