/**
 * Created by vhn on 09/02/2017.
 */

var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var BuyerSchema = new Schema({
    name: String,
    username: {type: String, required: true, index: {unique: true}},
    city: String,
    country: String
});

module.exports = mongoose.model('Sellers', BuyerSchema);