import React, { Component } from 'react';
// import { Landing } from './pages/Landing';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import {Dashboard,Error,Landing, Register} from './pages'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>Dashboard</div>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
