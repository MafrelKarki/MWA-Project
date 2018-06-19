var express = require('express');
var router = express.Router();
var app = express();
var port = process.env.PORT || 3000;

app.listen(port, function(){
  console.log("listening to port "+port);
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
