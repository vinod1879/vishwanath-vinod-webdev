
var mongoose = require('mongoose');

var pageSchema = mongoose.Schema({
    _website: { type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel' },
    name: String,
    title: String,
    description: String,
    createdOn: { type: Date, default: Date.now() }
}, { collection: 'page'});

module.exports = pageSchema;
