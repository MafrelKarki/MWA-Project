var url = require('url');
var User = require('../models/user');

exports.getUserByEmail = (req, res, next)=>{
  var e =  req.query.email;
  console.log(e);

  //implementing regular expression search on the users based on user's email address
  User.search(e, function(err, doc) {

        if(err){
          return res.status(204).send({
            message: "Unable to fetch user"
          })
        }

        return res.status(200).send({
          searchedUsers: doc
        });
      })

}
