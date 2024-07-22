import React from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import AuthenticationForm from './Components/authenticate/AuthenticationForm'
import { Route, Routes } from 'react-router-dom';
import ProductCalculator from './Components/product-calculator/ProductCalculator';
import NotFoundPage from './Components/NotFoundPage';

function App() {
  const BaseUrl = ' http://localhost:3030/jsonstore'
   

  return (
    <>
    <Routes>
      <Route path='/authentication' element={<AuthenticationForm url={BaseUrl}/>}/>
      <Route path='/*' element={<ProductCalculator/>}/>
       
 


    </Routes>
       
    </>
  )
}

export default App
