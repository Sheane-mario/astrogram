// server/controllers/search.js

import User from "../models/User.js";
// import Event from "../models/Event.js";

export const searchAll = async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, 'i');

    const users = await User.find({
      $or: [
        { firstName: regex },
        { lastName: regex },
        { email: regex }
      ]
    }).limit(5);

    // const events = await Event.find({
    //   $or: [
    //     { title: regex },
    //     { description: regex }
    //   ]
    // }).limit(5);

    res.json({
      users,
      // events
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { searchAll };