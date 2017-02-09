/**
 * Created by vhn on 09/02/2017.
 */

var bodyParser  = require('body-parser');
var Sellers     = require('../models/sellers');
var Products    = require('../models/products');
var config      = require('../../config');

module.exports = function (app, express) {
  var apiRouter = express.Router();

  apiRouter.get('/',function(req, res) {
        res.json({message: 'API working'})
    });

  /* Sellers */
  apiRouter.route('/sellers')
      //post
      .post( function (req, res) {
         var sellers = new Sellers();

         sellers.name       = req.body.name;
         sellers.username   = req.body.username;
         sellers.city       = req.body.city;
         sellers.country    = req.body.country;

         sellers.save( function (err) {
             if (err){
                 if (err.code == 11000)
                     return res.json({ success: false, message: 'Username exists'});
                 else
                     return res.send(err)
             }
             res.json({ success: true, message: sellers.username + ' welcome to twendesoko'});
         })
      })

  .get(function (req, res) {
        Sellers.find({}, function (err, sellers) {
            if (err)
                res.send(err);
            res.json(sellers);
        })
    });

  /* Products */
  apiRouter.route('/products/')

        // Post
      .post( function (req, res) {
          var products          = new Products();

          products.sellerID     = req.body.sellerID;
          products.name         = req.body.name;
          products.image        = req.body.image;
          products.location     = req.body.location;
          products.price        = req.body.price;

          products.save(function (err) {
              if (err) {

                  if (err.code == 11000)
                      return res.json({success: false, message: 'Entry failed'});
                  else
                      return res.send(err);
              }

              res.json({success: true, message:'Entry Added'});
          })

      })

        // ../api/products
        .get(function (req, res) {
            Products.find({}, function (err, products) {
                if (err)
                    res.send(err);
                res.json(products);

            })

        });

    return apiRouter;

};