import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import AllBlogs from './components/allBlogs/AllBlogs';
import Authorization from './components/auth/Authorization';
import Registration from './components/auth/Registration';
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path='/authtorization' component={Authorization} />
        <Route path='/registration' component={Registration} />
        <Route path='/' component={AllBlogs} />
      </Switch>
    </Router>
  );
}

export default App;
