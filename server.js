const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const dishDB = require('./data/helpers/dishDB.js');
const recipesDB = require('./data/helpers/recipeDB.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('short'));


server.get('/', (req, res) => {
    res.send('server connected');
});

server.get('/dishes', (req, res) => {
    dishDB.getDishes()
        .then(dishes => {
            res.status(200).json({dishes});
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/dishes/:id', (req, res) => {
    dishDB.getDish(req.params.id)
        .then(dish => {
            if(dish.length !== 0) {
                res.status(200).json({dish});
            } else {
                res.status(404).json({ message: 'Dish could not be found' });
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/dishes', (req, res) => {
    if(req.body.name) {
        dishDB.addDish(req.body)
            .then(id => {
                res.status(201).json(id);
            })
            .catch(err => {
                res.status(500).json({ err: 'Server error adding dish' });
            });
    } else {
        res.status(412).json({ error: 'Please provide name of dish' });
    }
});

server.get('/recipes', (req, res) => {
    recipesDB.getRecipes()
        .then(recipes => {
            res.status(200).json({recipes})
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/recipes', (req, res) => {
    if(req.body.name && req.body.dish_id) {
        recipesDB.addRecipe(req.body)
            .then(id => {
                res.status(201).json({id});
            })
            .catch(err => {
                res.status(500).json({err})
            });
    } else {
        res.status(412).json({ message: 'Please provide name and dish id' })
    }
});

module.exports = server;