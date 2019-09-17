import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Cart from './components/Cart/Cart';
import Navbar from './components/layout/Navbar'
import Product from './components/Product/Product'
function App() {
  return (
  <BrowserRouter>
    <div className ="App">
      <Navbar />
      <Switch>
        <Route exact path = '/' component =  {Dashboard} />
        <Route path = '/cart' component = {Cart} /> 
        <Route path  = "/product/:id" component = {Product} />
      </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
