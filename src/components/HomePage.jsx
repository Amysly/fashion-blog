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
    <TrendingOutfit limit={4}/>
    <NewsLetter/>
    <LatestArticles/>
    <Shop limit={4}/>
    <InspiredLooks/>
    </>
  )
}

export default HomePage
