import React from 'react'
import Herosection from './Herosection'
import TrendingOutfit from '../Pages/TrendingOutfit'
import NewsLetter from '../Pages/NewsLetter'
import LatestArticles from '../Pages/LatestArticles'
import Shop from '../Pages/Shop'
import InspiredLooks from '../Pages/InspiredLooks'


const HomePage = () => {
  return (
    <>
    <Herosection/>
    <TrendingOutfit/>
    <NewsLetter/>
    <LatestArticles/>
    <Shop/>
    <InspiredLooks/>
    </>
  )
}

export default HomePage
