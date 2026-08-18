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
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProfile from "./Admin/pages/AdminProfile";
import AllSubscribers from "./Admin/pages/AllSubscribers";
import AdminProducts from "./Admin/pages/AdminProducts";
import PostDetail from "./Pages/PostDetail";
import About from "./Pages/About";
import ErrorPage from "./Pages/ErrorPage";
import Contact from "./Pages/Contact";
import AdminTrendingOutfit from "./Admin/pages/AdminTrendingOutfit";
import ProductDetail from "./Pages/ProductDetail";
import TrendingOutfitDetail from "./Pages/TrendingOutfitDetail";
import LatestArticles from "./Pages/LatestArticles";
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/shop" element={<Shop />} />
         <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<Contact />} />
           <Route path="/blog" element={<LatestArticles />} />
        <Route path="/trending-outfit" element={<TrendingOutfit />} />
        <Route path="/blog/:slug" element={<PostDetail />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/trending-outfit/:slug" element={<TrendingOutfitDetail />} />
      </Route>
     <Route path='*' element={< ErrorPage/>}/>

    <Route element={<ProtectedRoute />}>
      <Route path="/admin" element={<AdminMainlayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="/admin/create-post" element={<CreatePost />} />
        <Route path="/admin/all-post" element={<AllPosts />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/settings" element={<Settings />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/subscribers" element={<AllSubscribers />} />
        <Route path="/admin/trending-outfit" element={<AdminTrendingOutfit />} />
        <Route path="/admin/product" element={<AdminProducts />} />
      </Route>
    </Route>
    <Route path="/admin/login" element={<AdminLogin />} />
</>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
