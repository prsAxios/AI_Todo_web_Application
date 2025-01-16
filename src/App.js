import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/DashBoard';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './pages/ProtectedRoute';
import { ThemeProvider } from './ThemeContext';
import UserProfile from './pages/UserProfile';
import 'font-awesome/css/font-awesome.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';



function App() {


  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path='/profile' element={<UserProfile/>}/>
          </Routes>
        </div>
      </Router>
      </ThemeProvider>
  );
}

export default App;
