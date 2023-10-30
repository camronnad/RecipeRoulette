import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Link } from 'react-router-dom';


const profiles = ['Profile', 'Liked-Recipe', 'Logout'];

const UserProfile = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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
          <MenuItem key={profile} onClick={handleCloseUserMenu}>
            < Typography textAlign="center">{<Link to={`/${profile}`}>{profile}</Link >}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserProfile;
