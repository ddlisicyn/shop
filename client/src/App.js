import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { getRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { useCart } from './hooks/useCart';
import { Context, UserCartContext } from './context/Context';
import { Navbar } from './containers/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const { login, logout, token, userId } = useAuth();
  const { products, addProduct, removeProduct, deleteProduct, deleteAll } = useCart();
  const isAuthenticated = !!token;

  return (
    <Context.Provider value={{
      login, logout, token, userId, isAuthenticated
    }}>
      <UserCartContext.Provider value={{
        products, addProduct, removeProduct, deleteProduct,
        deleteAll
      }}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Navbar isAuthenticated={isAuthenticated} />
            <div className='main' >
              { getRoutes(isAuthenticated) }
            </div>
          </BrowserRouter>
        </QueryClientProvider>
      </UserCartContext.Provider>
    </Context.Provider>
  );
}

export default App;
