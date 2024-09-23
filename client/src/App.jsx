import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

import FormAuth from "./pages/FormAuth";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/cart" element={<CartPage />} />
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
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </>
  );
};

export default App;
