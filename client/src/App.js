import React, { useContext } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { useCategoryAndSearch  } from './hooks/useProducts';
import { Context, CategoryAndSearchContext } from './context/Context';
import { Navbar } from './containers/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const { login, logout, token, userId } = useAuth();
  const { products, addProduct, removeProduct, deleteProduct, deleteAll, totalPrice, setAmount } = useCart();
  const { category, search, handleCategory, handleSearch } = useCategoryAndSearch ();
  const isAuthenticated = !!token;

  return (
    <Context.Provider value={{
      login, logout, token, userId, isAuthenticated, 
      products, addProduct, removeProduct, deleteProduct,
      deleteAll, totalPrice, setAmount
    }}>
      <CategoryAndSearchContext.Provider value={{
        category, search, handleCategory, handleSearch
      }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar isAuthenticated={isAuthenticated} />
            <div className='main' >
              { getRoutes(isAuthenticated) }
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </CategoryAndSearchContext.Provider>
    </Context.Provider>
  );
}

export default App;
