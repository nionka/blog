import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import MainPage from './components/pages/MainPage/MainPage';
import Authorization from './components/auth/Authorization';
import Registration from './components/auth/Registration';
import ArticlePage from './components/pages/ArticlePage/ArticlePage';
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer';
import LogOut from './components/common/LogOut/LogOut';
import AppLoader from './components/hoc/AppLoader';
import UserPage from './components/pages/UserPage/UserPage';
import ArticleForm from './components/common/ArticleForm/ArticleForm';

function App() {
  return (
    <>
      <AppLoader>
        <Header />
        <main className="main">
          <Switch>
            <Route path='/authorization' component={Authorization} />
            <Route path='/registration' component={Registration} />
            <Route path='/logout' component={LogOut} />
            <Route path='/article/add' component={ArticleForm} />
            <Route path='/article/:id' component={ArticlePage}/>
            <Route path='/articles' component={MainPage} />
            <Route path='/users/:id' component={UserPage} />
            <Route path='/' exact component={MainPage} />
          </Switch>
          <ToastContainer />
        </main>
        <Footer />
      </AppLoader>
    </>
  );
}

export default App;
