const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    img: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    friends: [{ type: String, required: true }],
    preferences: [{ type: Schema.Types.ObjectId, ref: "artist" }],
    nextConcerts:[{ type: Schema.Types.ObjectId, ref: "concert" }],
    comments:[{ type: Schema.Types.ObjectId, ref: "concert" }],
    isArtist: { type: Boolean, unique: true, required: true }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', schema);