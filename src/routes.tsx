import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'

const Rotas = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/perfil/:id" element={<Profile />} />
    <Route path="/checkout" element={<Checkout />} />
  </Routes>
)

export default Rotas
