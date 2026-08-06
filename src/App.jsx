import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import HomePage from "./components/HomePage";
import Shop from "./Pages/Shop";
import TrendingOutfit from "./Pages/TrendingOutfit";

import AdminMainlayout from "./Admin/layout/AdminMainlayout";
import AdminDashboard from "./Admin/components/AdminDashboard";
import CreatePost from "./Admin/pages/CreatePost";
import AllPosts from "./Admin/pages/AllPosts";
import Categories from "./Admin/pages/Categories";
import Settings from "./Admin/pages/Settings";
import AdminLogin from "./Admin/pages/AdminLogin";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/trending-outfit" element={<TrendingOutfit />} />
        </Route>

        <Route path="/admin/dashboard" element={<AdminMainlayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/create-post" element={<CreatePost />} />
          <Route path="/admin/all-post" element={<AllPosts />} />
          <Route path="/admin/categories" element={<Categories />} />
          <Route path="/admin/settings" element={<Settings />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;