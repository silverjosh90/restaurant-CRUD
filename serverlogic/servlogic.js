var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost/restaurant';
var app = express();
var knex = require('knex')

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
   var review = Number(rating)
   var j = "INSERT INTO foods VALUES(default,'"+name+"','"+location+"','"+state+"','"+type+"','"+image+"','"+review+"','"+bio+"');"
   runQuery(j, function(results){
   })
 }

 function postUpdate(name, location, state, type, image, rating, bio, id) {
   var review = Number(rating)
   var j = "UPDATE foods SET name='"+name+"',location='"+location+"', state='"+state+"', type'"+type+"', image='"+image+"',review='"+review+"',bio='"+bio+"' WHERE id='"+id+"'"

   console.log("UPDATE foods SET name='"+name+"',location='"+location+"', state='"+state+"', type'"+type+"', image='"+image+"',review='"+review+"',bio='"+bio+"' WHERE id='"+id+"'")
   runQuery(j, function(results){
     return results
   })
 }

 // function removeIllegals(name,location,image, bio) {
 //   var array = [name,location,image,bio]
 //   var newArray = []
 //   for (var i = 0; i < array.length; i++) {
 //     var word = array[i]
 //      for (var i = 0; i < word.length; i++) {
 //        var d = ""
 //        if(word[i] == "'" || word[i] == '"') {
 //          d += "\'"
 //        }
 //        else {
 //          d+= word[i]
 //        }
 //      }
 //   }
 // }




 function postSelect() {
   runQuery('SELECT * FROM foods', function(results){
     var result = results.rows
     return result
   })
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
