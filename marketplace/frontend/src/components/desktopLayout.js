import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Header from './mobileHeader';
import ListingWindow from './listingWindowDesktop';
import CategoriesDrawer from './drawerDesktop';
import Filter from './filterMobile';
// import Drawer from '@material-ui/core/Drawer';
// import {makeStyles} from '@material-ui/core/styles';

const drawerWidth = '20%';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    appBar: {
        position: 'fixed',
        marginLeft: drawerWidth,
        zIndex: theme.zIndex.drawer + 1,
        [theme.breakpoints.up('sm')]: {
          zIndex: theme.zIndex.drawer + 1,
          marginLeft: drawerWidth,
        },
      },
    toolbar: {
        ...theme.mixins.toolbar,
        // position: 'fixed',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0),
    },
  }));

/**
 * Simple component with no state.
 * @param {object} props holds the function to login
 * @return {object} JSX
 */
function DesktopLayout(props) { // drawer control provider
  const classes = useStyles();
  const [drawerOpen, setDrawer] = React.useState(true);
  const [filterOpen, setFilter] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [filterOption, setFilterOption] = React.useState('');
  return (
    <div className={classes.root}>
      <Header loginClick = {props.loginClick}
      className={classes.appBar}/>
      <nav className={classes.drawer}>
        <CategoriesDrawer open = {drawerOpen}
        className={classes.toolbar}
        closeDrawer = {() => setDrawer(true)}
        screenWidth = {props.screenWidth}
        setCategory = {(arg) => setCategory(arg)}/>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <ListingWindow openDrawer = {() => setDrawer(true)}
          openFilter = {() => setFilter(true)}
          category = {category}
          filter = {filterOption}/>
      </main>
      <Filter open = {filterOpen}
        closeFilter = {() => setFilter(false)}
        screenWidth = {props.screenWidth}
        selectFilter = {(arg) => setFilterOption(arg)}/>
    </div>
  );
}

export default DesktopLayout;
