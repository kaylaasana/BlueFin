const User = require("../models/User");
// const UserLevel = require("./models/Level");
const { signToken } = require("../utils/auth");

// Defining the GraphQL resolvers
const resolvers = {
  Query: {
    // Resolver for fetching a user by userId
    getUser: async (_, { userId }) => { 
      // Find a user by their userId
      return User.findById(userId);
    },
  },
  Mutation: {
    // Mutation for creating a new user
    createUser: async (_, { username, email, password }) => {
      try {
        // Create a new user with the provided data
        const user = await User.create({ username, email, password });
        // Generate a JWT token for the user
        const token = signToken(user);
        // Return an authentication object containing the token and user data
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to create new user");
      }
    },

    // login user
    login: async (parent, { email, password }) => {
      // find user by email
      const user = await User.findOne({ email });
      
      // check if user exists 
      if (!user) {
        throw AuthenticationError;
      }

      // await password input from user
      const correctPw = await user.isCorrectPassword(password);

      // check if password matches user
      if (!correctPw) {
        throw AuthenticationError;
      }

      // assign token to user
      const token = signToken(user);

      return { token, user };
    },

    // Mutation for updating a user's progress
    updateUserProgress: async (_, { userId, levelName, levelNumber }) => {
      try {
        // Find the user by their userId
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Find the index of the specified level
        const levelIndex = user.levels.findIndex(
          (level) => level.levelName === levelName
        );

        // Check if the level exists in the user's levels
        if (levelIndex === -1) {
          throw new Error(`Level '${levelName}' not found for the user`);
        }

        // Update the progress of the specified level
        user.levels[levelIndex].levelNumber = levelNumber;
        // Save the updated user
        await user.save();

        // Returning the updated user
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update progress");
      }
    },

    // Mutation for deleting a user's progress
    deleteUserProgress: async(_, { userId }) => {
      try {
        // Find the user by their userId
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Clear user's levels
        user.levels = [];
        // Save the updated user
        await user.save();

        // Return a success message here
        return "User progress deleted";
      } catch (error) {
        console.error(error);
        throw new Error("Failed to delete progress");
      }
    },
  },
};

module.exports = resolvers;
