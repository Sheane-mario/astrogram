// client/src/scenes/landingPage/Home.jsx

import React from "react";
import { Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import image1 from 'assets/image1.jpg'; // Replace with your actual image paths
import image2 from 'assets/image2.jpg';
import image3 from 'assets/image3.jpg';

const Home = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isNonMobileScreens = useMediaQuery('(min-width: 1000px)');
    
    return (
        <Box padding='2rem'>
            {/* Header Section */}
            <Box textAlign='center' marginBottom='2rem'>
                <Typography 
                    variant='h1' 
                    fontWeight='bold' 
                    color={theme.palette.primary.alt}
                    marginBottom='1rem'
                >
                    Welcome to Astrogram
                </Typography>
                <Typography 
                    variant='h5' 
                    color='neutral.mediumMain' 
                    marginBottom='2rem'
                >
                    Connecting space enthusiasts through the best space science community.
                </Typography>
                <Button 
                    variant='outlined' 
                    color='primary' 
                    onClick={() => navigate('/astro-about')}
                >
                    Learn More
                </Button>
            </Box>

            {/* Content Section */}
            <Box>
                {/* First Image and Description */}
                <FlexBetween 
                    flexDirection={isNonMobileScreens ? 'row' : 'column'} 
                    alignItems='center' 
                    marginBottom='2rem'
                >
                    <Box 
                        flex={1} 
                        sx={{
                            backgroundImage: `url(${image1})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            width: '100%',
                            borderRadius: '8px',
                        }}
                    />
                    <Box flex={1} p='2rem' m='0 1.5rem' borderRadius='0.5rem' maxWidth={isNonMobileScreens ? '40%' : '90%'} boxShadow={'0px 4px 20px rgba(0, 0, 0, 0.1)'} backgroundColor={theme.palette.background.alt}>
                        <Typography 
                            variant='h4' 
                            color={theme.palette.primary.alt} 
                            marginBottom='1rem'
                        >
                            Explore the Cosmos
                        </Typography>
                        <Box >
                            <Typography 
                                variant='body1' 
                                color='neutral.mediumMain'
                            >
                                Join us in exploring the mysteries of the cosmos. Our platform offers resources and community discussions about space science and exploration.
                            </Typography>
                        </Box>
                    </Box>
                </FlexBetween>

                {/* Second Image and Description */}
                <FlexBetween 
                    flexDirection={isNonMobileScreens ? 'row-reverse' : 'column'} 
                    alignItems='center' 
                    marginBottom='2rem'
                >
                    <Box 
                        flex={1} 
                        sx={{
                            backgroundImage: `url(${image2})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            width: '100%',
                            borderRadius: '8px',
                        }}
                    />
                    <Box flex={1} p='2rem' m='0 1.5rem' borderRadius='0.5rem' maxWidth={isNonMobileScreens ? '40%' : '90%'} boxShadow={'0px 4px 20px rgba(0, 0, 0, 0.1)'} backgroundColor={theme.palette.background.alt}>
                        <Typography 
                            variant='h4' 
                            color={theme.palette.primary.alt} 
                            marginBottom='1rem'
                        >
                            Connect with Experts
                        </Typography>
                        <Typography 
                            variant='body1' 
                            color='neutral.mediumMain'
                        >
                            Engage with leading space scientists and enthusiasts. Share insights, ask questions, and expand your knowledge in our vibrant community.
                        </Typography>
                    </Box>
                </FlexBetween>

                {/* Third Image and Description */}
                <FlexBetween 
                    flexDirection={isNonMobileScreens ? 'row' : 'column'} 
                    alignItems='center' 
                    marginBottom='2rem'
                >
                    <Box 
                        flex={1} 
                        sx={{
                            backgroundImage: `url(${image3})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            height: '300px',
                            width: '100%',
                            borderRadius: '8px',
                        }}
                    />
                    <Box flex={1} padding='1rem' p='2rem' m='0 1.5rem' maxWidth={isNonMobileScreens ? '40%' : '90%'} borderRadius='0.5rem' boxShadow={'0px 4px 20px rgba(0, 0, 0, 0.1)'} backgroundColor={theme.palette.background.alt}>
                        <Typography 
                            variant='h4' 
                            color={theme.palette.primary.alt} 
                            marginBottom='1rem'
                        >
                            Discover New Horizons
                        </Typography>
                        <Typography 
                            variant='body1' 
                            color='neutral.mediumMain'
                        >
                            Discover and discuss the latest space missions and scientific breakthroughs. Stay updated with our community's news and insights.
                        </Typography>
                    </Box>
                </FlexBetween>
            </Box>
        </Box>
    );
};

export default Home;
