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
  signingIn,
  signInSuccess,
  signInFailure,
  signingUp,
  signUpSuccess,
  signUpFailure,
  resetAuthState,
} from '../store/actions/authActions';
import { globalLoading } from '../store/actions/appActions';

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

export class TheForm extends Component {
  state = {
    isSignUp: false
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { isSignUp } = this.state;
    const {
      history,
      setSubmitting,
      values,
      signingIn,
      signInSuccess,
      signInFailure,
      globalLoading,
      signingUp,
      signUpSuccess,
      signUpFailure,
    } = this.props;
    // const { isSignUp } = this.state;
    const { email, password } = values;

    setSubmitting(true);
    globalLoading(true);

    if (!isSignUp) {
      signingIn(email, password)
        .then(cred => {
          signInSuccess({ userEmail: cred.user.email });
          setSubmitting(false);
          globalLoading(false);
        })
        .catch(err => {
          signInFailure(err.message);
          setSubmitting(false);
          globalLoading(false);
        })
    } else {
      signingUp(email, password)
        .then((cred) => {
          signUpSuccess({ userEmail: cred.user.email });
          setSubmitting(false);
          globalLoading(false);
        })
        .catch(err => {
          signUpFailure(err.message);
          setSubmitting(false);
          globalLoading(false);
        })
    }
  }

  handleClick = e => {
    const { resetAuthState, resetForm } = this.props;
    e.preventDefault();

    resetAuthState();
    resetForm();
    this.setState((state) => ({
      isSignUp: !state.isSignUp
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
    const { isSignUp } = this.state;

    return (
      <form className={classes.root} onSubmit={this.handleFormSubmit}>
        <Paper className={classes.paper}>
          <Typography component="h2" variant="h5">
            {isSignUp ? "Sign Up" : "Sign In" }
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
              {isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
            <Link
              component="button"
              onClick={this.handleClick}
            >
              or
              {' '}
              {isSignUp ? 'Sign in' : 'Sign up'}
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
  signingIn: (email, password) => dispatch(signingIn(email, password)),
  signInSuccess: user => dispatch(signInSuccess(user)),
  signInFailure: error => dispatch(signInFailure(error)),
  signingUp: (email, password) => dispatch(signingUp(email, password)),
  signUpSuccess: (user) => dispatch(signUpSuccess(user)),
  signUpFailure: error => dispatch(signUpFailure(error)),
  resetAuthState: () => dispatch(resetAuthState()),
  globalLoading: (boolean) => dispatch(globalLoading(boolean)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
