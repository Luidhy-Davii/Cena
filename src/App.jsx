import { useState } from 'react'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero/Hero'
import Discover from './components/discover/discover'

function App() {
  const [activeTab, setActiveTab] = useState('cartaz')

  return (
    <>
      <Navbar setActiveTab={setActiveTab} />
      <Hero />
      <Discover activeTab={activeTab} setActiveTab={setActiveTab} />
    </>
  )
}

export default App