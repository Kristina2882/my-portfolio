import React from 'react';
import Header from './Header';
import PropertyControl from './PropertyControl';
import SignIn from './SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
  <Router>
 <Header/>  
 <Routes>
  <Route path='/' element={<PropertyControl/>}/>
  <Route path='/sign-in' element={<SignIn/>}/>
 </Routes>
  </Router>
  
  
  );
}

export default App;
