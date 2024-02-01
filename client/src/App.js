import React from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Signup from './componets/Signup';
import Login from './componets/Login';
import Profile from './componets/Profile';


function App() {
  return (
    <BrowserRouter>
          
          <Routes>
                   <Route path='/Signup' element={<Signup/>}/>
                   <Route path='/Login' element={<Login/>}/>
                   <Route path='/profile' element={<Profile/>}/>
          </Routes>

    </BrowserRouter>
  )
}

export default App