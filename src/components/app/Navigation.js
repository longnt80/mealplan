import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RootRef from '@material-ui/core/RootRef';
import MenuLinks from './MenuLinks';

const styles = theme => {
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
    this.menuBtnRef = React.createRef();
    this.menuRef = React.createRef();
    this.nav = React.createRef();
  }


  componentDidMount() {
    const { offsetTop } = this.props;

    this.menuRef.current.style.paddingTop = `${offsetTop  }px`;
    window.addEventListener('click', this.handleWindowClick)
  }

  componentDidUpdate(prevProps) {
    if (this.props.offsetTop !== prevProps.offsetTop) {
      this.menuRef.current.style.paddingTop = `${this.props.offsetTop}px`;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click');
  }

  toggleMenuState = () => {
    this.setState(state => ({
      isOpen: !state.isOpen,
    }));
  }

  handleWindowClick = e => {
    const { target } = e;
    const { isOpen } = this.state;
    const menuBtn = this.menuBtnRef.current;
    const nav = this.nav.current;
    if (!menuBtn.contains(target) && !nav.contains(target) && isOpen) {
      this.setState({
        isOpen: false
      });
    }
  }

  render() {
    const { classes } = this.props;
    const dynamicClass = this.state.isOpen ? "open" : "";

    return (
      <React.Fragment>
        <RootRef rootRef={this.menuBtnRef}>
          <IconButton
            disableRipple
            onClick={this.toggleMenuState}
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
        </RootRef>
        <div className={[classes.navWrapper, dynamicClass].join(' ')}>
          <div ref={this.menuRef} className="navInnerWrapper">
            <div ref={this.nav} className="nav">
              <MenuLinks toggleMenuState={this.toggleMenuState} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Navigation);
