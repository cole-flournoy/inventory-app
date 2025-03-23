import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import InventoryTable from './pages/InventoryTable'
import ItemDetail from './pages/ItemDetail'
import SignUp from './pages/SignUp'

function App() {

  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/inventoryTable" element={<InventoryTable />} />
        <Route path="/itemDetail" element={<ItemDetail />} />
      </Routes>
    </Router>
  )
}

export default App
