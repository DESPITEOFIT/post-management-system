import { useEffect } from "react";

function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) {
      return;
    }

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [message, onClose]);

  if (!message) {
    return null;
  }

  return (
    <div className="toast" role="status">
      <span>✓</span>
      <span>{message}</span>
    </div>
  );
}

export default Toast;