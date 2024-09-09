// client/src/widgets/FollowingsListWidget.jsx

import { Box, Typography, useTheme } from "@mui/material";
import Following from "components/Following";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFollowing } from "state";

const FollowingsListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.token);
 
  const following = useSelector((state) => state.user.following);

  const getFollowing = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${userId}/following`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setFollowing({ following: data }));
  };

  useEffect(() => {
    getFollowing();
  }, []); 

  //console.log(user)
  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Following List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {following.map((followingPerson) => (
          <Following
            key={followingPerson._id}
            followingPersonId={followingPerson._id}
            name={`${followingPerson.firstName} ${followingPerson.lastName}`}
            subtitle={followingPerson.occupation}
            userPicturePath={followingPerson.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FollowingsListWidget;