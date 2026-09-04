import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Post Manager
      </Link>

      <Link to="/posts/new" className="new-post-button">
        + New Post
      </Link>
    </header>
  );
}

export default Header;