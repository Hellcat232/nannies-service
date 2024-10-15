import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase";
import Modal from "react-modal";
import Layout from "../Layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const NanniesPage = lazy(() => import("../../pages/NanniesPage/NanniesPage"));
const FavoritesPage = lazy(() =>
  import("../../pages/FavoritesPage/FavoritesPage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NoteFoundPage")
);

const notify = () => toast("Here is your toast.");

Modal.setAppElement("#root");

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Layout>
        <Suspense fallback={""}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/nannies" element={<NanniesPage />} />
            <Route
              path="/favorites"
              element={user !== null && <FavoritesPage />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster />
    </>
  );
};

export default App;
