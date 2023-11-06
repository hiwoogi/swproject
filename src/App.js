
import './App.css';
import Header from './components/Header.js';
import TrendingInstruction from './components/TrendingInstruction.js';
import DataInstruction from './components/DataInstruction.js';
import Banner from './components/Banner.js';
import Footer from './components/Footer.js';
import KeywordInstruction from './components/KeywordInstruction.js';
import Slider from './components/Slider.js';

export default function App() {
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
  
  );
}


