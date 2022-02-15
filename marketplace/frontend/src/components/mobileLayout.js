import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import Header from './mobileHeader';
import ListingWindow from './listingWindowMobile';
import CategoriesDrawer from './drawerMobile';
import PostPanel from './postPanel';

/**
 * Simple component with no state.
 * @param {object} props holds the function to login
 * @return {object} JSX
 */
function MobileLayout(props) { // drawer control provider
  const [drawerOpen, setDrawer] = React.useState(false);
  // const classes = useStyles();
  return (
    <div>
      <Header username = {props.username} logOut = {props.logOut}/>
      <ListingWindow openDrawer = {() => setDrawer(true)}
        category = {props.category}
        searching = {props.searching} setSearching = {props.setSearching}
        shouldReload = {props.shouldReload} setReload = {props.setReload}
        sub = {props.sub} setSub = {props.setSub}
        subs = {props.subs} setSubs = {props.setSubs}
        setCategory = {(arg) => props.setCategory(arg)}
        setPostOpen = {props.setPostOpen} bearToken = {props.bearToken}
        username = {props.username}/>
      <CategoriesDrawer open = {drawerOpen} setReload = {props.setReload}
        closeDrawer = {() => setDrawer(false)} setSub = {props.setSub}
        setCategory = {(arg) => props.setCategory(arg)}
        setSearching = {props.setSearching} bearToken = {props.bearToken}
        shouldReloadCate = {props.shouldReloadCate}
        setReloadCate = {props.setReloadCate}/>
      <PostPanel postOpen = {props.postOpen} setPostOpen = {props.setPostOpen}
        bearToken = {props.bearToken} username = {props.username}/>
    </div>
  );
}

export default MobileLayout;
