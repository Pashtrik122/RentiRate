import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './elements/Home';
import Create from './elements/Create';
import Edit from './elements/Edit';
import Read from './elements/Read';
import Login from './login';
import HomeProduct from './elementsProducts/HomeProducts';
import CreateProduct from './elementsProducts/CreateProducts';
import ReadProduct from './elementsProducts/ReadProducts';
import EditProduct from './elementsProducts/EditProducts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element = {<Login />}/>
        <Route path='/' element = {<Home />} />
        <Route path='/create' element = {<Create />} />
        <Route path='/edit/:id' element = {<Edit />} />
        <Route path='/read/:id' element = {<Read />} />
        <Route path='/homeProducts' element={<HomeProduct />} />
        <Route path='/createProducts' element={<CreateProduct />} />
        <Route path='/readProducts' element={<ReadProduct />} />
        <Route path='/EditProducts' element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
