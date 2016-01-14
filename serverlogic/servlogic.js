var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL|| 'postgres://localhost/restaurant';
var app = express();
var knex = require('knex')
require('dotenv').load()

function runQuery (query,callback){
   pg.connect(connectionString, function(err, client, done) {
     if (err) { done() ; console.log(err); return; }
     client.query(query, function(err,results){
       done();
       if(err) {console.log(err); return; }
       callback(results);
     });
   });
 }

 function postAdd(name, location, state, type, image, rating, bio) {
   knex('foods').then(function(results){

   })
 }

 // function postAdd(name, location, state, type, image, rating, bio) {
 //   var review = Number(rating)
 //   var j = "INSERT INTO foods VALUES(default,'"+name+"','"+location+"','"+state+"','"+type+"','"+image+"','"+review+"','"+bio+"');"
 //   runQuery(j, function(results){
 //   })
 // }

 function postUpdate(name, location, state, type, image, rating, bio, id) {
   var review = Number(rating)
   var j = "UPDATE foods SET name='"+name+"',location='"+location+"', state='"+state+"', type'"+type+"', image='"+image+"',review='"+review+"',bio='"+bio+"' WHERE id='"+id+"'"

   runQuery(j, function(results){
     return results
   })
 }




function removeIllegals(x) {
  if(typeof(x) == 'number') {
    return x
  }
  var array= x.split("")
  var newString = ""
  for(var i = 0; i <x.length; i++) {
    if(x[i] == "'"){
      newString += "\'"
    }
    else if(x[i] == '"') {
      newString += '\"'
    }
    else {
      newString += x[i]
    }
  }
  return newString
}


 function postSelect() {
   runQuery('SELECT * FROM foods', function(results){
     var result = results.rows
     return result
   })
 }

 function trimWhiteSpace(x) {
   var newString = ""
   for(var i =0; i <x.length; i++) {
     if(x[i] != " ") {
       newString += x[i]
     }
   }
   return newString
 }
 function evaluateLength(x) {
   if(x.length < 2) {
     return "invalid"
   }
   else {
     return "valid"
   }
 }

var states = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI',
  'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI',
  'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC',
  'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
  'VT', 'VA', 'WA', 'WV', 'WI', 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO',
  'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
  'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV',
  'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI',
  'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY' ]

  var cuisine = ['Italian','Mexican','Thai','French','Vietnames','Chinese','American','Other']

module.exports = {
  runQuery: runQuery,
  states: states,
  cuisine: cuisine,
  postAdd: postAdd,
  postSelect: postSelect,
  postUpdate: postUpdate
}
