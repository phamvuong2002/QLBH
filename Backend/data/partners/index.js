'use strict';
const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');

const getParners = async () => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partners');
        const parnerslist = await pool.request().query(sqlQueries.parnerslist);
        console.log(parnerslist)
        return parnerslist.recordset;
    } catch (error) {
        console.log(error.message);
    }
}

const getParnerById = async(ParnerID) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partners');
        const parner = await pool.request()
                            .input('masothue', sql.Char(15), ParnerID)
                            .query(sqlQueries.getparnerbyid);
        return parner.recordset;
    } catch (error) {
        return error.message;
    }
}

const creatParner = async (data) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('partners');
        const insert = await pool.request()
                            .input('masothue', sql.Char(15), data.masothue)
                            .input('nguoidaidien', sql.Char(30), data.nguoidaidien)
                            .input('email', sql.Char(50), data.email)
                            .input('tendoitac', sql.Char(30), data.tendoitac)
                            .input('quan', sql.Char(20), data.quan)
                            .input('slchinhanh', sql.Int, data.slchinhanh)
                            .input('sldonhangdukien', sql.Int, data.sldonhangdukien)
                            .input('loaiamthuc', sql.Char(20), data.loaiamthuc)
                            .input('diachi', sql.Char(50), data.diachi)
                            .input('sdt', sql.Char(15), data.sdt)
                            .query(sqlQueries.createparner);                            
        return insert.recordset;
    } catch (error) {
        return error.message;
    }
}

module.exports = {
    getParners, getParnerById, creatParner
}