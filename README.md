**freeCodeCamp** - Information Security and Quality Assurance Project
------

**Metric-Imperial Converter**

1) SET NODE_ENV to `test` without quotes
2) Most logic will need done in `controllers/convertHandler.js` but do complete `routes/api.js`
3) You will add any security features to `server.js`
4) You will create all of the unit/functional tests in `tests/1_unit-tests.js` and `tests/2_functional-tests.js`

### User Stories:

1. I will help prevent the client from trying to guess (sniff) the MIME type.
2. I will prevent cross-site scripting (XSS) attacks.
3. I can **GET** `/api/convert` with a single parameter containing an accepted number and unit and have it converted. Hint: Split the input by looking for the index of the first character which will mark the start of the unit.
4. I can convert 'gal' to 'L' and vice versa. **(1 gal to 3.78541 L)**
5. I can convert 'lbs' to 'kg' and vice versa. **(1 lbs to 0.45359 kg)**
6. I can convert 'mi' to 'km' and vice versa. **(1 mi to 1.60934 km)**
7. If my number is invalid, returned will be 'invalid number'.
8. If my unit of measurement is invalid, returned will be 'invalid unit'.
9. If both are invalid, returned will be 'invalid number and unit'.
10. I can use fractions, decimals or both in my parameter (for example: 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.
11. Returned will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format `{initNum} {initial_Units} converts to {returnNum} {return_Units}` with the result rounded to 5 decimals.
12. All 16 unit tests are complete and passing.
13. All 5 functional tests are complete and passing.