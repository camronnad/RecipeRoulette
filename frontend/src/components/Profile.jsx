import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import PersonIcon from '@mui/icons-material/Person';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { BrowserRouter, Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/StarRate';
import LogoutIcon from '@mui/icons-material/Logout';
// change the link names 
// Change the link names and add corresponding icons
const profiles = [
  { name: 'Home', icon: <HomeIcon /> },
  { name: 'Favourites', icon: <FavoriteIcon /> },
  { name: 'Top Rated', icon: <StarIcon /> },
  { name: 'Logout', icon: <LogoutIcon /> }
];

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
  <MenuItem key={profile.name} onClick={() => handleMenuClick(profile.name)}>
    <Typography textAlign="center" sx={{ display: 'flex', alignItems: 'center' }}>
      {profile.icon} {/* This will render the icon */}
      <Link to={`/${profile.name}`}
        style={{
          textDecoration: 'none', // Remove underline
          color: 'inherit', // Inherit text color from parent
          marginLeft: '10px' // Add some space between the icon and text
        }}
      >
        {profile.name}
      </Link>
    </Typography>
  </MenuItem>
))}
      </Menu>
    </>
  );
};

export default UserProfile;