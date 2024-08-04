import React from 'react';
 
// import './App.css'

import AuthenticationForm from './Components/authenticate/AuthenticationForm'
import { Route, Routes } from 'react-router-dom';
import ProductCalculator from './Components/product-calculator/ProductCalculator';
import { UserProvider } from './contexts/UserProvider';

function App() {
  const BaseUsersUrl = 'http://localhost:8000/api/users/'
 

  return (
    <>


    <UserProvider>
        <Routes>
           <Route path='/authentication' element={<AuthenticationForm url={BaseUsersUrl}/>}/>

            <Route path='/*' element={<ProductCalculator/>}/>
        </Routes>
    </UserProvider>
       
    </>
  )
}

export default App
