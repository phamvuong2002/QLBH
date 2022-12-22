'use strict';

const express = require('express');
const QLBHControll = require('../controllers/QLBHController');
const router = express.Router();

//----------------------partner---------------------
router.get('/allparners', QLBHControll.getAllParners);
router.get('/parnersByID/:id', QLBHControll.getParnerID);
router.post('/addparner', QLBHControll.addParner);
router.put('/partner/updatemenuitem',QLBHControll.update_Menu_Item_For_Partner)
router.post('/partner/findmenuitem', QLBHControll.get_Menu_Item_By_PartnerID)
router.get('/partner/listcontracts/:id', QLBHControll.list_Contracts_By_PartnerID);
//-------------------------menu----------------------
router.get('/menu/:id', QLBHControll.getMenuByParnerID);
//-------------------------menuitems----------------------
router.get('/getnumeitembyname/:id', QLBHControll.get_Menu_Item_By_Name);
router.post('/addmenuitem', QLBHControll.add_Menu_Item);
router.delete('/deletemenuitem/:id', QLBHControll.delete_Menu_Item);
router.put('/updatemenuitem/:id', QLBHControll.update_Menu_Item);
//-------------------------restaurants------------------
router.get('/restaurants/:id', QLBHControll.list_Restaurants_By_PartnerID);
//--------------------------users-----------------------------
// router.get('/store', QLBHControll.getAllStores);
// router.get('/disk', QLBHControll.getAllDisks);
router.get('/store/:id', QLBHControll.getStoreByName);
router.get('/disk/:id', QLBHControll.getDiskById);
router.get('/order/:id', QLBHControll.getOrderByID);
router.post('/addOrder', QLBHControll.postOrder);
router.post('/addOrderStore', QLBHControll.postOrderStore);
router.post('/addOrderDetail', QLBHControll.postOrderDetail);
router.post('/addFeedback', QLBHControll.postFeedback);

module.exports = {
    routes: router
}