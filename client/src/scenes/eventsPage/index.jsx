import React, { useEffect, useState } from "react";
import { Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Navbar from "scenes/navbar";
import EventWidget from "widgets/EventWidget";
import UserWidget from "widgets/UserWidget";
import FlexBetween from "components/FlexBetween";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
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
    setEvents(data);
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
          <Box position="fixed">
            <UserWidget userId={_id} picturePath={picturePath} />
          </Box>
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
          {events.map((event) => (
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
            />
          ))}
        </Box>
        {isNonMobileScreens && <Box flexBasis="26%"></Box>}
      </Box>
    </Box>
  );
};

export default EventsPage;