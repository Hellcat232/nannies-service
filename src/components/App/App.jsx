import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Modal from "react-modal";
import Layout from "../Layout/Layout";
import toast, { Toaster } from "react-hot-toast";

import HomePage from "../../pages/HomePage/HomePage";
import NanniesPage from "../../pages/NanniesPage/NanniesPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "../../pages/NotFoundPage/NoteFoundPage";

const notify = () => toast("Here is your toast.");

Modal.setAppElement("#root");

const App = () => {
  const [user] = useAuthState(auth);
  // console.log(user);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route
            path="/favorites"
            element={user !== null && <FavoritesPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </>
  );
};

export default App;
