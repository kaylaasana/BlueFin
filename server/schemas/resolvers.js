const User = require("./models/User");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getUser: async (_, { userId }) => { // Change to getUser
      return User.findById(userId); // Use userId directly
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create new user");
      }
    },

    updateUserProgress: async (_, { userId, levelName, levelNumber }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        const levelIndex = user.levels.findIndex(
          (level) => level.levelName === levelName
        );

        if (levelIndex === -1) {
          throw new Error(`Level '${levelName}' not found for the user`);
        }

        user.levels[levelIndex].levelNumber = levelNumber;
        await user.save();

        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update progress");
      }
    },

    deleteUserProgress: async(_, { userId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Clear user's levels
        user.levels = [];
        await user.save();

        return "User progress deleted";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete progress");
      }
    },
  },
};

module.exports = resolvers;
