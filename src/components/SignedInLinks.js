import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { signOut } from '../store/actions/authActions';

export const navbarLinkStyles = theme => ({
  [theme.breakpoints.up('md')]: {
    item: {
      '&:not(:first-child)': {
        marginLeft: "10px"
      }
    },
  },
  highlight: {
    color: theme.palette.secondary.dark
  }
})

const PATHS = [
  {name: "Home", to: '/'},
  {name: "Recipes", to: '/recipes'},
  {name: "Plan", to: '/plan'},
  {name: "Shopping", to: '/shopping'},
]

class SignedInLinks extends React.Component {
  static propTypes = {
    signingOut: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    toggleMenuState: PropTypes.func,
  }

  static defaultProps = {
    toggleMenuState: () => {},
  }

  renderRouterLinks = () => {
    const { classes, toggleMenuState } = this.props;
    return PATHS.map(path => (
      <Link
        onClick={toggleMenuState}
        key={path.name}
        component={RouterLink}
        className={classes.item}
        to={path.to}
        color="inherit"
        underline="none"
      >
      {path.name}
      </Link>
    ));
  }

  handleSignOutClick = () => {
    const { toggleMenuState, signingOut } = this.props;

    signingOut();
    toggleMenuState();
  }

  render() {
    const { classes, signingOut } = this.props;

    return (
      <React.Fragment>
        {this.renderRouterLinks()}

        <Link
          onClick={this.handleSignOutClick}
          className={[classes.item, classes.highlight].join(' ')}
          href="#"
          color="secondary"
          underline="none"
        >
        Sign out
        </Link>
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signingOut: () => dispatch(signOut()),
})

export default connect(
  null,
  mapDispatchToProps
)(withStyles(navbarLinkStyles)(SignedInLinks));
