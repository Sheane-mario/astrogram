// client/src/scenes/landingPage/Navbar.jsx

import React, { useState } from "react";
import { Box, IconButton,Typography, useTheme, useMediaQuery, Button } from "@mui/material";
import { DarkMode, LightMode, Menu, Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    return (
        <FlexBetween padding='1rem 6%' backgroundColor={alt}>
            <FlexBetween gap='1.75rem'>
                <Typography 
                    fontWeight='bold' 
                    fontSize='clamp(1rem, 2rem, 2.25rem)' 
                    color='primary' 
                    onClick={() => navigate('/home')} 
                    sx={{
                        '&:hover': {
                            cursor: 'pointer',
                            color: primaryLight,
                        }
                    }}
                >
                    Astrogram
                </Typography>
            </FlexBetween>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ? (
                <FlexBetween gap='2rem'>
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'dark' ? (<DarkMode sx={{ fontSize: '25px' }}/>) : (<LightMode sx={{ fontSize: '25px' }}/>)}
                    </IconButton>
                    {/* <Message sx={{ fontSize: '25px' }}/> */}
                    <Button>
                        <Typography onClick={ () => navigate('/') }>Home</Typography>
                    </Button>
                    <Button>
                        <Typography onClick={ () => navigate('/astro-about') }>About</Typography>
                    </Button>
                    <Button>
                        <Typography onClick={ () => navigate('/user-auth') }>Sign Up</Typography>
                    </Button>
                    <Button>
                        <Typography onClick={ () => navigate('/user-auth') }>Login</Typography>
                    </Button>
                </FlexBetween>
            ) : (
                <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                    <Menu />
                </IconButton>
            )}
            {/* MOBILE NAV */}
            {!isNonMobileScreens && isMobileMenuToggled && (
                <Box 
                    position='fixed'
                    right='0'
                    bottom='0'
                    height='100%'
                    zIndex='10'
                    maxWidth='500px'
                    minWidth='300px'
                    backgroundColor={background}
                >
                    {/* CLOSE ICON */}
                    <Box display='flex' justifyContent='flex-end' p='1rem'>
                        <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close />
                        </IconButton>
                    </Box>

                    {/* MENU ITEMS */}
                    <FlexBetween display='flex' flexDirection='column' justifyContent='center' alignItems='center' gap='3rem'>
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === 'dark' ? (<DarkMode sx={{ fontSize: '25px' }}/>) : (<LightMode sx={{ fontSize: '25px' }}/>)}
                        </IconButton>
                        <Button>
                            <Typography onClick={() => navigate('/')}>Home</Typography>
                        </Button>
                        <Button>
                            <Typography onClick={() => navigate('/astro-about')}>About</Typography>
                        </Button>
                        <Button>
                            <Typography onClick={() => navigate('/user-auth')}>Sign Up</Typography>
                        </Button>
                        <Button>
                            <Typography onClick={() => navigate('/user-auth')}>Login</Typography>
                        </Button>
                    </FlexBetween>
                </Box>
                )
            }
        </FlexBetween>
    )
}

export default Navbar;