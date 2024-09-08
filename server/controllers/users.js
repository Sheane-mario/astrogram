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

export const getUserFollowing = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const following = await Promise.all(
            user.following.map((id) => User.findById(id))
        );

        res.status(200).json(following);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

/* UPDATE */
  export const followUnfollowUser = async (req, res) => {
    try {
        const { id, targetPersonId } = req.params;
        const user = await User.findById(id);
        const targetPerson = await User.findById(targetPersonId);

        if (user.following.includes(targetPersonId)) {
            user.following = user.following.filter((id) => toString(id) !== toString(targetPersonId));
            targetPerson.followers = targetPerson.followers.filter((followerId) => toString(followerId) !== toString(id));
        } else {
            user.following.push(targetPersonId);
            targetPerson.followers.push(id);
        }
        await user.save();
        await targetPerson.save();

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

  export const unfollowUser = async (req, res) => {
    try {
        const { id, targetPersonId } = req.params;
        const user = await User.findById(id);
        const targetPerson = await User.findById(targetPersonId);

        user.following = user.following.filter((id) => toString(id) !== toString(targetPersonId));
        targetPerson.followers = targetPerson.followers.filter((followerId) => toString(followerId) !== toString(id));

        await user.save();
        await targetPerson.save();

        const following = await Promise.all(
            user.following.map((id) => User.findById(id))
        );

        const formattedFollowing = following.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFollowing);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
  }

  export const removeFollower = async (req, res) => {
    try {
        const { id, targetPersonId } = req.params;
        const user = await User.findById(id);
        //const targetPerson = await User.findById(targetPersonId);

        user.followers = user.followers.filter((followerId) => toString(followerId) !== toString(targetPersonId));
        //jtargetPerson.following = targetPerson.following.filter((id) => toString(id) !== toString(id));

        await user.save();
        //await targetPerson.save();

        const followers = await Promise.all(
            user.followers.map((id) => User.findById(id))
        );

        const formattedFollowers = followers.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );

        res.status(200).json(formattedFollowers);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }

}