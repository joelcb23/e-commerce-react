import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";
import OrderProvider from "./context/OrderContext";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

import FormAuth from "./pages/FormAuth";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import ProtectedRoute from "./ProtectedRoute";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import ProductForm from "./pages/ProductForm";
import OrdersPage from "./pages/OrdersPage";
import OrderPage from "./pages/OrderPage";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<ProductsPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:productId" element={<ProductPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/profile/orders" element={<OrdersPage />} />
                  <Route
                    path="/profile/orders/:orderId"
                    element={<OrderPage />}
                  />
                  <Route path="/profile/sell-item" element={<ProductForm />} />
                  <Route path="/cart" element={<CartPage />} />
                </Route>
                <Route
                  path="/login"
                  element={
                    <FormAuth>
                      <LoginForm />
                    </FormAuth>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <FormAuth>
                      <SignUpForm />
                    </FormAuth>
                  }
                />
              </Routes>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
};

export default App;
