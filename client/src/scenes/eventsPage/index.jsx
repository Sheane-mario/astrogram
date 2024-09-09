// client/src/scenes/eventsPage/index.jsx

import React, { useEffect, useState } from "react";
import { Box, Button, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import EventWidget from "widgets/EventWidget";
import UserWidget from "widgets/UserWidget";

const EventsPage = () => {
  const [attendingEvents, setAttendingEvents] = useState([]);
  const [availableEvents, setAvailableEvents] = useState([]);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const navigate = useNavigate();
  const theme = useTheme();

  const getEvents = async () => {
    const response = await fetch("http://localhost:3001/events", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setAttendingEvents(data.attendingEvents);
    setAvailableEvents(data.availableEvents);
  };

  useEffect(() => {
    getEvents();
  }, []);

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
            <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <Button
            fullWidth
            onClick={() => navigate("/events/create")}
            sx={{
              m: "2rem 0",
              p: "1rem",
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.alt,
              "&:hover": { color: theme.palette.primary.main },
            }}
          >
            Create New Event
          </Button>
            <Typography variant="h5" sx={{ mb: "1.5rem" }}>Events You're Attending</Typography>
            {attendingEvents.map((event) => (
            <EventWidget
              key={event._id}
              eventId={event._id}
              creatorId={event.creatorId?._id}
              creatorName={`${event.creatorId?.firstName || ''} ${event.creatorId?.lastName || ''}`}
              creatorPicturePath={event.creatorId?.picturePath}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              attendees={event.attendees || []}
              isAttending={true}
            />
          ))}

          <Typography variant="h5" sx={{ mt: "3rem", mb: "1.5rem" }}>Available Events</Typography>
          {availableEvents.map((event) => (
            <EventWidget
              key={event._id}
              eventId={event._id}
              creatorId={event.creatorId?._id}
              creatorName={`${event.creatorId?.firstName || ''} ${event.creatorId?.lastName || ''}`}
              creatorPicturePath={event.creatorId?.picturePath}
              title={event.title}
              description={event.description}
              date={event.date}
              location={event.location}
              attendees={event.attendees || []}
              isAttending={false}
            />
          ))}
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default EventsPage;