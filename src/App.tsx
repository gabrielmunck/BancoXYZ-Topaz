import React from 'react';
import { BancoProvider } from './contexts/BancoContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginScreen from './pages/LoginScreen';
import Home from './pages/Home';
import TransferList from './pages/TransferList';
import NewTransfer from './pages/NewTransfer';

const App = () => {
  return (
    <BancoProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          
          
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          
          <Route
            path="/transferlist"
            element={
              <ProtectedRoute>
                <TransferList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newtransfer"
            element={
              <ProtectedRoute>
                <NewTransfer />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </BancoProvider>
  );
};

export default App;