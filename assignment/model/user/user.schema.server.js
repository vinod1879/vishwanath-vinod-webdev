
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username : { type: String, require: true, unique: true },
    password : { type: String, require: true, select: false},
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel' }],
    createdOn: { type: Date, default: Date.now() }
}, { collection: 'users'});

module.exports = userSchema;
