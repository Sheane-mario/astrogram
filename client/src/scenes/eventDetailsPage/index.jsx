// client/src/scenes/eventDetailsPage/index.jsx

import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import WidgetWrapper from "components/WidgetWrapper";
import FlexBetween from "components/FlexBetween";
import UserImage from "components/UserImage";

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const [isAttending, setIsAttending] = useState(false);
  const { eventId } = useParams();
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { palette } = useTheme();

  const getEvent = async () => {
    const response = await fetch(`http://localhost:3001/events/${eventId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setEvent(data);
    setIsAttending(data.attendees?.includes(user._id));
  };

  const handleAttendance = async () => {
    const endpoint = isAttending ? 'unattend' : 'attend';
    const response = await fetch(`http://localhost:3001/events/${eventId}/${endpoint}`, {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user._id })
    });
    if (response.ok) {
      setIsAttending(!isAttending);
      getEvent(); // Refresh event data
    } else {
      console.error("Failed to update attendance:", await response.text());
    }
  };

  useEffect(() => {
    getEvent();
  }, []);

  if (!event) return null;

  const isCreator = user._id === event.creatorId?._id;

  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="2rem 6%" display="flex" gap="2rem" justifyContent="center">
        <WidgetWrapper width="60%">
          <FlexBetween>
            <FlexBetween gap="1rem">
              <UserImage image={event.creatorId?.picturePath || "default_avatar.png"} size="55px" />
              <Box>
                <Typography variant="h4" color={palette.neutral.dark} fontWeight="500">
                  {event.title}
                </Typography>
                <Typography color={palette.neutral.medium} fontSize="0.75rem">
                  Created by: {event.creatorId ? `${event.creatorId.firstName} ${event.creatorId.lastName}` : "Unknown"}
                </Typography>
              </Box>
            </FlexBetween>
          </FlexBetween>
          <Typography color={palette.neutral.main} sx={{ mt: "1rem" }}>
            {event.description}
          </Typography>
          <Typography color={palette.neutral.medium} sx={{ mt: "1rem" }}>
            Date: {new Date(event.date).toLocaleString()}
          </Typography>
          <Typography color={palette.neutral.medium} sx={{ mt: "0.5rem" }}>
            Location: {event.location}
          </Typography>
          <Typography color={palette.neutral.medium} sx={{ mt: "0.5rem" }}>
            Attendees: {event.attendees?.length || 0}
          </Typography>
          
          {!isCreator && (
            <Button
              fullWidth
              onClick={handleAttendance}
              sx={{
                m: "0.5rem 0",
                p: "1rem",
                backgroundColor: isAttending ? palette.primary.light : palette.primary.main,
                color: palette.background.alt,
                "&:hover": { 
                  backgroundColor: isAttending ? palette.primary.main : palette.primary.light,
                  color: palette.primary.dark 
                },
              }}
            >
              {isAttending ? "Attending" : "Attend Event"}
            </Button>
          )}
          
          {isCreator && (
            <FlexBetween mt="1rem">
              <Button
                onClick={() => navigate(`/events/${eventId}/edit`)}
                sx={{
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Edit Event
              </Button>
              <Button
                onClick={async () => {
                  await fetch(`http://localhost:3001/events/${eventId}`, {
                    method: "DELETE",
                    headers: { Authorization: `Bearer ${token}` },
                  });
                  navigate("/events");
                }}
                sx={{
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Delete Event
              </Button>
            </FlexBetween>
          )}
        </WidgetWrapper>
      </Box>
    </Box>
  );
};

export default EventDetailsPage;