// server/controllers/events.js

import Event from "../models/Event.js";
import User from "../models/User.js";

export const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, imageUrl } = req.body;
    const newEvent = new Event({
      creatorId: req.user.id,
      title,
      description,
      date,
      location,
      imageUrl,
      attendees: [req.user.id],
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id).populate("creatorId", "firstName lastName picturePath");
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, location, imageUrl } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location, imageUrl },
      { new: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const attendEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: "User is already attending this event" });
    }

    event.attendees.push(userId);
    await event.save();

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const unattendEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!event.attendees.includes(userId)) {
      return res.status(400).json({ message: "User is not attending this event" });
    }

    event.attendees = event.attendees.filter(attendeeId => attendeeId.toString() !== userId);
    await event.save();

    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const { userId } = req.params;
    const events = await Event.find({ creatorId: userId }).sort({ date: 1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const userId = req.user.id;
    const events = await Event.find()
      .sort({ date: 1 })
      .populate("creatorId", "firstName lastName picturePath");
    
    const attendingEvents = events.filter(event => event.attendees.includes(userId));
    const availableEvents = events.filter(event => !event.attendees.includes(userId));

    res.status(200).json({ attendingEvents, availableEvents });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};