import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Button } from "@mui/material";
import Form from "./Form";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');

    return (
        <Box>
            <Box width='100%' backgroundColor={theme.palette.background.alt} p='1rem 6%' textAlign='center'>
                <Button>
                    <Typography fontWeight='bold' fontSize='32px' color='primary' onClick={ () => navigate('/') }>Astrogram</Typography>
                </Button>
            </Box>
            <Box width={isNonMobileScreens ? '50%' : '93%'} p='2rem' m='2rem auto' textAlign='center' borderRadius='1.5rem' backgroundColor={theme.palette.background.alt}>
                <Typography fontWeight='500' variant='h5' sx={{mb: '1.5rem'}}>
                    Welcome to Astrogram! Space community for astrogramers
                </Typography>
                <Form />
            </Box>
        </Box>
    )
}

export default LoginPage;