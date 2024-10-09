import "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Navigation from "../Navigation/Navigation";

import HomePage from "../../pages/HomePage/HomePage";
import NanniesPage from "../../pages/NanniesPage/NanniesPage";
import FavoritesPage from "../../pages/FavoritesPage/FavoritesPage";
import NotFoundPage from "../../pages/NotFoundPage/NoteFoundPage";

const App = () => {
  return (
    <>
      {/* <Navigation /> */}

      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
