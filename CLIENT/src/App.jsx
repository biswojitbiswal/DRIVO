import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Register from './components/Register'
import TermsConditions from './components/TermCondition'
import Logout from './components/Logout'
import Error from './components/Error'
import AdminLayout from './AdminPanel/AdminLayout'
import AdminUsers from './AdminPanel/AdminUsers'
import AdminContacts from './AdminPanel/AdminContacts'
import AdminVehicles from './AdminPanel/AdminVehicles'
import AdminEditUsers from './AdminPanel/AdminEditUser'
import Booking from './components/Booking'
import AdminHome from './AdminPanel/AdminHome'

function App() {


  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/booking/:vehicleId' element={<Booking />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} /> 
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/terms&conditions' element={<TermsConditions />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<AdminHome />} />
            <Route path='users' element={<AdminUsers />} />
            <Route path='users/edit/:id' element={<AdminEditUsers />} />
            <Route path='contacts' element={<AdminContacts />} />
            <Route path='vehicles' element={<AdminVehicles />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      
    </>
  )
}

export default App
