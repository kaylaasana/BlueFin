const UserLevel = require('./models/Level'); 

const resolvers = {
  Mutation: {
    updateUserProgress: async (_, { userId, levelName, progress }) => {
      try {
        // Check if a UserLevel document already exists for this user and level
        let userLevel = await UserLevel.findOne({ UserId: userId, levelName });

        if (!userLevel) {
          // If no document exists, create a new one
          userLevel = new UserLevel({ UserId: userId, levelName, progress });
        } else {
          // If a document exists, update the progress
          userLevel.progress = progress;
        }
        // Save the UserLevel document (either newly created or updated)
        await userLevel.save();

        return userLevel;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update progress');
      }
    },
  },
};

module.exports = resolvers;

