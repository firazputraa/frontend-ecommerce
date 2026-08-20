import { BrowserRouter, Route, Routes } from 'react-router'
import HomePage from '../pages/Home/HomePage'
import ShopPage from '../pages/Shop/ShopPage'
import ProductDetailPage from '../pages/ProductDetail/ProductDetailPage'
import AdminProductsPage from '../pages/Admin/Products/AdminProductsPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />

        <Route
          path="/product/:slug"
          element={<ProductDetailPage />}
          
        />
        <Route
          path="/admin/products"
          element={<AdminProductsPage />}
        />
      </Routes>
    </BrowserRouter>
  )
}