import React,{useEffect} from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Outlet,useLocation } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import ScrollToTop from '../components/ScrollToTop';


const pageTitles = {
  "/": "home",
  "/about": "about",
  "/shop": "shop",
  "/trending-outfit": "Trending outfit",
  "/contact-us": "contact"
};

const MainLayout = () => {
 const location = useLocation();

  useEffect(() => {
    const title = pageTitles[location.pathname] || "The Style Parlour";
    document.title = `${title} | The Style Parlour`;
  }, [location.pathname]);
  return (
    <div>
     <ScrollToTop />
    <NavBar/>
    <Toaster/>
    <Outlet/>
    <Footer/>     
    </div>
  )
}

export default MainLayout
