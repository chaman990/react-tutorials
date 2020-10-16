import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {baseURL} from '../../src/axiosconfiguration'
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useSelector, useDispatch} from 'react-redux'
import {  LOGGED_IN } from '../redux/login/actionsTypes'
import { useState, useEffect } from 'react';

  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  function loginHandler(e,inputs ,setloginSuccess,setloginMessage,props,loginDispatch){
    e.preventDefault();
    loginDispatch({type:LOGGED_IN})
    if(inputs.email === undefined || inputs.password === undefined){
      setloginSuccess(false)
      setloginMessage('Enter email id and password')
      return;
    }

    axios.post(`${baseURL}Login.php`,{inputs})
    .then( result => {
      console.log(result.data)
      if(result.data.success){
        console.log(result.data.message)
        setloginSuccess(true);
        setloginMessage(result.data.message)
        localStorage.setItem('loggedIn',true);
        setInterval(() => {
          props.history.push('/dashboard')
        }, 2000)
       
      }else{
        console.log(result.data.message)
        setloginSuccess(false);
        setloginMessage(result.data.message)
      }
    })
    .catch(errors => {
      console.log(errors)
    })
  }


  
  function Login(props) {
    const classes = useStyles();
    const [inputs, setinputs] = useState({});
    const [loginSuccess, setloginSuccess] = useState(null)
    const [loginMessage, setloginMessage] = useState(null)
   
    console.log('this is local storage',localStorage.getItem('loggedIn'))

    
    useEffect(() => {
      if(localStorage.getItem('loggedIn')){
        setloginSuccess(true);
        const loginDispatch = useDispatch()
        loginDispatch({type:'LOGGED_IN'})
        props.history.push('/dashboard')
  
      }
    }, [loginSuccess])

  
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
              (loginSuccess === null) ? null :
                (loginSuccess) ? 
                    <div className="success-login"><CircularProgress/><Alert variant="filled"  severity="success">{loginMessage}</Alert></div>:
                    <Alert variant="filled" severity="error">{loginMessage}</Alert>
                  
          }

          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange = {(e)=> setinputs({...inputs, [e.target.name]:e.target.value})}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange = {(e)=> setinputs({...inputs ,[e.target.name]:e.target.value})}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick = {(e) => loginHandler(e, inputs, setloginSuccess,setloginMessage,props,loginDispatch)}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/forgot" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }

export default Login;