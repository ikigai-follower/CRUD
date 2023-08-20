import Login from './Components/Login';
import ProductDashboard from './ProductsComponents/ProductDashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddProduct from './ProductsComponents/AddProduct';
import UserDetails from './ProductsComponents/UserDetails';
import ProductList from './ProductsComponents/ProductList';
import SignUp from './Components/SignUp'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path='/' element={<SignUp />} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/AddProduct' element={<AddProduct/>} />
        <Route path='/ProductList' element={<ProductList/>} />
        <Route path='/UserDetails' element={<UserDetails/>} />
        <Route path='/ProductDashboard' element={<ProductDashboard/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
