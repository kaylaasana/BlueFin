const User = require('./models/User');
const UserLevel = require('./models/Level'); 

const resolvers = {
  Mutation: {
    updateUserProgress: async (_, { userId, levelName, progress }) => {
      try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
          throw new Error('User not found');
        }

        // Check if the user has the specified level
        const levelIndex = user.levels.findIndex(level => level.levelName === levelName);

        if (levelIndex === -1) {
          throw new Error(`Level '${levelName}' not found for the user`);
        }

        // Update the progress for the specified level
        user.levels[levelIndex].progress = progress;

        // Save the updated user
        await user.save();

        return user;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update progress');
      }
    },
  },
};

module.exports = resolvers;

