var express = require('express');
var router = express.Router();
var pg = require('pg');
var server = require('../serverlogic/servlogic.js');
var connectionString = 'postgres://localhost/library';
var app = express();

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

module.exports = {
  runQuery: runQuery;

}
