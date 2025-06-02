var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'desarrolloweb'
});

let goals = [];

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
  });

/* GET users listing. */
router.get('/getGoals', function(req, res, next) {
    let queryCreateGoal = 'SELECT * FROM goals';
    connection.query(queryCreateGoal, function (err, results, fields) {
        if (err){
            console.log(err);
            res.status(500).json(err);  
        }else{
            res.json(results);
        }
      });
});

router.delete('/removeGoal/:id', function(req, res, next) {
    if(req.params && req.params.id){
        let id = req.params.id;
        let queryCreateGoal = 'DELETE FROM goals WHERE id="'+id+'"';
        connection.query(queryCreateGoal, function (err, results, fields) {
            if (err){
                console.log(err);
                res.status(500).json(err);  
            }else{
                res.json(results);
            }
          });
    }else {
        res.status(400).json({})
    }
});


router.post('/addGoal', function(req, res, next) {
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body && req.body.name && req.body.description && req.body.dueDate){
        let queryCreateGoal = 'INSERT INTO goals (name, description, dueDate) \
        VALUES ("'+req.body.name+'", "'+req.body.description+'", "'+req.body.dueDate+'");';

        connection.query(queryCreateGoal, function (err, results, fields){
            if(err){
                res.status(400).json(err);
            }else{
            console.log(results);
            console.log(fields);
                res.status(200).json(results);
            }
        });

    }
    
});

module.exports = router;