import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { useCart } from './hooks/cart.hook';
import { useProducts } from './hooks/products.hook';
import { Context } from './context/Context';
import { Navbar } from './components/Navbar';

function App() {
  const { login, logout, token, userId } = useAuth();
  const { products, addProduct, removeProduct, deleteProduct, deleteAll, totalPrice, setAmount } = useCart();
  const { category, search, handleCategory, handleSearch } = useProducts();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  return (
    <Context.Provider value={{
      login, logout, token, userId, isAuthenticated, 
      products, addProduct, removeProduct, deleteProduct,
      deleteAll, totalPrice, setAmount, category, search,
      handleCategory, handleSearch
    }}>
      <BrowserRouter>
        <Navbar isAuthenticated={isAuthenticated} />
        <div className='main' >
          { routes }
        </div>
      </BrowserRouter>
    </Context.Provider>
  );
}

export default App;
