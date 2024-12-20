const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    //example 
    // assert.isNull(null, 'This is an optional error description - e.g. null is null'); //1st value passed in is value to test. 2nd value here and in next line are messages to display if test fails 
    
    test('should correctly read whole number units', function() {
        const wholeNumbers = [
            {input: '4gal', expected: 4},
            {input: '40gal', expected: 40},
            {input: '54gal', expected: 54},
        ]

        wholeNumbers.forEach(({input, expected}) => {
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly read decimal number units', function() {
        const decimalNumbers = [
            {input: '4.5gal', expected: 4.5},
            {input: '40.2gal', expected: 40.2},
            {input: '54.3gal', expected: 54.3},
        ]

        decimalNumbers.forEach(({input, expected}) => {
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly read fractional units', function() {
        const fractions = [
            {input: '1/2gal', expected: 0.5},
            {input: '2/4gal', expected: 0.5},
            {input: '3/6gal', expected: 0.5},
        ]

        fractions.forEach(({input, expected}) => {
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly read fractional units with decimals', function() {
        const fractionsAndDecimals = [
            {input: '1.1/1.1gal', expected: 1},
            {input: '2.2/4.4gal', expected: 0.5},
            {input: '3.3/6.6gal', expected: 0.5},
        ]

        fractionsAndDecimals.forEach(({input, expected}) => {
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly return an error on a double-fraction', function() {
        const doubleFractions = [
            {input: '1/1/1gal', expected: null},
            {input: '2.2/4.4/5gal', expected: null},
        ]

        doubleFractions.forEach(({input, expected}) => {
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
        const noNumber = [
            {input: 'gal', expected: 1},
            {input: 'mi', expected: 1},
        ]

        noNumber.forEach(({input, expected}) => {
            const result = convertHandler.getNum(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly read each valid input unit.', function() {
        const validUnit = [
            {input: '1gal', expected: 'gal'},
            {input: '1mi', expected: 'mi'},
        ]

        validUnit.forEach(({input, expected}) => {
            const result = convertHandler.getUnit(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly return an error for an invalid input unit.', function() {
        const invalidUnit = [
            {input: 'ga', expected: null},
            {input: 'm', expected: null},
        ]

        invalidUnit.forEach(({input, expected}) => {
            const result = convertHandler.getUnit(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should return the correct return unit for each valid input unit.', function() {
        const correctReturnUnit = [
            {input: 'gal', expected: 'L'},
            {input: 'mi', expected: 'km'},
        ]

        correctReturnUnit.forEach(({input, expected}) => {
            const result = convertHandler.getReturnUnit(input);
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly return the spelled-out string unit for each valid input unit.', function() {
        const spellOut = [
            {input: 'gal', expected: 'gallons'},
            {input: 'mi', expected: 'miles'},
        ]

        spellOut.forEach(({input, expected}) => {
            const result = convertHandler.spellOutUnit(input).initUnit;
            assert.strictEqual(result, expected)
        })

    })

    test('should correctly convert gal to L', function() {
        const result = convertHandler.convert(4, 'gal')
        const expected = 15.14164;
        assert.strictEqual(result, expected)
    })

    test('should correctly convert L to gal', function() {
        const result = convertHandler.convert(4, 'L')
        const expected = 1.05669;
        assert.strictEqual(result, expected)
    })

    test('should correctly convert mi to km', function() {
        const result = convertHandler.convert(4, 'mi')
        const expected = 6.43736;
        assert.strictEqual(result, expected)
    })

    test('should correctly convert km to mi', function() {
        const result = convertHandler.convert(4, 'km')
        const expected = 2.48549;
        assert.strictEqual(result, expected)
    })

    test('should correctly convert lbs to kg', function() {
        const result = convertHandler.convert(4, 'lbs')
        const expected = 1.81437;
        assert.strictEqual(result, expected)
    })

    test('should correctly convert kg to lbs', function() {
        const result = convertHandler.convert(4, 'kg')
        const expected = 8.8185;
        assert.strictEqual(result, expected)
    })

});