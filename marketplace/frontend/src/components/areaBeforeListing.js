import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
  },
  bigButton: {
    fontSize: '26px',
  },
  inline: {
    display: 'inline-block',
  },
  filterButton: {
    backgroundColor: '#20c4f4',
    color: 'white',
    display: 'inline-block',
    position: 'absolute',
    right: 20,
  },
}));

let prevCategory = '';
/**
 * Simple component with no state.
 * @param {object} props
 * @return {object} JSX
 */
function OptionMenu(props) {
  // alert(props.username);
  const [searchName, setSearchName] = React.useState('');
  const classes = useStyles();
  /**
   * @param {object} category
   */
  const fetchingCategory = async (category) => {
    const response = await fetch('/v0/category', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${props.bearToken}`,
      }),
    });
    const allCategories = await response.json();
    for (let i = 0; i < allCategories.length; i++) {
      if (allCategories[i].name === category) {
        props.setSubs(allCategories[i].subcategories.subcategories);
      }
    }
  };
  /**
  * @param {string} username won't be ''
  */
  const fetchingUsername = async (username) => {
    console.log('..................................before cut'+username);
    const index = username.indexOf('@');
    const realUsername = username.substring(0, index);
    console.log('..................................after cut'+realUsername);
    const response = await fetch('/v0/userlisting?username=' + realUsername, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${props.bearToken}`,
      }),
    });
    const out = await response.json();
    if (Array.isArray(out)) {
      props.updateListing(out);
    } else {
      props.updateListing([]);
    }
  };
  /**
  * @param {string} text
  */
  function selectSub(text) {
    props.setSub(text);
    props.setReload(true);
  }
  /**
  * @param {string} value
  */
  function assignValue(value) {
    setSearchName(value);
  }
  /**
  *
  */
  function apply() {
    props.setSearching(searchName);
    props.setCategory(''); // cancel the category
    props.setSub(''); // cancel the sub
    props.setReload(true); // should reload
  }
  if (props.category === '') {
    prevCategory = '';
    return (
      <div className = {classes.root}>
        <div className = {classes.inline}>
          <Button variant="outlined" color="primary" data-testid="area1"
            onClick = {() => fetchingUsername(props.username)} aria-label="p">
            P
          </Button>
          <Button variant="outlined" color="primary" data-testid="area2"
            onClick = {() => props.setPostOpen(true)} aria-label="post">
            Post
          </Button>
          {props.isDesktop ? (
            <span> </span>
          ) : (
            <Button variant="outlined"
              color="primary"
              data-testid="area3"
              aria-label="category"
              onClick = {props.openDrawer}>
              All Categories
            </Button>
          )}
        </div>
        <div className = {classes.inline}>
          <TextField id="search" label="Search Item"
            inputProps={{'data-testid': 'area4'}} aria-label="searchBox"
            onChange={(event) => assignValue(event.target.value)}/>
          <Button variant="outlined" color="primary" data-testid="area5"
            onClick = {apply} aria-label="search">
            search
          </Button>
        </div>
        <Divider />
        <div className = {classes.inline}>
          <Typography gutterBottom variant="h7" component="h3"
            className = {classes.inline}>
            today's pick
          </Typography>
        </div>
      </div>
    );
  } else if (props.sub === '') { // has selection, but no sub
    // const subs = ['sub1', 'sub2', 'sub3'];
    if (prevCategory !== props.category) {
      fetchingCategory(props.category);
      prevCategory = props.category;
    }
    return (
      <div className = {classes.root}>
        <Typography variant="body2" color="textSecondary" component="p">
          {'marketplace > ' + props.category}
        </Typography>
        <div>
          <Button size="large" className = {classes.bigButton}
            onClick = {props.openDrawer}
            data-testid="area7" aria-label = "category">
            {props.category}
          </Button>
        </div>
        <div className = {classes.inline}>
          {props.subs.map((text) => (
            <Button size="small" variant="outlined" color="primary"
              onClick = {() => selectSub(text)} data-testid={'sub' + text}
              aria-label = {'sub' + text}>
              {text}
            </Button>
          ))}
        </div>
        <div className = {classes.inline}>
          <TextField id="search" label="Search Item"
            inputProps={{'data-testid': 'area8'}}
            aria-label = "searchBox"
            onChange={(event) => assignValue(event.target.value)}/>
          <Button variant="outlined" color="primary"
            onClick = {apply} data-testid="area9" aria-label = "search">
            search
          </Button>
        </div>
        <Divider />
        <div className = {classes.inline}>
          <Typography gutterBottom variant="h7" component="h3"
            className = {classes.inline}>
            in Categoies
          </Typography>
        </div>
      </div>
    );
  } else {
    return (
      <div className = {classes.root}>
        <Typography variant="body2" color="textSecondary" component="p">
          {'marketplace > ' + props.category + ' > ' + props.sub}
        </Typography>
        <div>
          <Button size="large" className = {classes.bigButton}
            onClick = {props.openDrawer} data-testid="area"
            aria-label = "category">
            {props.category}
          </Button>
        </div>
        <div className = {classes.inline}>
          <TextField id="search" label="Search Item"
            inputProps={{'data-testid': 'area12'}}
            aria-label = "searchBox"
            onChange={(event) => assignValue(event.target.value)}/>
          <Button variant="outlined" color="primary"
            onClick = {apply} data-testid="area" aria-label = "search">
            search
          </Button>
        </div>
        <Divider />
        <div className = {classes.inline}>
          <Typography gutterBottom variant="h7" component="h3"
            className = {classes.inline}>
            in Subcategoies
          </Typography>
        </div>
      </div>
    );
  }
}

export default OptionMenu;
