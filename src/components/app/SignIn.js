/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { func, any, objectOf, bool, string } from 'prop-types';
import { connect } from 'react-redux';
import { withFormik } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import * as appActions from './actions/appActions';

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
  static propTypes = {
    appStatus: objectOf(any).isRequired,
    requestSignIn: func.isRequired,
    requestSignUp: func.isRequired,
    resetErrorMessage: func.isRequired,
    classes: objectOf(string),
    values: objectOf(string),
    isSubmitting: bool,
    setSubmitting: func,
    handleChange: func,
    handleBlur: func,
    resetForm: func,
  }

  static defaultProps = {
    classes: {},
    values: {},
    isSubmitting: false,
    setSubmitting: () => {},
    handleChange: () => {},
    handleBlur: () => {},
    resetForm: () => {},
  }

  state = {
    isSignUp: false
  }

  componentWillUnmount() {
    const { resetErrorMessage } = this.props;
    resetErrorMessage();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { isSignUp } = this.state;
    const {
      setSubmitting,
      values,
      requestSignIn,
      requestSignUp,
    } = this.props;
    const { email, password } = values;

    setSubmitting(true);

    if (!isSignUp) {
      requestSignIn(email, password)
        .then(() => {
          setSubmitting(false);
        })
    } else {
      requestSignUp(email, password)
        .then(() => {
          setSubmitting(false);
        });
    }
  }

  handleClick = e => {
    const { resetForm, resetErrorMessage } = this.props;
    e.preventDefault();

    resetForm();
    resetErrorMessage();
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
      appStatus,
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
          {appStatus.error !== null && (
            <Paper className={classes.error} elevation={0}>
              <Typography color="inherit" variant="subtitle1">
                {appStatus.error}
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
  mapPropsToValues: () => {
    return {
      email: "",
      password: "",
    };
  },
  enableReinitialize: true,
})(withStyles(styles)(TheForm));

const mapStateToProps = state => ({
  // auth: state.auth,
  appStatus: state.appStatus,
});

const mapDispatchToProps = dispatch => {
  const {
    requestSignIn,
    requestSignUp,
    resetErrorMessage,
  } = appActions;

  return ({
    requestSignIn: (email, password) => dispatch(requestSignIn(email, password)),
    requestSignUp: (email, password) => dispatch(requestSignUp(email, password)),
    resetErrorMessage: () => dispatch(resetErrorMessage()),
  })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
