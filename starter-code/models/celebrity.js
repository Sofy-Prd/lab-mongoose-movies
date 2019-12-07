const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const celebritySchema = new Schema ({
    name: { type: String },
    occupation: { type: String },
    catchPhrase: { type: String } 
})

const celebrity = mongoose.model("celebrity", celebritySchema);
module.exports = celebrity;