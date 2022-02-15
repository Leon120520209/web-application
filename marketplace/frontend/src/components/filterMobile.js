import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import EachFilter from './filterDetailMobile';

const useStyles = makeStyles((theme) => ({
    drawer: {
      zIndex: theme.zIndex.drawer + 2,
      width: '100%',
      height: '100%',
      flexShrink: 0,
    },
    drawerPaper: {
      zIndex: theme.zIndex.drawer + 2,
      width: '100%',
      height: '100%',
    },
    drawerHeader: {
      zIndex: theme.zIndex.drawer + 2,
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    title: {
      position: 'absolute',
      left: 20,
    },
    applyButton: {
      position: 'absolute',
      bottom: 10,
      left: 150,
    },
}));
let allSelectedFilters = []; // pass to children, should be gloabal
/**
 * Simple component with no state.
 * @param {object} props contains all the listing info
 * @return {object} JSX
 */
function OneListing(props) {
  const allFilters = ['price', 'listed time', 'distance'];
  // put it here because we want it update when window size changes
  // dynamic sizing is not done yet
  const classes = useStyles();
  /**
  * @param {string} arg is a string input
  */
  function apply() { // apply the whole, while chidren apply one each time
    for (let i = 0; i < allSelectedFilters.length; i++) { // push each one
      props.selectFilter(allSelectedFilters[i]); // push the arg to the back
    }
    console.log(allSelectedFilters);
    allSelectedFilters = []; // make it empty again
    // props.setFilter(arg);
    // props.selectFilter(arg); // push the arg to the back
    props.closeFilter();
  }
  /**
  *
  */
  function closeWithoutChange() {
    allSelectedFilters = []; // make it empty again
    props.closeFilter();
  }
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="bottom"
        open={props.open}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <Typography className = {classes.title} variant="h5" component="h3">
            Filter
          </Typography>
          <IconButton onClick={closeWithoutChange}>
            <CloseIcon/>
          </IconButton>
        </div>
        <Divider/>
        {allFilters.map((text) => (
          <EachFilter filterArray = {allSelectedFilters} name = {text}/>
        ))}
        <div className = {classes.applyButton}>
          <Button variant="contained" color="primary"
            aria-label="register"
            onClick = {() => apply()}>
            apply
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default OneListing;
