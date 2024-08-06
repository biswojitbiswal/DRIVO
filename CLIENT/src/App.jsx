import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Home />
        <Footer />
      </BrowserRouter>
      
    </>
  )
}

export default App
