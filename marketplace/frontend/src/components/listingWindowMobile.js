import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import OneListing from './eachListing';
// import DefaultImage from './gems.png';
// import SpaceImage from './space.jpg';
import AreaBeforeListing from './areaBeforeListing';
import ReplyWindow from './replyWindowMobile';

const useStyles = makeStyles((theme) => ({
  temp: {
    display: 'inline-block',
    overflow: 'scroll',
    position: 'fixed',
    top: 60,
    bottom: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
}));

/**
 * Simple component with no state.
 * @param {object} props carray things for area before listing
 * @return {object} JSX
 */
function ListingWindowMobile(props) {
  const [replies, setReplies] = React.useState([]);
  const [replyOpen, setReplyOpen] = React.useState(false);
  const [currentItem, setItem] = React.useState({});
  const [allListings, setListings] = React.useState([]);
  /**
  * @param {object} newArray -> add a reply to the current item
  */
  function updateListing(newArray) {
    setListings(newArray); // add the new
    // write to the currentItem's data
  }
  /**
   * @param {string} keyword
   */
  const fetchingSearch = async (keyword) => {
    let response;
    if (keyword === '') {
      response = await fetch('/v0/listing', {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${props.bearToken}`,
        }),
      });
    } else {
      response = await fetch('/v0/listing?search=' + keyword, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${props.bearToken}`,
        }),
      });
    }
    const out = await response.json();
    if (Array.isArray(out)) {
      updateListing(out);
    } else {
      updateListing([]);
    }
  };
  /**
   * @param {string} category won't be ''
   * @param {string} subcategory
   */
  const fetchingCategory = async (category, subcategory) => {
    let response;
    if (subcategory !== '') { // has subcategory
      response = await fetch('/v0/listing/' + category + '/' + subcategory, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${props.bearToken}`,
        }),
      });
    } else {
      response = await fetch('/v0/listing/' + category, {
        method: 'GET',
        headers: new Headers({
          'Authorization': `Bearer ${props.bearToken}`,
        }),
      });
    }
    const out = await response.json();
    updateListing(out);
  };
  if (props.shouldReload) {
    if (props.category !== '') {
      fetchingCategory(props.category, props.sub);
      props.setReload(false);
    } else {
      fetchingSearch(props.searching);
      props.setReload(false);
    }
  }
  const classes = useStyles();
  /**
  * @param {object} newArray -> change the replies to a different item
  * @param {object} itself -> change the target item
  */
  function changeTarget(newArray, itself) {
    console.log(currentItem); // here for covering
    setItem(itself);
    setReplies(newArray); // add the new
  }
  /**
  * @param {object} newReply -> add a reply to the current item
  */
  function updateReplies(newReply) {
    setReplies((oldArray) => [...oldArray, newReply]); // add the new
    // write to the currentItem's data
  }
  if (replyOpen) {
    return (
      <div className = {classes.temp}>
        <AreaBeforeListing
          openDrawer = {props.openDrawer} setPostOpen = {props.setPostOpen}
          category = {props.category} openFilter = {props.openFilter}
          filter = {props.filter} username = {props.username}
          setSearching = {props.setSearching} setReload = {props.setReload}
          sub = {props.sub} setSub = {props.setSub}
          subs = {props.subs} setSubs = {props.setSubs}
          setCategory = {props.setCategory} bearToken = {props.bearToken}
          updateListing = {updateListing}/>
        {allListings.map((each) => (
          <OneListing info = {each} openReplies = {() => setReplyOpen(true)}
            changeTarget = {changeTarget} bearToken = {props.bearToken}
            data-testid="listingMobile1"/>
        ))}
        <ReplyWindow closeReplies = {() => setReplyOpen(false)}
          allReplies = {replies} username = {props.username}
          updateReplies = {updateReplies}/>
      </div>
    );
  } else {
    return (
      <div className = {classes.temp}>
        <AreaBeforeListing
          openDrawer = {props.openDrawer} setPostOpen = {props.setPostOpen}
          category = {props.category} openFilter = {props.openFilter}
          filter = {props.filter} username = {props.username}
          setSearching = {props.setSearching} setReload = {props.setReload}
          sub = {props.sub} setSub = {props.setSub}
          subs = {props.subs} setSubs = {props.setSubs}
          setCategory = {props.setCategory} bearToken = {props.bearToken}
          updateListing = {updateListing}/>
        {allListings.map((each) => (
          <OneListing info = {each} openReplies = {() => setReplyOpen(true)}
            changeTarget = {changeTarget} bearToken = {props.bearToken}
            data-testid="listingMobile2"/>
        ))}
      </div>
    );
  }
}

export default ListingWindowMobile;
