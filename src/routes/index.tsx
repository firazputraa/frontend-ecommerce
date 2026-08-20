import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from '../pages/Home/HomePage'
import ShopPage from '../pages/Shop/ShopPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
      </Routes>
    </BrowserRouter>
  )
}