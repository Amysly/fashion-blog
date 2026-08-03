import React from 'react'
import HomePage from './components/HomePage'
import MainLayout from './layout/MainLayout'
import TrendingOutfit from './Pages/TrendingOutfit'
import NewsLetter from './Pages/NewsLetter'
import LatestArticles from './Pages/LatestArticles'
import Shop from './Pages/Shop'
import InspiredLooks from './Pages/InspiredLooks'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/trending-outfit' element={<TrendingOutfit/>}/>

      </Route>
      </>
    )
  )
 return (
    <RouterProvider router={router}/>

  )
  
}

export default App
