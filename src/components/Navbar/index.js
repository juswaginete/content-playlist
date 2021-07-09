import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';

import './index.scss';
import AuditiveNetworkLogo from '../../assets/images/InstoreX3-02-small.png';
import { ROUTES } from '../../constants';
import { userActions } from '../../redux/actions';


export default function Navbar() {
  const dispatch = useDispatch();
  const [personMenu, setPersonMenu] = useState(null);
  const isMenuOpen = Boolean(personMenu);

  const { user } = useSelector(state => state.userAuthentication);

  const handleProfileMenuOpen = (event) => {
    setPersonMenu(event.currentTarget);
  }

  const handleMenuClose = () => {
    setPersonMenu(null);
    // handleMobileMenuClose();
  };

  const handleUserLogout = (event) => {
    event.preventDefault();

    if (user) {
      dispatch(userActions.logout(user));
      setPersonMenu(null);
    }
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={personMenu}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>User Info</MenuItem>
      <MenuItem onClick={handleUserLogout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar className="appbar-header" position="static">
        <a href={ROUTES.DASHBOARD}>
          <img className="auditive-logo-img" src={AuditiveNetworkLogo} alt="Auditive Logo" />
        </a>
        <Toolbar className="app-toolbar">
          <div>
            <IconButton
              edge="end"
              aria-label="account of current user"
              // aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <PersonIcon className="icon-label-btn" />
            </IconButton>
            <IconButton edge="start" className="appbar-menu" color="inherit" aria-label="menu">
              <MenuIcon className="icon-label-btn" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </>
  )
}