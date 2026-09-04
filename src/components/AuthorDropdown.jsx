import { useEffect, useRef, useState } from "react";

function AuthorDropdown({
  authors,
  value,
  onChange,
  label = "All Authors"
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const selectedAuthor =
    value || label;

  useEffect(() => {
  function handleClickOutside(event) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setOpen(false);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      setOpen(false);
      buttonRef.current?.focus();
    }
  }

  if (open) {
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    document.addEventListener(
      "keydown",
      handleKeyDown
    );
  }

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );

    document.removeEventListener(
      "keydown",
      handleKeyDown
    );
  };
}, [open]);

  return (
    <div
      className="custom-dropdown"
      ref={dropdownRef}
    >
      <button
        ref={buttonRef}
        type="button"
        className="dropdown-toggle"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span>{selectedAuthor}</span>

        <span className="dropdown-arrow">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <ul className="dropdown-menu">
          <li>
            <button
              type="button"
              className={
                value === ""
                  ? "dropdown-item active"
                  : "dropdown-item"
              }
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              {label}
            </button>
          </li>

          {authors.map((author) => (
            <li key={author}>
              <button
                type="button"
                className={
                  value === author
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => {
                  onChange(author);
                  setOpen(false);
                }}
              >
                {author}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AuthorDropdown;