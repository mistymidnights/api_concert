const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcryp = require('bcrypt');
const {validatePassword, setError} = require ('../../helpers/utils');


const schema = new Schema({
    img: { type: String, unique: true, },
    email: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password:  {type: String, required: true },
    friend: [{ type: String, }],
    preference: [{ type: Schema.Types.ObjectId, ref: "artist" }],
    nextConcert: [{ type: Schema.Types.ObjectId, ref: "concert" }],
    comment: [{ type: Schema.Types.ObjectId, ref: "concert" }],
    isArtist: { type: Boolean }
},
    {
        timestamps: true
    }
);

schema.pre('save', function (next){
    if (!validatePassword(this.password)) return next (setError('400','Contraseña Invalida '))
    this.password =bcryp.hashSync(this.password, 16);
    next();



});


module.exports = mongoose.model('user', schema);