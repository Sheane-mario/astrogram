import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Amila",
    lastName: "Fonseka",
    email: "aaaaaaa@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p11.jpeg",
    followers: [],
    following: [],
    location: "Colombo",
    occupation: "Software Engineer",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Nalin",
    lastName: "Silva",
    email: "thataaa@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p3.jpeg",
    followers: [],
    following: [],
    location: "Kurunagela",
    occupation: "Philosopher",
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Ruwan",
    lastName: "Weerasinghe",
    email: "someguy@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "p4.jpeg",
    followers: [],
    following: [],
    location: "Canada, CA",
    occupation: "Data Scientist Hacker",
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Viduranga",
    lastName: "Landers",
    email: "whatchadoing@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p6.jpeg",
    followers: [],
    following: [],
    location: "Wattala",
    occupation: "Astronomer",
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Chathura",
    lastName: "Fernando",
    email: "janedoe@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p5.jpeg",
    followers: [],
    following: [],
    location: "Kaluthara",
    occupation: "Hacker",
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Ajantha",
    lastName: "Silva",
    email: "harveydunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p7.jpeg",
    followers: [],
    following: [],
    location: "Badulla",
    occupation: "Journalist",
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Sumedha",
    lastName: "Appuhamy",
    email: "carlyvowel@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p8.jpeg",
    followers: [],
    following: [],
    location: "Negombo",
    occupation: "Teacher",
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Dinithi",
    lastName: "Raveesha",
    email: "jessicadunn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "p9.jpeg",
    followers: [],
    following: [],
    location: "Kottawa",
    occupation: "CS Undergraduate",
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];

const commentIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Nalin",
    lastName: "Silva",
    location: "Kurunagela",
    description: "My wonderful memories in Kurunagela.",
    picturePath: "post1.jpg",
    userPicturePath: "p3.jpeg",
    reactions: [
      { userId: userIds[0], type: 'like' },
      { userId: userIds[2], type: 'rocket' },
      { userId: userIds[3], type: 'globe' },
      { userId: userIds[4], type: 'star' },
    ],
    comments: [
      commentIds[0],
      commentIds[1],
      commentIds[2],
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Viduranga",
    lastName: "Landers",
    location: "Wattala",
    description:
      "Passionate about astronomy. This is a photo of the moon I took last night.",
    picturePath: "post2.jpg",
    userPicturePath: "p6.jpeg",
    reactions: [
      { userId: userIds[7], type: 'like' },
      { userId: userIds[4], type: 'rocket' },
      { userId: userIds[1], type: 'globe' },
      { userId: userIds[2], type: 'star' },
    ],
    comments: [
      commentIds[3],
      commentIds[4],
      commentIds[5],
      commentIds[6],
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Chathura",
    lastName: "Fernando",
    location: "Kaluthara",
    description:
      "Best things in life are free. A photo of a beautiful sunset I took last evening.",
    picturePath: "post3.jpg",
    userPicturePath: "p5.jpeg",
    reactions: [
      { userId: userIds[1], type: 'like' },
      { userId: userIds[6], type: 'globe' },
      { userId: userIds[3], type: 'rocket' },
      { userId: userIds[5], type: 'star' },
    ],
    comments: [
      commentIds[7],
      commentIds[0],
      commentIds[1],
      commentIds[2],
      commentIds[3],
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Ajantha",
    lastName: "Silva",
    location: "Badulla",
    description:
      "This is the last really long random description. This one is longer than the previous one. Man I'm bored. I'm going to keep typing until I run out of things to say.",
    picturePath: "post4.jpg",
    userPicturePath: "p7.jpeg",
    reactions: [
      { userId: userIds[1], type: 'globe' },
      { userId: userIds[6], type: 'star' },
      { userId: userIds[3], type: 'rocket' },
    ],
    comments: [
      commentIds[4],
      commentIds[5],
      commentIds[6],
      commentIds[7],
      commentIds[0],
      commentIds[1],
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Sumedha",
    lastName: "Appuhamy",
    location: "Negombo",
    description:
      "Just a short description. I'm tired of typing. I'm going to play video games now.",
    picturePath: "post5.jpg",
    userPicturePath: "p8.jpeg",
    reactions: [
      { userId: userIds[1], type: 'rocket' },
      { userId: userIds[3], type: 'star' },
      { userId: userIds[5], type: 'globe' },
      { userId: userIds[7], type: 'like' },
    ],
    comments: [
      commentIds[2],
      commentIds[3],
      commentIds[4],
      commentIds[5],
      commentIds[6],
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    firstName: "Dinithi",
    lastName: "Raveesha",
    location: "Kottawa",
    description:
      "For the last time, I'm going to play video games now. I'm tired of typing. I'm going to play video games now.",
    picturePath: "post6.jpg",
    userPicturePath: "p9.jpeg",
    reactions: [
      { userId: userIds[1], type: 'like' },
      { userId: userIds[2], type: 'globe' },
    ],
    comments: [
      commentIds[0],
      commentIds[1],
      commentIds[2],
      commentIds[3],
      commentIds[4],
    ],
  },
];

export const comments = [
  { _id: commentIds[0], userId: userIds[0], postId: posts[0]._id, text: "Great post!" },
  { _id: commentIds[1], userId: userIds[1], postId: posts[0]._id, text: "Interesting content!" },
  { _id: commentIds[2], userId: userIds[2], postId: posts[0]._id, text: "Thanks for sharing!" },
  { _id: commentIds[3], userId: userIds[3], postId: posts[1]._id, text: "Nice photo!" },
  { _id: commentIds[4], userId: userIds[4], postId: posts[1]._id, text: "Well written!" },
  { _id: commentIds[5], userId: userIds[5], postId: posts[1]._id, text: "This is hilarious!" },
  { _id: commentIds[6], userId: userIds[6], postId: posts[2]._id, text: "I love this!" },
  { _id: commentIds[7], userId: userIds[7], postId: posts[2]._id, text: "Very insightful!" },
];