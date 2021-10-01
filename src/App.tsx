import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import MainPage from './components/MainPage/MainPage';
import Authorization from './components/auth/Authorization';
import Registration from './components/auth/Registration';
import Blog from './components/Blog/Blog';
import Header from './components/header/Header';
import Footer from './Footer/Footer';

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Switch>
          <Route path='/authorization' component={Authorization} />
          <Route path='/registration' component={Registration} />
          <Route path='/blog/:id' component={Blog}/>
          <Route path='/' component={MainPage} />
        </Switch> 
      </main>
      <Footer />
    </Router>
  );
}

export default App;
