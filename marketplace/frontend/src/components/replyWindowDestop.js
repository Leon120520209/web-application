import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import NavigationIcon from '@material-ui/icons/Navigation';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#e7f5ff',
    position: 'fixed',
    top: '50%',
    bottom: 0,
    left: '20%',
    right: 0,
  },
  header: {
    backgroundColor: '#67beff',
    position: 'absolute',
    left: 0,
    right: 0,
    height: '12%',
  },
  title: {
    position: 'absolute',
    top: '5%',
    left: '1%',
  },
  closeButton: {
    position: 'absolute',
    right: '1%',
  },
  replies: {
    backgroundColor: '#e7f5ff',
    overflow: 'scroll',
    position: 'absolute',
    top: '12%',
    left: 0,
    right: 0,
    bottom: '30%',
  },
  inputBox: {
    position: 'absolute',
    top: '70%',
    left: 0,
    right: '12%',
    bottom: 0,
  },
  sendButton: {
    backgroundColor: '#edffeb',
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: '12%',
    height: '30%',
    top: '70%',
  },
  sendIcon: {
    color: 'green',
    width: '80%',
    height: '80%',
  },
}));

/**
 * Simple component with no state.
 * @param {object} props -> replys, open
 * @return {object} JSX
 */
function ReplyWindowDesktop(props) {
  const classes = useStyles();
  const [currentReply, setCurrentReply] = React.useState('');
  const index = props.username.indexOf('@');
  const username = props.username.substring(0, index);
  /**
  * @param {string} text
  */
  function assignText(text) {
    setCurrentReply(text);
  }
  return (
    <div>
      <Paper className={classes.root} elevation={3}>
        <Paper className={classes.header}>
          <Typography variant="h5" component="h3" className={classes.title}>
            Replies to: {props.title}
          </Typography>
          <IconButton onClick={props.closeReplies}
            data-testid="reply close"
            className = {classes.closeButton}>
            <CloseIcon/>
          </IconButton>
        </Paper>
        <div className = {classes.replies}>
          {props.allReplies.map((oneReply) => (
            <Typography variant="h5" component="h3">
              {oneReply.username + ': ' + oneReply.content}
            </Typography>
          ))}
        </div>
        <TextField
          inputProps={{'data-testid': 'reply input'}}
          id="reply entry" className = {classes.inputBox}
          label="reply to the item"
          multiline
          rows = {4}
          variant="outlined"
          onChange={(event) => assignText(event.target.value)}
        />
        <IconButton
          data-testid="send button"
          onClick={() =>
            props.updateReplies({'username': username, 'content':
            currentReply})}
          className = {classes.sendButton}>
          <NavigationIcon className = {classes.sendIcon}/>
        </IconButton>
      </Paper>
    </div>
  );
}
export default ReplyWindowDesktop;
