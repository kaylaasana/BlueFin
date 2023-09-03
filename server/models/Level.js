const { Schema, model } = require('mongoose');

// Reference user Id from User models
// levelName stores which level the user is on
// progress stores the users progress for the specific level they are on
const userLevelSchema = new Schema({
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        requires: true,
    },
    levelName: {
        type: String,
        required: true,
    },
    progress: {
        type: Number,
        default: 0,
    },
});

const UserLevel = model('UserLevel', userLevelSchema);

module.exports = UserLevel;