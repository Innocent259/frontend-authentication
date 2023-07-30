import './App.css';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Signin from './components/Signin';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequireAuth from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path='/' element={<Dashboard />} />
          </Route>
          <Route path='/login' element={<Signin />} />
          <Route path='/signout' element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
