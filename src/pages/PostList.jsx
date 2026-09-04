import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import AuthorDropdown from "../components/AuthorDropdown";
import PostCard from "../components/PostCard";
import SortDropdown from "../components/SortDropdown";
import seedPosts from "../utils/seedPosts";

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(
  searchParams.get("search") || ""
  );

  const [selectedAuthor, setSelectedAuthor] = useState(
    searchParams.get("author") || ""
  );

  const [selectedTag, setSelectedTag] = useState(
    searchParams.get("tag") || ""
  );

  const [sortBy, setSortBy] = useState(
    searchParams.get("sort") || "newest"
  );

  useEffect(() => {
  const savedPosts = localStorage.getItem("posts");

  if (savedPosts) {
    setPosts(JSON.parse(savedPosts));
  } else {
    localStorage.setItem(
      "posts",
      JSON.stringify(seedPosts)
    );

    setPosts(seedPosts);
  }
  }, []);

  useEffect(() => {
  const params = {};

  if (searchTerm) {
    params.search = searchTerm;
  }

  if (selectedAuthor) {
    params.author = selectedAuthor;
  }

  if (selectedTag) {
    params.tag = selectedTag;
  }

  if (sortBy !== "newest") {
    params.sort = sortBy;
  }

  setSearchParams(params);
}, [
  searchTerm,
  selectedAuthor,
  selectedTag,
  setSearchParams
]);

  const authors = [
    ...new Set(posts.map((post) => post.author))
  ];
  const tags = [
  ...new Set(
    posts.flatMap((post) => post.tags || [])
  )
];
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesAuthor =
      selectedAuthor === "" ||
      post.author === selectedAuthor;
    const matchesTag =
      selectedTag === "" ||
      (post.tags || []).includes(selectedTag);

    return matchesSearch && matchesAuthor && matchesTag;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
  if (sortBy === "newest") {
    return b.id - a.id;
  }

  if (sortBy === "oldest") {
    return a.id - b.id;
  }

  if (sortBy === "title-asc") {
    return a.title.localeCompare(b.title);
  }

  if (sortBy === "title-desc") {
    return b.title.localeCompare(a.title);
  }

  return 0;
});

  return (
    <main>
      <div className="page-header">
        <div>
          <h1>Post Management System</h1>
          <p>Manage your posts from one place.</p>
        </div>
      </div>

      <div className="post-controls">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm(event.target.value)
          }
        />

        <AuthorDropdown
          authors={authors}
          value={selectedAuthor}
          onChange={setSelectedAuthor}
        />
        <AuthorDropdown
          authors={tags}
          value={selectedTag}
          onChange={setSelectedTag}
          label="All Tags"
        />
        <SortDropdown
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {sortedPosts.length > 0 ? (
        <section className="post-list">
          {sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </section>
      ) : (
        <div className="no-posts">
          <h2>No posts found</h2>
          <p>
            Try changing your search or author filter.
          </p>
        </div>
      )}
    </main>
  );
}

export default PostList;