const User = require('../models/User');
// const UserLevel = require("./models/Level");
const { AuthenticationError, signToken } = require('../utils/auth');

// Defining the GraphQL resolvers
const resolvers = {
  Query: {
    // Resolver for fetching a user by userId
    getUser: async (parent, { userId }) => {
      // Find a user by their userId
      return User.findById(userId);
    },
    GetUserGoals: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user.goals;
      } catch (error) {
        console.log(error);
      }
    },

    // check if username already exists in database
    checkUsernameExists: async (parent, { username }) => {
      const existingUser = await User.findOne({ username });
      return !!existingUser;
    },

    // check if email already exists in database
    checkEmailExists: async (parent, { email }) => {
      const existingUser = await User.findOne({ email });
      return !!existingUser;
    },
  },

  Mutation: {
    // Mutation for creating a new user
    createUser: async (parent, { username, email, password }) => {
      try {
        // Create a new user with the provided data
        const user = await User.create({ username, email, password });
        // Generate a JWT token for the user
        const token = signToken(user);
        // Return an authentication object containing the token and user data
        return { token, user };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create new user');
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
    updateUserProgress: async (parent, { userId, levelName, levelNumber }) => {
      try {
        // Find the user by their userId
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        // Find the index of the specified level
        const levelIndex = user.levels.findIndex(
          (level) => level.levelName === levelName,
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
        throw new Error('Failed to update progress');
      }
    },

    // Mutation for deleting a user's progress
    deleteUserProgress: async (parent, { userId }) => {
      try {
        // Find the user by their userId
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        // Clear user's levels
        user.levels = [];
        // Save the updated user
        await user.save();

        // Return a success message here
        return 'User progress deleted';
      } catch (error) {
        console.error(error);
        throw new Error('Failed to delete progress');
      }
    },

    updateEasyScore: async (parent, { userId, easyScore }) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { easyScore },
          { new: true },
        );
        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update score');
      }
    },

    updateHardScore: async (parent, { userId, hardScore }) => {
      try {
        const user = await User.findByIdAndUpdate(
          userId,
          { hardScore },
          { new: true },
        );
        if (!user) {
          throw new Error('User not found');
        }

        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update score');
      }
    },
    // Resolver for adding a new goal to a user
    addGoalToUser: async (parent, { userId, goal }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }

        // Push the new goal (provided in the `goal` argument) to the user's goals array
        const goalObj = {
          name: goal,
          completed: false,
        }
        user.goals.push(goalObj);

        // Save the updated user
        await user.save();

        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add goal to user");
      }
    },

    updateGoalName: async (parent, { userId, goalId, name }) => {
      try {
        const user = await User.findById(userId)
        if (!user) {
          throw new Error("User not found");
        }
        console.log(user);

        const { goals } = user;
        for (let i = 0; i < goals.length; i++) {
          if (goalId == goals[i]._id) {
            goals[i].name = name;
          }
        }
        await user.save();
        return user;

      } catch (error) {
        console.error(error);
        throw new Error("Failed to update goal");
      }
    },

    // Resolver for updating a user's goal completion status
    updateGoalCompletion: async (parent, { userId, goalId, completed }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        // Find the goal by _id
        const { goals } = user;
        for (let i = 0; i < goals.length; i++) {
          if (goalId == goals[i]._id) {
            goals[i].completed = completed;
          }
        }
        // Save the updated user
        await user.save();

        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to update goal completion");
      }
    },

    // Resolver for deleting specific goals by _id
    deleteGoal: async (parent, { userId, goalId }) => {
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error("User not found");
        }
        const { goals } = user;
        let goalIndex = -1; // Initialize goalIndex with -1

        for (let i = 0; i < goals.length; i++) {
          if (goals[i]._id.toString() === goalId) {
            goalIndex = i;
            break; // break exits the loop prematurely when a certain condition is met
          }
        }
        if (goalIndex === -1) {
          throw new Error("Goal not found");
        }
        // Remove the goal from the array
        goals.splice(goalIndex, 1);

        await user.save();
        return user;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to Delete goal");
      }
    },

  },
};

module.exports = resolvers;
