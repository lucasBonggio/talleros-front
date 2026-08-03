import React, { lazy, Suspense, useState } from 'react';
import './App.css'
import RutaProtegida from './componentes/RutaProtegida';
import { Route, Routes } from 'react-router-dom'


const PaginaLogin = lazy(() => import('./paginas/PaginaLogin'));
const PaginaPrincipal = lazy(() => import('./paginas/PaginaPrincipal'));

function App() {

  return (
    <>
      <Suspense>
        <Routes>
            <Route path='/' element={<PaginaLogin />}/>
            <Route path='/inicio' element={
              <RutaProtegida>
                <PaginaPrincipal />
              </RutaProtegida>
            } />
        </Routes>
      </Suspense>
      
    </>
  )
}

export default App
