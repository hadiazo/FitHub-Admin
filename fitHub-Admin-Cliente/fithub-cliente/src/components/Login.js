import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import AuthService from '../services/AuthService';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="/">
        FITHUB Admin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

 class Login extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {correo: "", contrasena: ""}
    this.submitLogin = this.submitLogin.bind(this)
    this.changeLogin = this.changeLogin.bind(this)
  }

  componentDidMount(){
    Axios.get("http://localhost:8080/login")
      .then(response => console.log(response.data))
  }

  submitLogin(event){
    event.preventDefault()
    AuthService.login(this.state.correo, this.state.contrasena)
    .then(() => {
      const user = AuthService.getCurrentUser();
      if(user.Rol == "USER"){
        this.props.history.push('/welcomeUser')
      }else if(user.Rol == "ADMIN"){
        this.props.history.push('/welcomeAdmin')
      }
      
      window.location.reload();
    })   
    .catch(error => {
      if(error.response.status == 401 && error.response.data.message == "Unauthorized"){
        alert("Usuario o contraseña No Validas")
      }
    })
  }

  changeLogin(event){
    event.preventDefault()

    this.setState({
      [event.target.name] : event.target.value
    });
  }

  render(){
    const {classes} = this.props;

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <form className={classes.form} onSubmit={this.submitLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="correo"
                  label="Correo electronico"
                  name="correo"
                  value={this.state.correo}
                  onChange={this.changeLogin}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="contrasena"
                  label="Contraseña"
                  type="password"
                  id="contrasena"
                  value={this.state.contrasena}
                  onChange={this.changeLogin}
                />
              </Grid>  
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Ingresar
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/registro">
                  ¿Aun no tienes una cuenta? Registrate aqui
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
