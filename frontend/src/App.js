import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Creator from './views/creator/Creator';
import Feed from './views/feed/Feed';
import Home from './views/home/Home';
import Login from './views/login/Login';
import Post from './views/post/Post';
import Register from './views/register/Register';
import User from './views/user/User';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/creator">
          <Creator />
        </Route>
        <Route path="/feed">
          <Feed />
        </Route>
        <Route path="/post">
          <Post />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
