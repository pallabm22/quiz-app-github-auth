import React from 'react'
import { Quiz } from './Componenets/Quiz/Quiz'
import Header from './Componenets/Quiz/Header'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Header/>}></Route>
        <Route path='/quiz' element={<Quiz/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;