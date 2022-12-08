'use strict';

const express = require('express');
const QLBHControll = require('../controllers/QLBHController');
const router = express.Router();

//----------------------partner---------------------
router.get('/allparners', QLBHControll.getAllParners);
router.get('/parnersByID/:id', QLBHControll.getParnerID);
router.post('/addparner', QLBHControll.addParner);
//-------------------------menu----------------------
router.get('/menu/:id', QLBHControll.getMenuByParnerID);

module.exports = {
    routes: router
}