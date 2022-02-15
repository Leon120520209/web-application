import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
// import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
// import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  loginButton: {
    position: 'fixed',
    right: 10,
  },
}));
/**
 * Simple component with no state.
 * @param {object} props holds the function to login
 * @return {object} JSX
 */
function MobileHeader(props) {
  const history = useHistory();
  const classes = useStyles();
  if (props.username === '') {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              FacepalmBook
            </Typography>
            <Button variant="contained" color="primary"
              aria-label="login"
              data-testid="header1"
              onClick = {() => history.push('/login')}
              className={classes.loginButton}>
              Login
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              FacepalmBook
            </Typography>
            <Button variant="contained" color="primary"
              aria-label="loginOut"
              data-testid="header2"
              onClick = {props.logOut}
              className={classes.loginButton}>
              Log Out
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default MobileHeader;
