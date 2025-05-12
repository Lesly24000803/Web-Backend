var express = require('express');
var router = express.Router();

let tasks = [
    {
        id: 1,
        name: 'Goals 1',
        description: 'Description for Task 1'
    },
    {
        id: 2,
        name: 'Goals 2',
        description: 'Description for Goals 2'
    },
    {
        id: 3,
        name: 'Goals 3',
        description: 'Description for Goals 3'
    }
];

router.get('/getGoals', function(req, res, next){
    res.json(goals);
})

router.post('/addGoal', function(req, res, next){
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        req.body.id = timestamp.toString();
        goals.push(req.body);
    }
    res.json(goals);
})

router.delete('/removeGoal/:id', function(req, res, next){
    if(req.params&& req.params.id){
        let id = req.params.id;
        goals = goals.filter(goal => goal.id !== id);
        res.json(goals);
    }else{
        res.json([{}]);
    }
})

module.exports = router;