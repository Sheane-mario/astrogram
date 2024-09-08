import User from '../models/User.js';

/* READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message});
    }
}

export const getUserFollowers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const followers = await Promise.all(
            user.followers.map((id) => User.findById(id))
        );
        res.status(200).json(followers);
    }
    catch(error) {
        res.status(404).json({ message: error.message});
    }
}

/* UPDATE */
  export const followUnfollowUser = async (req, res) => {
    try {
        const { id, followerId } = req.params;
        const user = await User.findById(id);
        const follower = await User.findById(followerId);

        if (user.following.includes(followerId)) {
            user.following = user.following.filter((id) => id !== followerId);
            follower.followers = follower.followers.filter((id) => id !== id);
        } else {
            user.following.push(followerId);
            follower.followers.push(id);
        }
        await user.save();
        await follower.save();

        const following = await Promise.all(
            user.following.map((id) => User.findById(id))
        );

        const formattedFollowing = following.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFollowing);

    } catch (err) {
        res.status(404).json({ message: err.message });
    }
  }