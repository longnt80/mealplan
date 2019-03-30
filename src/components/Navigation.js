import React, { Component } from 'react';
import SignedInLinks from './SignedInLinks';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => {
  console.log(theme);
  return ({
    menuButton: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      menuButton: {
        display: 'block',
        zIndex: 2,
      },
      navWrapper: {
        display: 'none',

        '&.open': {
          display: 'block',
          zIndex: 1,
        },

        '& .navInnerWrapper': {
          position: 'fixed',
          backgroundColor: theme.palette.primary.main,
          height: '100%',
          right: '0',
          top: '0',

          '& .nav': {
            padding: theme.spacing.unit * 2,
            display: 'flex',
            flexDirection: 'column',
          }
        },
      },
    }
  })
};

class Navigation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
    this.menuRef = React.createRef();
  }

  toggleMenuState = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  componentDidMount() {
    const { offsetTop } = this.props;
    console.log(this.menuRef.current.style);
    this.menuRef.current.style.paddingTop = offsetTop + "px";
  }

  componentDidUpdate(prevProps) {
    if (this.props.offsetTop !== prevProps.offsetTop) {
      this.menuRef.current.style.paddingTop = this.props.offsetTop + "px";
    }
  }

  render() {
    const { classes, isAuthenticated } = this.props;
    const dynamicClass = this.state.isOpen ? "open" : "";

    return (
      <React.Fragment>
        <IconButton
          disableRipple
          onClick={this.toggleMenuState}
          className={classes.menuButton}
          color="inherit"
          aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <div className={[classes.navWrapper, dynamicClass].join(' ')}>
          <div ref={this.menuRef} className="navInnerWrapper">
            <div className="nav">
              {isAuthenticated && <SignedInLinks toggleMenuState={this.toggleMenuState} />}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Navigation);
