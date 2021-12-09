import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import CreatorPage from './views/creator/CreatorPage';
import FeedPage from './views/feed/FeedPage';
import HomePage from './views/home/HomePage';
import LoginPage from './views/login/LoginPage';
import PostPage from './views/post/PostPage';
import RegisterPage from './views/register/RegisterPage';
import UserPage from './views/user/UserPage';

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
      <Route path="/creator/:commentedId">
          <CreatorPage />
        </Route>
        <Route path="/creator">
          <CreatorPage />
        </Route>
        <Route path="/feed">
          <FeedPage />
        </Route>
        <Route path="/post/:id">
          <PostPage />
        </Route>
        <Route path={["/userByName/:name","/user/:id"]}>
          <UserPage />
        </Route>  
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
