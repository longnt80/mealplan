import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import RootRef from '@material-ui/core/RootRef';

import { debounce } from 'lodash';

import Navigation from './Navigation';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

class Navbar extends React.Component {
  static propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    auth: PropTypes.shape({
      isAuthenticated: PropTypes.bool,
      isSubmitting: PropTypes.bool,
      newUser: PropTypes.bool,
      user: PropTypes.objectOf(PropTypes.string),
      error: PropTypes.string,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.navbar = React.createRef();
    this.state = {
      navbarHeight: 0,

    }
  }

  componentDidMount() {
    this.updateHeight();

    window.addEventListener('resize', debounce(this.updateHeight, 100));
  }

  updateHeight = () => {
    const navbarHeight = this.navbar.current.offsetHeight;
    const addedPadding = window.matchMedia("(max-width: 959px)").matches ?  navbarHeight : 0;
    this.setState({
      navbarHeight: addedPadding,
    })
  }

  render() {
    const { classes, auth, isAuthenticated } = this.props;

    return (
      <div className={classes.root}>
        <RootRef rootRef={this.navbar}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <Link component={RouterLink} to="/" color="inherit" underline="none">
                  MealPlan
                </Link>
              </Typography>
              <Navigation offsetTop={this.state.navbarHeight} isAuthenticated={isAuthenticated} />
            </Toolbar>
          </AppBar>
        </RootRef>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth })
)(withStyles(styles)(Navbar));
