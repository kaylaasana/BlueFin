const { Schema, model } = require('mongoose');

const levelSchema = new Schema({
    // levelName stores which level the user is on
    levelName: {
        type: String,
        required: true,
    },
    // progress stores the user's progress for the specific level they are on
    levelNumber: {
        type: Number,
        default: 0,
    },
});

module.exports = levelSchema;
