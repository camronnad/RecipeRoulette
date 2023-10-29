import React from 'react';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';

import RecipeRouLogo from './RecipeRouLogo'; // Adjust path if necessary
import Profile from './Profile'; // Adjust path if necessary

const NavigationBar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#759e3b' }} className='NavBar'>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <img src='logo.png' alt='Logo' style={{ width: '30%', height: 'auto', maxWidth: '500px'}} />
                    
                    {/* Profile Component */}
                  

                    {/* Let the logo, title, and profile take up all the left space */}
                    <Box sx={{ flexGrow: 1 }}></Box>

                    {/* Account Icon Button */}
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                    >
                          <Profile />
                    </IconButton>
                </Toolbar>
            </Container>
        </AppBar>
    );
};


export default NavigationBar;
