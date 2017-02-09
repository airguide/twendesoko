/**
 * Created by vhn on 09/02/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema({
    sellerID: String,
    name: String,
    image:  String,
    location: String,
    price: Number
});

module.exports = mongoose.model('Products', ProductsSchema);