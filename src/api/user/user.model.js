const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    img: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    friend: [{ type: String, required: true }],
    preference: [{ type: Schema.Types.ObjectId, ref: "artist" }],
    nextConcert: [{ type: Schema.Types.ObjectId, ref: "concert" }],
    comment: [{ type: Schema.Types.ObjectId, ref: "concert" }],
    isArtist: { type: Boolean, unique: true, required: true }
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('user', schema);