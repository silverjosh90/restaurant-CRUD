var express = require('express');
var router = express.Router();
var pg = require('pg');
var app = express();
var server = require('../serverlogic/servlogic.js');
require('dotenv').load()


/* GET home page. */
router.get('/', function(req, res, next) {
  server.runQuery('SELECT * FROM foods', function(results){
    var result = results.rows
    res.render('index', { header: 'gTables', rest: result });
  })
});

router.get('/new', function(req,res,next){
  res.render('restaurant', {state: server.states, cuisine: server.cuisine, header: "New Restaurant"})

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
    res.render('indRest', {title: restInfo, header: req.params.title})
  });
});

router.get("/edit/:title", function(req,res){
  server.runQuery('SELECT * FROM foods WHERE name=' + "'" + req.params.title + "'", function(results) {
    var restaurants = results.rows[0]

    res.render('editRest', {header: "Edit Restaurant", rest: req.params.title, cuisine: server.cuisine, state: server.states, restaurant: restaurants})

  })
})

router.get("/restaurant/admin", function(req,res) {

  server.runQuery('SELECT foods.name, employees.first_name, employees.last_name FROM foods LEFT JOIN employees ON foods.id = employees.food_id', function(results) {
    var j = results.rows


    res.render('admin' , {header: 'Admin', restaurant: j})
  })

});

router.post("/restaurant/employees/add", function(req,res){
  var restaurantName = req.body.restaurantName
  var first = req.body.first_name
  var last = req.body.last_name
  server.runQuery("SELECT id from foods WHERE name='" + restaurantName+"'", function(results){
    var rows = results.rows[0]
    var ided = rows.id

  var query = "INSERT INTO employees VALUES(default,'"+first+"','" + last + "'," + ided + " );"
  server.runQuery(query, function(results) {
    res.redirect('/');
  })
    })
})

router.post("/edit/:title", function(req,res){

  server.runQuery('SELECT * FROM foods WHERE name=' + "'" + req.params.title + "'", function(resulted) {
    var d = resulted.rows[0]
    var ided = d.id
    var rating = Number(req.body.rating)

   server.runQuery("UPDATE foods SET name='"+req.body.name+"',location='"+req.body.location+"', state='"+req.body.states+"', type='"+req.body.type+"', image='"+req.body.image+"',rating='"+rating+"',bio='"+req.body.bio+"' WHERE id='"+ided+"'", function(results) {

     res.redirect("/")
   })

 })

})


router.post("/delete/:title", function(req,res){
  server.runQuery('DELETE FROM foods WHERE name='+"'"+req.params.title+"'", function(results){
    console.log("Good job!");
    res.redirect("/")
  })
})



module.exports = router;
