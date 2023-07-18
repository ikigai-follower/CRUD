

import Login from './Components/Login';
import SignUp from './Components/Signup';
import Main from './Dasboard/Main';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Add from './Dasboard/Add';
import Getall from './Dasboard/Getall';

import Tables from './Dasboard/Table';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route exact path='/' element={<SignUp/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/Add' element={<Add/>} />
        <Route path='/Getall' element={<Getall/>} />
        <Route path='/Tables' element={<Tables/>} />
        <Route path='/Main' element={<Main/>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
