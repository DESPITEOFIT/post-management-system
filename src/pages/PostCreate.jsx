import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PostCreate({ setToastMessage }) {
const navigate = useNavigate();
const [formData, setFormData] = useState({
    title: "",
    author: "",
    content: "",
    tags: ""
});

const [errors, setErrors] = useState({});

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

   if (Object.keys(newErrors).length === 0) {
  const existingPosts =
    JSON.parse(localStorage.getItem("posts")) || [];

  const newPost = {
    id: Date.now(),
    title: formData.title.trim(),
    author: formData.author.trim(),
    content: formData.content.trim(),
    tags: formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== ""),
    excerpt: formData.content.trim().slice(0, 120),
    createdAt: new Date().toLocaleDateString()
  };

  const updatedPosts = [
    ...existingPosts,
    newPost
  ];

  localStorage.setItem(
    "posts",
    JSON.stringify(updatedPosts)
  );

  setToastMessage("Post created successfully.");

  navigate("/");
}
  }

  return (
    <main>
      <h1>Create New Post</h1>

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
            placeholder="react, javascript, web"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <button type="submit">
          Create Post
        </button>

      </form>
    </main>
  );
}

export default PostCreate;