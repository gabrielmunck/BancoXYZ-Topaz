import { BancoProvider } from './contexts/BancoContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import LoginScreen from './pages/LoginScreen';
import Home from './pages/Home';
import TransferList from './pages/TransferList';

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
        </Routes>
      </Router>
    </BancoProvider>
  );
};

export default App;