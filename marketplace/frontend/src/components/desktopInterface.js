import React from 'react';
import Layout from './desktopLayout';
import LoginPage from './loginPage';

/**
 * Simple component with no state.
 * @param {object} props
 * @return {object} JSX
 */
function DesktopInterface(props) { // pages control provider
  const [loginPage, setLoginPage] = React.useState(false);
  // later pass the setLoginPage to the component so they can call it
  if (false) {
    setLoginPage(false);
  }
  if (!loginPage) {
    return (
      <Layout loginClick = {() => setLoginPage(true)}
        screenWidth = {props.screenWidth}/>
    );
  } else {
    return (
      <LoginPage loginClick = {() => setLoginPage(false)}/>
    );
  }
}

export default DesktopInterface;
