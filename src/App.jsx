import { useState } from 'react'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero/hero'
import Discover from './components/discover/discover'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'

function App() {
  const [activeTab, setActiveTab] = useState('cartaz')

  return (
    <>
      <Navbar setActiveTab={setActiveTab} />
      <Hero />
      <Discover activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollToTop/>
    </>
  )
}

export default App