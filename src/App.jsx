import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter } from 'react-router-dom'
import GlobalRoutes from './routes'

function App() {

  return (
   <BrowserRouter>
    <GlobalRoutes/>
   </BrowserRouter>
  )
}

export default App
