var express = require('express');
var router = express.Router();
var pg = require('pg');
var app = express();
var server = require('../serverlogic/servlogic.js');


/* GET home page. */
router.get('/', function(req, res, next) {
  server.runQuery('SELECT * FROM foods', function(results){
    var result = results.rows
    res.render('index', { title: 'gTables', rest: result });
  })
});

router.get('/new', function(req,res,next){
  res.render('restaurant', {state: server.states, cuisine: server.cuisine })

})

router.post("/add", function(req,res){
  if(req.body.submit) {
    server.postAdd(req.body.name, req.body.location, req.body.states, req.body.type, req.body.image, req.body.rating, req.body.bio)

}
  res.redirect('/')
})

router.get("/:title", function(req,res) {

  server.runQuery('SELECT * FROM foods WHERE name=' + "'" + req.params.title + "'", function(results) {
    var restInfo = results.rows[0]
    res.render('indRest', {title: restInfo})
  });
});

router.get("/edit/:title", function(req,res){
  server.runQuery('SELECT * FROM foods WHERE name=' + "'" + req.params.title + "'", function(results) {
    var restaurants = results.rows[0]

    res.render('editRest', {rest: req.params.title, cuisine: server.cuisine, state: server.states, restaurant: restaurants})

  })
})

router.post("/edit/:title", function(req,res){
  // var j = server.postUpdate(req.body.name, req.body.location, req.body.states, req.body.type, req.body.image, req.body.rating, req.body.bio)

  server.runQuery('SELECT * FROM foods WHERE name=' + "'" + req.params.title + "'", function(resulted) {
    var d = resulted.rows[0]
    var ided = d.id
    var rating = Number(req.body.rating)

   server.runQuery("UPDATE foods SET name='"+req.body.name+"',location='"+req.body.location+"', state='"+req.body.states+"', type='"+req.body.type+"', image='"+req.body.image+"',rating='"+rating+"',bio='"+req.body.bio+"' WHERE id='"+ided+"'", function(results) {

     res.redirect("/")
   })

 })

  // server.runQuery(j, function(results) {
  //   console.log("Worked!!")
  // });
})



router.post("/delete/:title", function(req,res){
  server.runQuery('DELETE FROM foods WHERE name='+"'"+req.params.title+"'", function(results){
    console.log("Good job!");
    res.redirect("/")
  })
})



module.exports = router;
