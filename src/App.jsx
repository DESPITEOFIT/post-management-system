import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Toast from "./components/Toast";
import PostCreate from "./pages/PostCreate";
import PostEdit from "./pages/PostEdit";
import PostList from "./pages/PostList";
import PostView from "./pages/PostView";

function App() {
  const [toastMessage, setToastMessage] = useState("");
  return (
    <BrowserRouter>
    <Header />
    
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage("")}
      />

      <Routes>
        <Route path="/" element={<PostList />} />
        <Route
          path="/posts/new"
          element={<PostCreate
            setToastMessage={setToastMessage}
          />}
        />
        <Route
          path="/posts/:id"
          element={<PostView
            setToastMessage={setToastMessage}
          />}
        />
        <Route
          path="/posts/:id/edit"
          element={<PostEdit
            setToastMessage={setToastMessage}
          />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
