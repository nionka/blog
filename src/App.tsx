import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import AllBlogs from './components/allBlogs/AllBlogs';
import Authorization from './components/auth/Authorization';
import Registration from './components/auth/Registration';
import Blog from './components/Blog/Blog';
import Header from './components/header/Header';

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <div className="container">
          <Switch>
            <Route path='/authorization' component={Authorization} />
            <Route path='/registration' component={Registration} />
            <Route path='/blog/:id' component={Blog}/>
            <Route path='/' component={AllBlogs} />
          </Switch>
        </div> 
      </main>
      
    </Router>
  );
}

export default App;
