var jwt = require('jwt-simple');

var auth = {
 
  login: function(req, res) {
 
    var mUsername = req.body.username || '';

    if (mUsername == '') {
      res.status(401).send('Invalid credentials');

      return;
    }
 
    // Fire a query to your DB and check if the username is valid
    auth.validateUser(req.db.users, res, mUsername);
 
  },

  login2: function(req, res) {
 
    var mUsername = req.body.username || '';
    var mPassword = req.body.password || '';

    if (mUsername == '' || mPassword == '') {
      res.status(401).send('Invalid credentials');
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    auth.validate(req.db.users, res, mUsername, mPassword);
 
  },
 
  validate: function(db, res, username, password) {

    db.findOne({username: username, pwd: password}, function(error, user){
        if (error) return next(error);

        if (user){
          var dbUserObj = {
            firstname: user.firstname,
            img: user.img,
            username: user.username
          };
        } else {
          res.status(401).send('Invalid credentials');

        }
     
        if (dbUserObj) {
          res.json(genToken(dbUserObj));
        }

      });
  },
 
  validateUser: function(db, res, enteredUsername) {

    db.findOne({username: enteredUsername}, function(error, user){
        if (error) return next(error);
        if (user){
          var dbUserObj = { 
            firstname: user.firstname,
            img: user.img,
            username: user.username
          };
        } else {
          res.status(401).send('Invalid credentials');


        }
     
        if (dbUserObj) {
          res.json(dbUserObj);
        }

      });
  },
}
 
// generate user token
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;