'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getStores = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const storeList = await pool.request().query(sqlQueries.storeList);
        console.log(storeList)
        return storeList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getOneStore = async(StoreID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const store = await pool.request()
                            .input('ID', sql.Char(20), StoreID)
                            .query(sqlQueries.getStoreByID);
        return store.recordset;
    } catch (error) {
        return error.message;
    }
}

const getDisks = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const diskList = await pool.request().query(sqlQueries.diskList);
        console.log(diskList)
        return diskList.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getOneDisk = async(DiskName) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const disk = await pool.request()
                            .input('ID', sql.Char(20), DiskName)
                            .query(sqlQueries.getDiskByID);
        return disk.recordset;
    } catch (error) {
        return error.message;
    }
}
module.exports = {
    getStores, getOneStore, getDisks, getOneDisk,
}