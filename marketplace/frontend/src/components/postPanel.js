import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

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
/**
 * Simple component with no state.
 * @param {object} props contains all the listing info
 * @return {object} JSX
 */
function OneListing(props) {
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subcategory, setSubcategory] = React.useState('');
  const classes = useStyles();
  /**
  *
  */
  const fetchPost = async () => {
    const newListing = [{}];
    /* {
        'name': 'the new object',
        'price': '$9999.99',
        'longitude': '10.0',
        'latitude': '10.0',
        'img_url': 'none',
        'category': 'Entertainment',
        'create_user': 'no one',
        'create_time': '2021-12-02T05:12:27.676Z',
        'replies': 'nothing',
      },
    ];*/
    newListing[0].name = name;
    newListing[0].price = '$' + price.toString();
    newListing[0].category = category;
    newListing[0].subcategory = subcategory;
    newListing[0].longitude = '10.0';
    newListing[0].latitude = '10.0';
    newListing[0].img_url = 'https://images.pexels.com/photos/20787/pexels-photo.jpg?auto='+
    'compress&cs=tinysrgb&h=350';
    if (props.username) {
      const index = props.username.indexOf('@');
      const realUsername = props.username.substring(0, index);
      newListing[0].create_user = realUsername;
    } else {
      newListing[0].create_user = 'visiter';
    }
    newListing[0].create_time = '2020-12-17T01:24:23Z';
    newListing[0].replies = 'something';
    await fetch('/v0/listing', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${props.bearToken}`,
        'Accept': 'application/json, text/plain',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(newListing),
    });
    if (props.bearToken === '') {
      alert('You have to Login');
    }
    // const out = await response.json();
  };
  /**
  *
  */
  function post() {
    fetchPost();
    props.setPostOpen(false);
  }
  /**
  * @param {string} value
  */
  function assignName(value) {
    setName(value);
  }
  /**
  * @param {string} value
  */
  function assignPrice(value) {
    setPrice(value);
  }
  /**
  * @param {string} value
  */
  function assignCategory(value) {
    setCategory(value);
  }
  /**
  * @param {string} value
  */
  function assignSubcategory(value) {
    setSubcategory(value);
  }
  /**
  *
  */
  function closeWithoutChange() {
    props.setPostOpen(false); // turn it off
  }
  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="bottom"
        open={props.postOpen}
        classes={{
          paper: classes.drawerPaper,
        }}>
        <div className={classes.drawerHeader}>
          <Typography className = {classes.title} variant="h5" component="h3">
            Post a Item
          </Typography>
          <IconButton onClick={closeWithoutChange}
            data-testid="post close">
            <CloseIcon/>
          </IconButton>
        </div>
        <Divider/>
        <div>
          <Typography className={classes.heading}>Name:</Typography>
          <TextField id="name"
            aria-label = "listingName" inputProps={{'data-testid': 'post1'}}
            onChange={(event) => assignName(event.target.value)}
            label="name" variant="outlined" className = {classes.inline}/>
          <Typography className={classes.heading}>Price:</Typography>
          <TextField id="price"
            aria-label = "listingPrice" inputProps={{'data-testid': 'post2'}}
            onChange={(event) => assignPrice(event.target.value)}
            label="price" variant="outlined" className = {classes.inline}/>
          <Typography className={classes.heading}>Category:</Typography>
          <TextField id="category"
            aria-label = "listingCategory" inputProps={{'data-testid': 'post3'}}
            onChange={(event) => assignCategory(event.target.value)}
            label="category" variant="outlined" className = {classes.inline}/>
          <Typography className={classes.heading}>Subcategory:</Typography>
          <TextField id="subcategory"
            aria-label = "listingSubCategory"
            inputProps={{'data-testid': 'post4'}}
            onChange={(event) => assignSubcategory(event.target.value)}
            label="subcategory" variant="outlined"
            className = {classes.inline}/>
        </div>
        <div className = {classes.applyButton}>
          <Button variant="contained" color="primary"
            aria-label="postListing"
            data-testid="post"
            onClick = {() => post()}>
            POST
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

export default OneListing;
