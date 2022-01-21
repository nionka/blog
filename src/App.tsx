import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.scss';
import MainPage from './components/pages/MainPage/MainPage';
import Authorization from './components/auth/Authorization';
import Registration from './components/auth/Registration';
import ArticlePage from './components/pages/ArticlePage/ArticlePage';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import LogOut from './components/common/LogOut/LogOut';

function App() {
  return (
    <Router>
      <Header />
      <main className="main">
        <Switch>
          <Route path='/authorization' component={Authorization} />
          <Route path='/registration' component={Registration} />
          <Route path='/logout' component={LogOut} />
          <Route path='/blog/:id' component={ArticlePage}/>
          <Route path='/' component={MainPage} />
        </Switch> 
      </main>
      <Footer />
    </Router>
  );
}

export default App;
