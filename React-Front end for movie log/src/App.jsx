import './App.css'
import Home from './Pages/Home';
import Favorates from './Pages/Favorates';
import Navbar from './Components/NavBar';
import Login from './Pages/Login';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom'
import { MovieProvider } from './contexts/Moviecontext';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('access');
  
  if (!token) {
    return <Navigate to="/login" />
  }
  
  return children;
}

function Layout() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <main>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path='/favorates' element={
          <ProtectedRoute>
            <Favorates />
          </ProtectedRoute>
        } />
      </Routes>
    </main>
  )
}

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </MovieProvider>
  )
}

export default App