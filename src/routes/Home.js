import React from 'react'
import Header from '../components/Header'
import Slider from '../components/Slider'
import TrendingInstruction from '../components/TrendingInstruction'
import KeywordInstruction from '../components/KeywordInstruction'
import DataInstruction from '../components/DataInstruction'
import Banner from '../components/Banner'
import Footer from '../components/Footer'


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
