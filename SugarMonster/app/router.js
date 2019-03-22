/**
 * Router.js
 * This file contains all methods that the front-end can call  
 */

module.exports = function(app, passport){

  /** Import modules */
  var hat = require('hat');

  /** With this string, you can connect to the remote MongoDB cluster. */
  var url = "mongodb+srv://Confituur1234:Arthur0!@cluster0-gpqwt.gcp.mongodb.net/test?retryWrites=true";
  var dbName = "Wirehack2019";
  var collection = "Users";

  /** Functions used in the GET and POST methods. */

  /** This function takes in a child name, the parent's email address
   *  to which notifications can be send about the child's actions
   *  and a password for the parent to modify the app settings.
   *  */ 
  function insertAccount(childname, email, password){
    var mongoClient = require('mongodb').MongoClient
    mongoClient.connect(url, { useNewUrlParser: true } , function(err, db) {
       if (err) throw err;
         var dbo = db.db(dbName);
         var newUser = { childname: childname, email: email, password:  password};
         dbo.collection(collection).insertOne(newUser, function(err, res) {
        if (err) throw err;
         console.log("User registered.");
         db.close();});});
        }


  function accountExists(childname, email, password){
    /** Make a mongoClient to connect with the MongoDB remote cluster and a userquery. */
    var mongoClient = require('mongodb').MongoClient
    var userQuery = {"email" : email};

    mongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName); 
      console.log("email:", email);
  
      dbo.collection(collection).find(userQuery).toArray(function(err, result){
      console.log("Found result: ", result);
      if (err) throw err;
      /** If something was found, the account exists. */
      if (result.length === 0){
        console.log("accountdoes not exist: ", result)
       return 0;
      }
      else {
        /** Debugger */
        console.log("AccountExists found: ", result);
        return 1;
      }
      });     
    });
  }      

    /** 
     * GET and POST methods 
     * 
     * */    

     /** Give back the index page. */
    app.get('/', function(req, res) {
        res.render('index');
      });

    app.post('/register', function(req, res){
      /** Get the parameters */
      var childname = req.param("childname");
      var email = req.param("email");
      var password = req.param("password");

      /** Make a mongoClient to connect with the MongoDB remote cluster and a userquery. */
    var mongoClient = require('mongodb').MongoClient
    var userQuery = {"email" : email};

    mongoClient.connect(url, { useNewUrlParser: true }, function(err, db) {
      if (err) throw err;
      var dbo = db.db(dbName); 
      console.log("email:", email);
  
      dbo.collection(collection).find(userQuery).toArray(function(err, result){
      console.log("Found result: ", result);
      if (err) throw err;
      /** If something was found, the account exists. */
      if (result.length === 0){
        console.log("accountdoes not exist: ", result)
        insertAccount(childname, email, password)
       res.send(true);
      }
      else {
        /** Debugger */
        console.log("AccountExists found: ", result);
        res.send(false);
      }
      });     
    });
    })  

    app.get('/login', function(req, res){
      /** Get the parameters */
      var childname = req.param("childname");
      var email = req.param("email");
      var password = req.param("password");

      /** Connect to the database */
      var dbo = db.db(dbName);
      /** Query on email: makes accounts unique */
      var query = {"email" : email};
      dbo.collection(collection).find(query).toArray(function(err, result){
      if (err) throw err;
      /** Did you find anything? */
      if (result.length > 0){
        /** Did you match something? */
      if (result[0].email === email && result[0].password === password){
        /* Generate session key */
        var id = hat();
        dbo.collection("SessionKeys").insertOne(id, function(err, res) {
          if (err) throw err;
           console.log("User registered.");
           db.close();})
        res.send(id);
        }
      else res.send(false);
      }
    })
  })  

      

}