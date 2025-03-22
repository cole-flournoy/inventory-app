import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login'
import InventoryTable from './pages/InventoryTable'
import ItemDetail from './pages/ItemDetail'

function App() {

  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Login />} />
        <Route path="/inventoryTable" element={<InventoryTable />} />
        <Route path="/itemDetail" element={<ItemDetail />} />
      </Routes>
    </Router>
  )
}

export default App
