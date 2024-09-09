// client/src/scenes/eventForm/index.jsx

import React, { useState, useEffect } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";

const eventSchema = yup.object().shape({
  title: yup.string().required("required"),
  description: yup.string().required("required"),
  location: yup.string().required("required"),
  date: yup.date().required("required"),
});

const initialValuesEvent = {
  title: "",
  description: "",
  location: "",
  date: "",
};

const EventForm = () => {
  const { palette } = useTheme();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const token = useSelector((state) => state.token);
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const getEvent = async () => {
    const response = await fetch(`http://localhost:3001/events/${eventId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setEvent(data);
  };

  useEffect(() => {
    if (eventId) {
      getEvent();
    }
  }, [eventId]);

  const handleFormSubmit = async (values, onSubmitProps) => {
    const url = eventId
      ? `http://localhost:3001/events/${eventId}`
      : "http://localhost:3001/events";
    const method = eventId ? "PUT" : "POST";

    const response = await fetch(url, {
      method: method,
      headers: { 
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const savedEvent = await response.json();
    onSubmitProps.resetForm();

    if (savedEvent) {
      navigate("/events");
    }
  };

  if (eventId && !event) return null;

  return (
    <Box>
      <Navbar />
      <Box width="100%" padding="2rem 6%" display="flex" justifyContent="center">
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={event || initialValuesEvent}
          validationSchema={eventSchema}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  label="Event Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={Boolean(touched.title) && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Event Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={
                    Boolean(touched.description) && Boolean(errors.description)
                  }
                  helperText={touched.description && errors.description}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.date}
                  name="date"
                  type="datetime-local"
                  error={Boolean(touched.date) && Boolean(errors.date)}
                  helperText={touched.date && errors.date}
                  sx={{ gridColumn: "span 4" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>

              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    m: "2rem 0",
                    p: "1rem",
                    backgroundColor: palette.primary.main,
                    color: palette.background.alt,
                    "&:hover": { color: palette.primary.main },
                  }}
                >
                  {eventId ? "Update Event" : "Create New Event"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default EventForm;