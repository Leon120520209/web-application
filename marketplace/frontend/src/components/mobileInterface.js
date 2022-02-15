import React from 'react';
import Layout from './mobileLayout';
import LoginPage from './loginPage';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

/**
 * Simple component with no state.
 * @param {object} props
 * @return {object} JSX
 */
function MobileInterface(props) { // pages control provider
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Layout username = {props.currentUser}
            logOut = {() => props.setUser('')}
            shouldReload = {props.shouldReload} setReload = {props.setReload}
            searching = {props.searching} setSearching = {props.setSearching}
            category = {props.category} setCategory = {props.setCategory}
            sub = {props.sub} setSub = {props.setSub}
            subs = {props.subs} setSubs = {props.setSubs}
            postOpen = {props.postOpen} setPostOpen = {props.setPostOpen}
            bearToken = {props.bearToken}
            shouldReloadCate = {props.shouldReloadCate}
            setReloadCate = {props.setReloadCate}/>
        </Route>
        <Route path="/login">
          <LoginPage loginUser = {props.setUser} username = {props.currentUser}
            bearToken = {props.bearToken} setToken = {props.setToken}
            setReload = {props.setReload}
            setReloadCate = {props.setReloadCate}/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default MobileInterface;
