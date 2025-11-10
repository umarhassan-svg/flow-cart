import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoutes from './components/PrivateRoutes/PrivateRoutes'
import LoginPage from './pages/LoginPage'
import Home from './pages/Home'
import { ProductsListPage } from './pages/ProductsListPage'

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path="/dashboard" element={<div>Dashboard - Protected Route</div>} />
          <Route path="/products" element={<ProductsListPage/>} />
          <Route path="/logout" element={<div>Logout - Protected Route</div>} />
          <Route path="/cart" element={<div>Cart - Protected Route</div>} />
          <Route path="/checkout" element={<div>Logout - Protected Route</div>} />
        </Route>

        <Route path="/" element={<Home/>} />
        <Route path="/403" element={<div>403 - Forbidden</div>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>

    </Router>
    
  )
}

export default App
