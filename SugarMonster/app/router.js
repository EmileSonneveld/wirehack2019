/**
 * Router.js
 * This file contains all methods that the front-end can call 
 * 
 */

module.exports = function(app, passport){

    app.get('/', function(req, res) {
        res.render('index');
      });

}