console.log('client.js is sourced!');

function fetchCalcs(){
    console.log( 'fetchCalcs get history of calc results' );
    //axios call to server to get data
    axios({
      method: 'GET',
      url: '/calculations'
      })
      .then((response) => {
          // Code that will run on successful response
          console.log(response.data);
          renderCalcs(response.data);
          renderHistory(response.data);
      })
      .catch((error) => {
          // Code that will run on any errors from the server.
          console.log(error);
          console.error('ERROR', error)
      })
};

function renderCalcs(dataList) {
    console.log('renderInventory');
    const itemRender = document.querySelector('#recentResult');
    itemRender.innerHTML = '';
    for (let item of dataList) {
        itemRender.innerHTML = `
        <h2>${item.result}</h2><br>
    `;
    }
};

function renderHistory(dataList) {
    console.log('renderInventory');
    const itemRender = document.querySelector('#resultHistory');
    itemRender.innerHTML = '';
    for (let item of dataList) {
        itemRender.innerHTML += `
        <li>
            <ul>${item.firstNum} ${item.operator} ${item.secondNum} = ${item.result}</ul>
        </li>
    `;
    }
};

// Initialize operator variable
let userOperator = "";

// Add event listeners to the operator buttons
document.getElementById("add").addEventListener("click", function(event) {
    event.preventDefault();
    setOperator("+");
});

document.getElementById("subtract").addEventListener("click", function(event) {
    event.preventDefault();
    setOperator("-");
});

document.getElementById("multiply").addEventListener("click", function(event) {
    event.preventDefault();
    setOperator("*");
});

document.getElementById("divide").addEventListener("click", function(event) {
    event.preventDefault();
    setOperator("/");
});

// Function to set the operator variable
function setOperator(selectedOperator) {
    userOperator = selectedOperator;
    console.log("Selected operator:", userOperator);
}

document.getElementById("calcForm").addEventListener("submit", function(event) {
    event.preventDefault();

const firstNumElement = document.querySelector('#firstNum');
const secondNumElement = document.querySelector('#secondNum');

// Get values from input elements
const firstNum = parseFloat(firstNumElement.value);
const secondNum = parseFloat(secondNumElement.value);

// Check if values are valid
if (isNaN(firstNum) || isNaN(secondNum)) {
    console.error('Invalid input. Please enter valid numbers.');
    return;
}

submitCalc(firstNum, secondNum, userOperator);

});
    
function submitCalc(firstNum, secondNum, userOperator) {
console.log('submit numbers to calculate');

const newCalcCat = {
    numOne: firstNum,
    numTwo: secondNum,
    operator: userOperator,
    };
    
    axios ({
        method: 'POST', 
        url: '/calculations', 
        data: newCalcCat
    })
    .then((response) => {
    
    // Clear DOM History
    const itemTableBodyClear = document.querySelector('#resultHistory');
    itemTableBodyClear.innerHTML = '';
    
    //Get new data
    fetchCalcs();
    
    }).catch((error) => {
        console.error('ERROR', error);
       });
    
    };

    document.getElementById("clear").addEventListener("click", function(event) {
        event.preventDefault();
    
        const firstNumElement = document.querySelector('#firstNum');
        const secondNumElement = document.querySelector('#secondNum');
    
        //Clear fields
        firstNumElement.value = '';
        secondNumElement.value = '';
    });
        
    fetchCalcs();