import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, Typography, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFollowing } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Following = ({ followingPersonId, name, subtitle, userPicturePath }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const followings = useSelector((state) => state.user.following);
  
    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
  
    const isFollowing = followings.find((followingPerson) => followingPerson._id === followingPersonId);
  
    const unfollowUser = async (Id, FollowingPersonId) => {
       const response = await fetch(
         `http://localhost:3001/users/${Id}/${FollowingPersonId}/unfollow`,
         {
           method: "PATCH",
           headers: {
             Authorization: `Bearer ${token}`,
             "Content-Type": "application/json",
           },
         }
       );
       const data = await response.json();
       dispatch(setFollowing({ following: data }));
    }

  
    return (
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={userPicturePath} size="55px" />
          <Box
            onClick={() => {
              navigate(`/profile/${followingPersonId}`);
              navigate(0);
            }}
          >
            <Typography
              color={main}
              variant="h5"
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {name}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              {subtitle}
            </Typography>
          </Box>
        </FlexBetween>
        <IconButton
          onClick={() => unfollowUser(_id, followingPersonId)}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFollowing ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      </FlexBetween>
    );
  };
  
  export default Following;