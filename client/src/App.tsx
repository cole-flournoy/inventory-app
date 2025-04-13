import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import InventoryTable from './pages/InventoryTable'
import ItemDetail from './pages/ItemDetail'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'
import { CookiesProvider } from 'react-cookie'

function App() {

  return (
    <CookiesProvider>
      <Toaster />
      <Router>
        <Routes>        
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/inventory" element={<InventoryTable />} />
          <Route path="/itemDetail" element={<ItemDetail />} />
        </Routes>
      </Router>
    </CookiesProvider>
  )
}

export default App
