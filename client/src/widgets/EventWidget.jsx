import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";

const EventWidget = ({ eventId, creatorId, creatorName, creatorPicturePath, title, description, date, location, attendees }) => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper m="2rem 0">
      <FlexBetween>
        <FlexBetween gap="1rem">
          <UserImage image={creatorPicturePath || "default_avatar.png"} size="55px" />
          <Box>
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
              onClick={() => navigate(`/profile/${creatorId}`)}
            >
              {creatorName || "Unknown Creator"}
            </Typography>
            <Typography color={medium} fontSize="0.75rem">
              Event Creator
            </Typography>
          </Box>
        </FlexBetween>
      </FlexBetween>
      <Typography color={main} sx={{ mt: "1rem" }}>
        {title}
      </Typography>
      <Typography color={medium} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      <Typography color={medium} sx={{ mt: "1rem" }}>
        Date: {new Date(date).toLocaleDateString()}
      </Typography>
      <Typography color={medium} sx={{ mt: "0.5rem" }}>
        Location: {location}
      </Typography>
      <Typography color={medium} sx={{ mt: "0.5rem" }}>
        Attendees: {attendees?.length || 0}
      </Typography>
      <Button
        fullWidth
        sx={{
          m: "0.5rem 0",
          p: "1rem",
          backgroundColor: palette.primary.main,
          color: palette.background.alt,
          "&:hover": { color: palette.primary.main },
        }}
        onClick={() => navigate(`/events/${eventId}`)}
      >
        View Event
      </Button>
    </WidgetWrapper>
  );
};

export default EventWidget;