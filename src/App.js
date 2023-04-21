import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Protected from './components/Protected';
import Spinner from './components/Spinner';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import ProductInfo from './pages/ProductInfo';

function App() {
  const { loading } = useSelector(state => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <Router>
        <Routes>

          <Route path='/' element={
            <Protected>
              <Home />
            </Protected>
          } />
          <Route path='/profile' element={
            <Protected>
              <Profile />
            </Protected>
          } />
          <Route path='/admin' element={
            <Protected>
              <Admin />
            </Protected>
          } />
          <Route path='/product/:id' element={
            <Protected>
              <ProductInfo />
            </Protected>
          } />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

        </Routes>
      </Router>

    </div>
  );
}

export default App;
