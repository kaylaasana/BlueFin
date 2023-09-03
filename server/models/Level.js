const { Schema, model } = require('mongoose');

const userLevelSchema = new Schema({
    // Reference user Id from User models
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true, // Corrected from "requires" to "required"
    },
    // levelName stores which level the user is on
    levelName: {
        type: String,
        required: true,
    },
    // progress stores the user's progress for the specific level they are on
    progress: {
        type: Number,
        default: 0,
    },
});

const UserLevel = model('UserLevel', userLevelSchema);

module.exports = UserLevel;
