const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static('server/public'));

// Global variable that will contain all of the
// calculation objects:
let calculations = [{numOne: 3, numTwo: 5, operator: '+', result: 8}]

//function to calculate data
function VarOperator(firstNum, secondNum, userOperator) {
  let result = 0;
  let firstNumFixed = parseInt(firstNum);
  let secondNumFixed = parseInt(secondNum);

  switch (userOperator) {
      case "+":
          result = firstNumFixed + secondNumFixed;
          break;
      case "-":
          result = firstNumFixed - secondNumFixed;
          break;
      case "*":
          result = firstNumFixed * secondNumFixed;
          break;
      case "/":
          result = firstNumFixed / secondNumFixed;
          break;
      default:
          console.error("Invalid operator");
          return;
  }

  const calculationObject = {
    numOne: firstNum,
    numTwo: secondNum,
    operator: userOperator,
    result: result
  }

  calculations.push(calculationObject);
  return result;
};

//Test functionality of VarOperator before adding to POST route
//VarOperator(3, 6, '*');
//console.log(calculations);

// Here's a wonderful place to make some routes:
// GET /calculations
app.get('/calculations', (req, res) => {
  res.send(calculations);
});

// POST /calculations
app.post('/calculations', (req, res) => {

  const newData = req.body;
  // store data
  console.log(`POST request for Data calculations`, newData);

  if (
    newData.numOne == null ||
    //typeof newData.numOne !== 'number' ||
    newData.numTwo == null ||
    //typeof newData.numTwo !== 'number' ||
    newData.operator == null ||
    !newData.operator
    ) {
      res.sendStatus(400);
      return;
    };

  VarOperator(newData.numOne, newData.numTwo, newData.operator);
  console.log(`Added calculations`, newData);
  res.sendStatus(201);

});

// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
