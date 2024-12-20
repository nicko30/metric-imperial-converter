'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    let input = req.query.input

    let getNum = convertHandler.getNum(input)
    let getUnit = convertHandler.getUnit(input)
    let getReturnUnit = convertHandler.getReturnUnit(getUnit)
    let spellOutUnit = convertHandler.spellOutUnit(getUnit) //returns object with keys 'initUnit' and 'returnUnit'
    let convert = convertHandler.convert(getNum, getUnit)
    let getString = convertHandler.getString(getNum, spellOutUnit.initUnit, convert, spellOutUnit.returnUnit)

    if (getNum && getUnit) {
       res.json({ 
        initNum: getNum,
        initUnit: getUnit,
        returnNum: convert,
        returnUnit: getReturnUnit,
        string: getString })
    } else if (!getNum && !getUnit) {
       res.status(200).json({error: 'invalid number and unit'})
    } else if (!getNum) {
       res.status(200).json({error: 'invalid number'})
    } else if (!getUnit) {
       res.status(200).json({error: 'invalid unit'})
    } 
  })
};
