import { useEffect, useRef, useState } from "react";

function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const options = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "title-asc", label: "Title A-Z" },
    { value: "title-desc", label: "Title Z-A" }
  ];

  const selectedOption =
    options.find((option) => option.value === value) ||
    options[0];

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
        <span>{selectedOption.label}</span>

        <span className="dropdown-arrow">
          {open ? "▲" : "▼"}
        </span>
      </button>

      {open && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={
                  value === option.value
                    ? "dropdown-item active"
                    : "dropdown-item"
                }
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;