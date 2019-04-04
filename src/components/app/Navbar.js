import React from 'react';
import { objectOf, string } from 'prop-types';
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
    classes: objectOf(string),
  };

  static defaultProps = {
    classes: {},
  }

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
    const { classes } = this.props;
    const { navbarHeight } = this.state;

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
              <Navigation offsetTop={navbarHeight} />
            </Toolbar>
          </AppBar>
        </RootRef>
      </div>
    );
  }
}

export default connect(
  state => ({ appStatus: state.app })
)(withStyles(styles)(Navbar));
