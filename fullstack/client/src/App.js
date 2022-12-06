import React, { Component } from 'react';
// import { Landing } from './pages/Landing';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Dashboardw, Error, Landing, Register, ProtectedLayout } from './pages'
import { Addjob, Alljob, Profile, SharedLayout, Stats } from './pages/Dashboard';
// import

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <Routes>
          <Route path="/" element={
            <ProtectedLayout>
              <SharedLayout />
            </ProtectedLayout>
          }>
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<Alljob />} />
            <Route path="add-job" element={<Addjob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
