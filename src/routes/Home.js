import React from 'react'
import Header from '../components/main/Header'
import Slider from '../components/main/Slider'
import TrendingInstruction from '../components/main/TrendingInstruction'
import KeywordInstruction from '../components/main/KeywordInstruction'
import DataInstruction from '../components/main/DataInstruction'
import Banner from '../components/main/Banner'
import Footer from '../components/main/Footer'


export default function Home() {
  return (
    <div>
        <Header/>
        <Slider/>
        <TrendingInstruction/>
        <KeywordInstruction/>
        <DataInstruction/>
        <Banner/>
        <Footer/>
    </div>
  )
}
