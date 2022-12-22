'use strict';

const ParnerData = require('../data/partners');
const MenuData = require('../data/menu');
const MenuItemsData = require('../data/menuitems');
const RestaurantsData = require('../data/restaurants');
const UserData = require('../data/users');

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

const update_Menu_Item_For_Partner = async (req, res, next) => {
    try {
        const data = req.body;
        const updated = await ParnerData.updateMenuItemForPartner(data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const get_Menu_Item_By_PartnerID = async (req, res, next) => {
    try {
        const data = req.body;
        const food = await ParnerData.getMenuItemByPartnerID(data);
        res.send(food);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const list_Contracts_By_PartnerID = async (req, res, next) => {
    try {
        const ParnerId = req.params.id;
        const listContracts = await ParnerData.listContractByPartnerID(ParnerId);
        res.send(listContracts);        
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
//-----------------------menuitems------------------------------
const get_Menu_Item_By_Name = async (req, res, next) => {
    try {
        const tenmon = req.params.id;
        const menuitem = await MenuItemsData.getMenuItemByName(tenmon);
        res.send(menuitem);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const add_Menu_Item = async (req, res, next) => {
    try {
        const data = req.body;
        const insert = await MenuItemsData.addMenuItem(data);
        res.send(insert);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const delete_Menu_Item = async (req, res, next) => {
    try {
        const tenmon = req.params.id;
        const deleted = await MenuItemsData.deleteMenuItem(tenmon);
        res.send(deleted);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const update_Menu_Item = async (req, res, next) => {
    try {
        const tenmon =  req.params.id;
        const data = req.body;
        const updated = await MenuItemsData.updateMenuItem(tenmon, data);
        res.send(updated);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//---------------------------Restaurants --------------------
const list_Restaurants_By_PartnerID = async (req, res, next) => {
    try {
        const masothue = req.params.id;
        const listRes = await RestaurantsData.listRestaurantsByPartnerID(masothue);
        res.send(listRes);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
//------------------------------Users-----------------------------
const getAllStores = async (req, res, next) => {
    try {
        const storeList = await UserData.getStores();
        res.send(storeList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStoreByName = async (req, res, next) => {
    try {
        const StoreId = req.params.id;
        const store = await UserData.getOneStore(StoreId);
        res.send(store);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllDisks = async (req, res, next) => {
    try {
        const diskList = await UserData.getDisks();
        res.send(diskList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getDiskById = async (req, res, next) => {
    try {
        const DiskId = req.params.id;
        const disk = await UserData.getOneDisk(DiskId);
        res.send(disk);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getOrderByID = async (req, res, next) => {
    try {
        const UserId = req.params.id;
        const orderList = await UserData.getOneOrders(UserId);
        res.send(orderList);        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postOrder = async (req, res, next) => {
    try {
        const data = req.body;
        const order = await UserData.postOneOrder(data);
        res.send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postOrderStore = async (req, res, next) => {
    try {
        const data = req.body;
        const order = await UserData.postOneOrderStore(data);
        res.send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postOrderDetail = async (req, res, next) => {
    try {
        const data = req.body;
        const order = await UserData.postOneOrderDetail(data);
        res.send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const postFeedback = async (req, res, next) => {
    try {
        const data = req.body;
        const order = await UserData.postOneFeedback(data);
        res.send(order);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getAllParners, getParnerID, addParner, getMenuByParnerID, add_Menu_Item, 
    delete_Menu_Item, get_Menu_Item_By_Name, update_Menu_Item, list_Restaurants_By_PartnerID,
    update_Menu_Item_For_Partner, get_Menu_Item_By_PartnerID, list_Contracts_By_PartnerID, 
    getAllStores, getStoreByName, getAllDisks, getDiskById, getOrderByID, postOrder, postFeedback,
    postOrderStore, postOrderDetail 
}