import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'inline-block',
  },
}));

/*
refered as text field in material ui
*/

/**
 * Simple component with no state.
 * @param {object} props holds the function to login
 * @return {object} JSX
 */
function LoginPage(props) {
  const classes = useStyles();
  const [register, setRegister] = React.useState(false);
  const [user, setUser] = React.useState({email: '', password: ''});
  const history = useHistory();
  /**
  * @param {string} event is a string input
  */
  const handleInputChange = (event) => {
    const {value, name} = event.target;
    const u = user;
    u[name] = value;
    setUser(u);
  };
  /**
  * @param {string} event is a string input
  */
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    fetch('/authenticate', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((json) => {
        localStorage.setItem('user', JSON.stringify(json));
        props.loginUser(user.email);
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', user.email);
        props.setToken(json.accessToken);
        props.setReloadCate(true);
        props.setReload(true);
        history.push('/');
      })
      .catch((err) => {
        console.log(err);
        alert('Error logging in, please try again');
      });
  };

  /**
  *
  */
  function cancelLogin() {
    history.push('/');
    props.setReloadCate(true);
    props.setReload(true);
  }

  if (!register) {
    return (
      <form onSubmit={onSubmit}>
        <h2 id='welcome'>Login in to your account</h2>
        <input
          type="email"
          name="email"
          data-testid="login1"
          placeholder="EMail"
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          data-testid="loginPass1"
          placeholder="Password"
          onChange={handleInputChange}
          required
        />
        <input type="submit" value="Submit" data-testid="login2"/>
        <button onClick = {cancelLogin} data-testid="login3">
          cancel
        </button>
        <div>
          <button onClick = {() => setRegister(true)} data-testid="login4">
            register
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <div className={classes.root}>
        <div>
          <Typography variant="h6" noWrap>
            Your New Username
          </Typography>
          <TextField id="outlined-basic"
            inputProps={{'data-testid': 'new user'}}
            label="Your Username" variant="outlined" />
        </div>
        <div>
          <Typography variant="h6" noWrap>
            New Password
          </Typography>
          <TextField id="outlined-basic"
            inputProps={{'data-testid': 'new password'}}
            label="Your Password" variant="outlined" />
        </div>
        <div>
          <Button variant="contained" color="primary"
            aria-label="register"
            data-testid="login5"
            onClick = {props.loginClick}
            className={classes.buttons}>
              register
          </Button>
          <Button variant="contained" color="primary"
            aria-label="cancel"
            data-testid="login6"
            onClick = {() => setRegister(false)}
            className={classes.buttons}>
              Cancel
          </Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;
