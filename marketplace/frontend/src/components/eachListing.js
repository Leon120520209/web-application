import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    display: 'inline-block',
    maxWidth: 220,
    minWidth: 220,
    maxHeight: 220,
    minHeight: 220,
  },
});


/**
 * Simple component with no state.
 * @param {object} props contains all the listing info
 * @return {object} JSX
 */
function OneListing(props) {
  const classes = useStyles();
  /**
  *
  */
  function getClicked() {
    props.changeTarget([{username: 'one', content: 'bluh bluh bluh'},
      {username: 'two', content: 'temp'}], props.info);
    props.openReplies();
  }
  return (
    <Card className={classes.root} button onClick = {getClicked}>
      <CardActionArea>
        {/* <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          imageUrl={props.info.img_url}
          title="Contemplative Reptile"
        /> */}
        <img
          alt="Contemplative Reptile"
          height="140"
          title="Contemplative Reptile"
          src={props.info.img_url}
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="h3">
            {props.info.price}
          </Typography>
          <Typography gutterBottom variant="h8" component="h5">
            {props.info.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.info.longitude + ', ' + props.info.latitude}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default OneListing;
