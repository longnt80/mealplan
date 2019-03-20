/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import {
  signingInOrUp,
  signInOrUpSuccess,
  signInOrUpFailure,
  resetAuthState,
} from '../store/actions/authActions';

const styles = theme => (
  {
    root: {
    },
    textField: {
      // marginLeft: theme.spacing.unit,
      // marginRight: theme.spacing.unit
    },
    paper: {
      margin: '0 auto',
      maxWidth: '60%',
      padding: `20px ${theme.spacing.unit}px`
    },
    buttonContainer: {
      margin: '10px 0',
      textAlign: 'center',

      '& > button:first-child': {
        marginRight: theme.spacing.unit
      }
    },
    error: {
      color: theme.palette.danger.main,
      padding: theme.spacing.unit,
    }
  }
)

class TheForm extends Component {
  state = {
    isNewUser: false
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { history, setSubmitting, values, signingInOrUp, signInOrUpSuccess, signInOrUpFailure } = this.props;
    const { isNewUser } = this.state;
    const { email, password } = values;

    setSubmitting(true);
    signingInOrUp(email, password, isNewUser)
      .then(currentUser => {
        const user = {
          uid: currentUser.user.uid,
          userEmail: currentUser.user.email,
        }

        signInOrUpSuccess(user);
        setSubmitting(false);
        history.push('/');
      })
      .catch(error => {
        const errorMessage = error.message;

        signInOrUpFailure(errorMessage);
        setSubmitting(false);
      });
  }

  handleClick = e => {
    const { resetAuthState, resetForm } = this.props;
    e.preventDefault();

    resetAuthState();
    resetForm();
    this.setState((state) => ({
      isNewUser: !state.isNewUser
    }));
  }

  render() {
    const {
      classes,
      handleChange,
      handleBlur,
      values,
      isSubmitting,
      auth,
    } = this.props;
    const { isNewUser } = this.state;

    return (
      <form className={classes.root} onSubmit={this.handleFormSubmit}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h5">
            {isNewUser ? "Sign Up" : "Sign In" }
          </Typography>
          <TextField
            className={classes.textField}
            label="Email"
            name="email"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            fullWidth
            margin="normal"
          />
          {auth.error !== null && (
            <Paper className={classes.error} elevation={0}>
              <Typography color="inherit" variant="subtitle1">
                {auth.error}
              </Typography>
            </Paper>
          )}
          <Paper className={classes.buttonContainer} elevation={0}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
            >
              {isNewUser ? 'Sign up' : 'Sign in'}
            </Button>
            <Link
              component="button"
              onClick={this.handleClick}
            >
              or
              {' '}
              {isNewUser ? 'Sign up' : 'Sign in'}
            </Link>
          </Paper>
        </Paper>
      </form>
      // </Grid>
    );
  }
}

const SignIn = withFormik({
  mapPropsToValues: props => {
    return {
      email: "",
      password: "",
    };
  },
  enableReinitialize: true,
  // handleSubmit: (values, formikBag) => {
  //   console.log("Hi there");
  // }
})(withStyles(styles)(TheForm));

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => ({
  signingInOrUp: (email, password, isNewUser) => dispatch(signingInOrUp(email, password, isNewUser)),
  signInOrUpSuccess: user => dispatch(signInOrUpSuccess(user)),
  signInOrUpFailure: error => dispatch(signInOrUpFailure(error)),
  resetAuthState: () => dispatch(resetAuthState()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
