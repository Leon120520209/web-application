import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import OneListing from './eachListing';
import DefaultImage from './gems.png';
import SpaceImage from './space.jpg';
import AreaBeforeListing from './areaBeforeListing';

const useStyles = makeStyles((theme) => ({
  temp: {
    display: 'inline-block',
    overflow: 'scroll',
    position: 'fixed',
    top: 60,
    bottom: 0,
  },
}));

/**
 * Simple component with no state.
 * @param {object} props carray things for area before listing
 * @return {object} JSX
 */
function ListingWindow(props) {
  const classes = useStyles();
  const i1 = {price: 'FREE', title: 'FREE GEMS for subs!',
    place: 'somewhere in the world', icon: DefaultImage};
  const i2 = {price: '$10000000', title: 'Space Tour For only 10 million!',
    place: 'Earth', icon: SpaceImage};
  const allListings = [i1, i2, i1, i1, i1, i1, i1, i1, i1, i1];
  return (
    <div className = {classes.temp}>
      <AreaBeforeListing openDrawer = {props.openDrawer}
        category = {props.category}/>
      {allListings.map((each) => (
        <OneListing info = {each}/>
      ))}
    </div>
  );
}

export default ListingWindow;
