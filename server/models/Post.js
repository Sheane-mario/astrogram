import mongoose from "mongoose";

const reactionSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['like', 'globe', 'rocket', 'star'], // Enum ensures only specified values are allowed
    required: true
  }
}, { _id: false });

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    reactions: [reactionSchema],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;