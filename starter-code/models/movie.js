const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
require('../models/celebrity.js');

const movieSchema = new Schema ({
    title: { type: String },
    genre: { type: String },
    plot: { type: String },
    cast: [{type:Schema.Types.ObjectId, ref: 'celebrity'}]
    // color: { type: String, enum: ['white', 'black', 'brown'] },
})

const movie = mongoose.model("movie", movieSchema);
module.exports = movie;