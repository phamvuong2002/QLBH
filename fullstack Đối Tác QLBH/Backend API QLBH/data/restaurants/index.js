'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const listRestaurantsByPartnerID = async(ParnerID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('restaurants');
        const listRes = await pool.request()
                            .input('masothue', sql.Char(15), ParnerID)
                            .query(sqlQueries.listRestaurantsByPartnerID);
        return listRes.recordset;
    } catch (error) {
        return error.message;
    }
}


module.exports = {
    listRestaurantsByPartnerID
}