import React from "react";
import { Box, Typography, useTheme, useMediaQuery, Grid, Avatar } from "@mui/material";
import { Search, Group, Brush, Chat, Favorite, Explore, EmojiObjects, Stars } from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import about from 'assets/about.jpg'; // Replace with your actual image path

const AboutUs = () => {
    const theme = useTheme();
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const values = [
        { icon: <Search />, text: 'Curiosity' },
        { icon: <Group />, text: 'Community' },
        { icon: <Brush />, text: 'Creativity' },
        { icon: <Chat />, text: 'Conversation' },
        { icon: <Favorite />, text: 'Connection' },
        { icon: <Explore />, text: 'Discovery' },
        { icon: <EmojiObjects />, text: 'Inspiration' },
        { icon: <Stars />, text: 'Wonder' },
    ];

    const teamMembers = [
        'Member1', 'Member2', 'Member3', 'Member4', 'Member5'
    ];

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundImage: `url(${about})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    position: 'relative',
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        padding: '2rem',
                    }}
                >
                    <Typography
                        variant="h1"
                        fontWeight="bold"
                        color="white"
                        sx={{ mb: 2 }}
                    >
                        Welcome to Astrogram
                    </Typography>
                    <Typography
                        variant="h5"
                        color="white"
                    >
                        Astrogram is a platform for astronomy enthusiasts to share and explore the universe. Our mission is to inspire curiosity, connect people, and foster a community of stargazers.
                    </Typography>
                </Box>
            </Box>

            {/* Values Section */}
            <Box
                width="100%"
                padding="2rem 6%"
                backgroundColor={theme.palette.background.alt}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={theme.palette.primary.main}
                    mb={2}
                >
                    Our values
                </Typography>
                <Grid container spacing={2}>
                    {values.map((value, i) => (
                        <Grid item xs={6} sm={3} key={i}>
                            <FlexBetween
                                gap="1rem"
                                backgroundColor={theme.palette.background.default}
                                borderRadius="0.55rem"
                                padding="1rem"
                            >
                                {value.icon}
                                <Typography color={theme.palette.neutral.main}>
                                    {value.text}
                                </Typography>
                            </FlexBetween>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Team Section */}
            <Box
                width="100%"
                padding="2rem 6%"
                backgroundColor={theme.palette.background.default}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    color={theme.palette.primary.main}
                    mb={2}
                >
                    Who we are
                </Typography>
                <Typography
                    variant="h5"
                    fontWeight="500"
                    color={theme.palette.primary.main}
                    mb={3}
                >
                    Meet the team
                </Typography>
                <Grid container spacing={3} justifyContent="center">
                    {teamMembers.map((member, i) => (
                        <Grid item key={i} xs={6} sm={4} md={2}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.primary.light,
                                        width: 64,
                                        height: 64,
                                        mb: 1,
                                    }}
                                >
                                    <Group />
                                </Avatar>
                                <Typography color={theme.palette.neutral.main}>
                                    {member}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default AboutUs;