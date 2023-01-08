'use strict';

const ParnerData = require('../data/partners');
const MenuData = require('../data/menu');

//--------------------------Partner-------------------------------------------
const getAllParners = async (req, res, next) => {
    try {

        const Parnerlist = await ParnerData.getParners();
        res.send(Parnerlist);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getParnerID = async (req, res, next) => {
    try {
        const ParnerId = req.params.id;
        const parner = await ParnerData.getParnerById(ParnerId);
        res.send(parner);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addParner = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await ParnerData.creatParner(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//-----------------------menu------------------------------------
const getMenuByParnerID = async (req, res, next) => {
    try {
        const ParnerId = req.params.id;
        const menu = await MenuData.getMenuByPartner(ParnerId);
        res.send(menu);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    getAllParners, getParnerID, addParner, getMenuByParnerID
}