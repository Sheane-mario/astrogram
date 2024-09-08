import React from "react";
import Navbar from "scenes/navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserWidget from "widgets/UserWidget";
import MyPostWidget from "widgets/MyPostWidget";
import PostsWidget from "widgets/PostsWidget";
import AdvertWidget from "widgets/AdvertWidget";
import FollowersListWidget from "widgets/FollowersListWidget";
import FollowingsListWidget from "widgets/FollowingsListWidget";

const HomePage = () => {
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);


    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreens ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"  
            >
                <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
                    <UserWidget userId={_id} picturePath={user.picturePath} />
                </Box>
                <Box
                    flexBasis={isNonMobileScreens ? "42%" : undefined}
                    mt={isNonMobileScreens ? undefined : "2rem"}
                >
                    <MyPostWidget picturePath={picturePath} />
                    <PostsWidget userId={_id} />
                </Box>
                {isNonMobileScreens && (
                    <Box flexBasis='26%'>
                        <AdvertWidget />
                        <Box m='2rem 0' />
                        <FollowersListWidget userId={_id} />
                        <Box m='2rem 0' />
                        <FollowingsListWidget userId={_id} />
                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default HomePage;