import { Box, Typography, useTheme } from "@mui/material";
import Follower from "components/Follower";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowers } from "state";

const FollowersListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
  const followers = useSelector((state) => state.user.followers);

  const getFollowers = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/followers`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFollowers({ followers: data }));
  };

  useEffect(() => {
    getFollowers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Followers List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {followers.map((follower) => (
          <Follower
            key={follower._id}
            friendId={follower._id}
            name={`${follower.firstName} ${follower.lastName}`}
            subtitle={follower.occupation}
            userPicturePath={follower.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FollowersListWidget;