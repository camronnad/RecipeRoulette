import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
// change the link names 
const profiles = ['Home', 'Favourites', 'Preferences', 'Top Rated', 'Logout'];
const UserProfile = ({ onLogout }) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  let navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuClick = (profileOption) => {
    handleCloseUserMenu();
    if (profileOption === "Logout") {
      localStorage.removeItem('userId');
      // Clear all items from local storage
      localStorage.clear();

      onLogout();

      navigate('/LoginForm');
    }
  };

  return (
    <>
      <Tooltip title="Open profiles">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <PersonIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {profiles.map((profile) => (
          <MenuItem key={profile} onClick={() => handleMenuClick(profile)}>
            < Typography textAlign="center">

              {<Link to={`/${profile}`}
                style={{
                  textDecoration: 'none', // Remove underline
                  color: 'inherit', // Inherit text color from parent
                }}
              >{profile}
              </Link >}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserProfile;