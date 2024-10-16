import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar/Sidebar';
import './App.css'; // Import your styles here
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define the route for Sidebar */}
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path="/Sidebar" element={<Sidebar />} />
        <Route path='/sign-up' element={<SignUp/>}/>
      </Routes>
    </Router>
  );
}

export default App;
