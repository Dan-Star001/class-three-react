import React, { useState } from 'react'
// import Products from './components/Products';
// import Profile from './components/Profile';  
import { Navigate, Route, Routes } from 'react-router-dom';
import Signup from './page/Signup';
import Signin from './page/Signin';
import Dashboard from './page/Dashboard';


const App = () => {
  // const [myAge, setmyAge] = useState(25);
  // const increaseAge = () => {
  //   setmyAge(myAge + 1)
  //   console.log(myAge);
      
  // }  

  let token = localStorage.token
  return (
    <>
      {/* <Products/> */}
      {/* <button onClick={increaseAge}>Increase Age</button> */}
      {/* <Profile/> */}
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/dashboard' element={token?<Dashboard/>:<Navigate to="/signin"/>} />      
      </Routes>
    </>
  )
}

// Wildcard Routing
// Redirection Routing
// Programmatic routing
// Dynamic Routing

export default App

