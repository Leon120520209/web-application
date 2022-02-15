import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import ScannerIcon from '@mui/icons-material/Scanner';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HikingIcon from '@mui/icons-material/Hiking';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  drawer: {
    zIndex: theme.zIndex.drawer,
    width: '20%',
    //   flexShrink: 0,
  },
  drawerPaper: {
    zIndex: theme.zIndex.drawer,
    width: '20%',
  },
  drawerHeader: {
    zIndex: theme.zIndex.drawer,
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    // position: '',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    //   justifyContent: 'flex-end',
  },
  title: {
    position: 'absolute',
    left: '10%',
    top: 70,
  },
}));

/**
 * Simple component with no state.
 * @param {object} props contains all the listing info
 * @return {object} JSX
 */
function OneListing(props) {
  // const drawerWidth = props.screenWidth;
  const classes = useStyles();
  /**
  * @param {string} arg is a string input
  */
  function clickACategory(arg) {
    props.setCategory(arg);
    props.setSub(''); // reset sub
    props.setSearching('');
    props.setReload(true);
    // props.closeDrawer();
  }
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.open}
        classes={{
          paper: classes.drawerHeader,
        }}>
        \<div className={classes.drawerHeader}>
          <Typography className={classes.title} variant="h6" component="h3">
            Categories
          </Typography>
        </div>
        <List>
          <ListItem button key="Vehicles"
            data-testid="cate1"
            onClick = {() => clickACategory('Vehicles')}>
            <ListItemIcon>
              <DirectionsCarIcon/>
            </ListItemIcon>
            <ListItemText primary="Vehicles"/>
          </ListItem>
          <ListItem button key="Apparel"
            data-testid="cate2"
            onClick = {() => clickACategory('Apparel')}>
            <ListItemIcon>
              <CheckroomIcon/>
            </ListItemIcon>
            <ListItemText primary="Apparel"/>
          </ListItem>
          <ListItem button key="Family"
            data-testid="cate3"
            onClick = {() => clickACategory('Family')}>
            <ListItemIcon>
              <FamilyRestroomIcon/>
            </ListItemIcon>
            <ListItemText primary="Family"/>
          </ListItem>
          <ListItem button key="Electronics"
            data-testid="cate4"
            onClick = {() => clickACategory('Electronics')}>
            <ListItemIcon>
              <ScannerIcon/>
            </ListItemIcon>
            <ListItemText primary="Electronics"/>
          </ListItem>
          <ListItem button key="Entertainment"
            data-testid="cate5"
            onClick = {() => clickACategory('Entertainment')}>
            <ListItemIcon>
              <SportsEsportsIcon/>
            </ListItemIcon>
            <ListItemText primary="Entertainment"/>
          </ListItem>
          <ListItem button key="Hobbies"
            data-testid="cate6"
            onClick = {() => clickACategory('Hobbies')}>
            <ListItemIcon>
              <HikingIcon/>
            </ListItemIcon>
            <ListItemText primary="Hobbies"/>
          </ListItem>
          <ListItem button key={'Reset'}
            data-testid="cate7"
            onClick = {() => clickACategory('')}>
            <ListItemIcon>
              <AddCircleIcon/>
            </ListItemIcon>
            <ListItemText primary={'Reset'} />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default OneListing;
