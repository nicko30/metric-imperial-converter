//this:
//binds methods to objects, so that when you create a new instance of ConvertHandler like convertHandler in server.js, you can call the methods in here like convertHandler.getNum()

function ConvertHandler() {
  
  this.getNum = function(input) {

    let userInput = input;
    //split the string to get only the number the user provided
    const numberPart = userInput.split(/[^0-9./]/)[0];

    //if user did provide number in input, check if it's a valid number i.e. NOT 1/2/3, 3..2 etc.
    let validNumberRegex = /^\d*\.?\d+(\/\d*\.?\d+)?$/g
    let isNumberValid = validNumberRegex.test(numberPart) ? numberPart : null;

     //if user didn't provide a number in the input, provide 1 as the default or use number provided (which is either a valid number or null)
     let numberInputRegex = /[0-9./]/g
     let finalNumber = numberInputRegex.test(userInput) ? isNumberValid : 1;
  
    //if finalNumber is the default 1 or a valid number, numberGiven can be evaluated using eval(). 
    //and if finalNumber is not a valid number use || null to ensure finalNumber is not evaluated leading to a typeError
    let numberGiven = finalNumber ? eval(finalNumber) || null : null; // eval converts string to number, ensuring fractions like 1/2 don't cause errors
    
    return numberGiven
  };
  
  this.getUnit = function(input) {
    let result = input;

    let units = { //accept units in upper and lowercase, but return all in lowercase except litres: L
      "L": "L",
      "l": "L",
      "gal": "gal",
      "GAL": "gal",
      "km": "km",
      "KM": "km",
      "mi": "mi",
      "MI": "mi",
      "lbs": "lbs",
      "LBS": "lbs",
      "kg": "kg",
      "KG": "kg",
    }

    let missingUnitRegex = /^[0-9]$/gi
    let unitRegex = /[a-z]/gi

    //if no unit given return null, else return the unit given
    let unitGiven = missingUnitRegex.test(result) ? null : result.match(unitRegex).join('').toString();
    //returns valid unit is unitGiven is a property of units obj, else returns null
    let isUnitValid = units.hasOwnProperty(unitGiven) ? units[`${unitGiven}`] : null;
     
    return isUnitValid
    
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit;
    
    let returnUnit = {
      "L": "gal",
      "l": "gal",
      "gal": "L",
      "GAL": "L",
      "mi": "km",
      "MI": "km",
      "km": "mi",
      "KM": "mi",
      "lbs": "kg",
      "LBS": "kg",
      "kg": "lbs",
      "KG": "lbs",
    }
    
    return returnUnit[`${result}`];
  };

  this.spellOutUnit = function(initUnit) {
    let result = initUnit;

    const fullUnitName = {
      "L": "litres",
      "l": "litres",
      "gal": "gallons",
      "GAL": "gallons",
      "km": "kilometers",
      "KM": "kilometers",
      "mi": "miles",
      "MI": "miles",
      "kg": "kilograms",
      "KG": "kilograms",
      "lbs": "pounds",
      "LBS": "pounds",
    }

    return {
      initUnit: fullUnitName[`${result}`],
      returnUnit: fullUnitName[this.getReturnUnit(initUnit)] //uses getReturnUnit to get full name of return unit for initUnit e.g. pass in "mi" and it returns "kilometers"
    };
  };
  
  this.convert = function(initNum, initUnit) {

    const galToL =  3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let conversion = {
      "L": initNum / galToL,
      "l": initNum / galToL,
      "gal": initNum * galToL,
      "GAL": initNum * galToL,
      "km": initNum / miToKm,
      "KM": initNum / miToKm,
      "mi": initNum * miToKm,
      "MI": initNum * miToKm,
      "kg": initNum / lbsToKg,
      "KG": initNum / lbsToKg,
      "lbs": initNum * lbsToKg,
      "LBS": initNum * lbsToKg,
    };
    
    let convertedNumber = conversion[`${initUnit}`];
    let roundedConvertedNumber = convertedNumber?.toFixed(5) //if convertedNumber is truthy returns string of original number with only 5 decimal places, else returns undefined if invalid unit
    return roundedConvertedNumber ? parseFloat(roundedConvertedNumber) : null // if roundedNumber is truthy, converts back to number else returns null i.e. invalid unit

  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
  };
  
}

module.exports = ConvertHandler;
