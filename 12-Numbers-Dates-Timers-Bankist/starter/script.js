'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1
      } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
      }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES





//1. How Numbers works and how o determine a number?

// In JS all numbers are represemted as floating point numbers interally

//For Example:

console.log(23 === 23.0); //true

//2. Is JS capable to do precise calculatons?

// No, it shows anonymous results like 0.1 + 0.2 is 0.3000000000004 but, ideall
// it should have been 0.3 itself. To confirm it we have proof down below;


console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);


//3. What is parsing and how to do it?

// Parsing a number means removing the unecessary part from the given string which
// is not number.

// Example : '30px'  it contains px which is not a number and in order to retrieve 
// just the number part we will parse it.
// But parsing will only be done if the given strings starts with a digit only because if 
// it starts with a name/letter than it will show 'NaN' output.
//Similarly we have parse Float

const pixels = '30px';
console.log(Number.parseInt(pixels));


console.log(Number.parseInt('2.5ex'));
console.log(Number.parseFloat('2.5ex'));




//3. isNan Property (only use in case you are dealing with NaN value)

console.log(" 20 isNan : ", Number.isNaN(20)); //false
console.log(` '20' isNan : `, Number.isNaN('20'));  // false
console.log(` +'20X' isNan : `, Number.isNaN(+'20X')); // true (it doesn't removes X as we are not parsing here)
console.log(` 20/0 isNan : `, Number.isNaN(20 / 0)); // false (output is infinite and infinite is )




//isFinite Property (used to check whether the value is number or not )


console.log(` 20 isFinite : `, Number.isFinite(20)); //true (understood)
console.log(` 20/0 isFinite : `, Number.isFinite(20 / 0)); //false (because the output is infinity)

//isInteger Property

console.log(` 20 isInteger : `, Number.isInteger(20)); //true
console.log(` 20.00 isInteger : `, Number.isInteger(20.00)); //true
console.log(` +'20X' isInteger : `, Number.isInteger(+'20X')); //false
console.log(` Number.parseInt('20XX') isInteger : `, Number.isInteger(Number.parseInt('20XX'))); //true




// Mathematical Operations:


console.log(`Math.sqrt(25) : `, Math.sqrt(25)); //Sqaure root
console.log(`Cube root of 27: `, 27 ** (1 / 3));  // Cube root (no mathematical formula is there in JS)


console.log(`Math.max(25,10,100) : `, Math.max(25, 10, 100));
console.log(`Math.max(25,10,'100') : `, Math.max(25, 10, '100')); //does type coersion
console.log(`Math.max(25,10,'100X') : `, Math.max(25, 10, '100X')); // no parsing is done



console.log(`Math.min(25,10,100) : `, Math.min(25, 10, 100));
console.log(`Math.min(25,'10',100) : `, Math.min(25, '10', 100)); //does type coersion
console.log(`Math.min(25,'10X',100) : `, Math.min(25, '10X', 100));// no parsing is done



console.log(`Math.PI: `, Math.PI); //pi value
console.log(`Math.random() : `, Math.trunc(Math.random() * 6) + 1);


console.log(`Math.trunc(25.5555) : `, Math.trunc(25.5555)); //removes decimal part 

console.log(`Math.round(25.6666) : `, Math.round(25.6666)); //rounds to nearest value
console.log(`Math.round(25.4444) : `, Math.round(25.4444)); //rounds to nearest value

console.log(`Math.floor(23.6666) : `, Math.floor(23.6666)); //rounds down
console.log(`Math.floor(23.4444) : `, Math.floor(23.4444)); //rounds down

console.log(`Math.ceil(22.6666) : `, Math.ceil(22.6666)); //rounds up
console.log(`Math.ceil(22.44444) : `, Math.ceil(22.4444)); //rounds up


// .toFixed returns output as a string so we have to convert it into number
console.log(`(2.7).toFixed(0):`, +(2.7).toFixed(0));
console.log(`(2.7).toFixed(3):`, +(2.7).toFixed(3));
console.log(`(2.745).toFixed(2):`, +(2.745).toFixed(2));






// Difference between division and modulus


// Divison operations gives the quotient  Operator Used :  /


const quotient = 7 / 2;
console.log("Divison is: ", quotient); //3.5



//Modulus operations gives the remainder  Operator Used :  %
const remainder = 7 % 2;
console.log("Modulus is: ", remainder); //1








// *********************** BIGINT *********************** //



// In javascript the size of storing an integer is 64 bit out of which only 54 are
// used for storing digits and remaining are used to store position of the
// decimal points and the sign.

// We can calculate the size by the formula: ( 2 ** 53 - 1 )

// Why we have used 53 and not 54 because numbers starts from 0

console.log("The Maximum Value We Can Store Is: ", (2 ** 53 - 1));


//The NUMBERS Object has a property (MAX_SAFE_INTEGER) which stores the maximum possible Integer value 
// javascript can represent.

//Any value beyond this number is not considered safe.


console.log(Number.MAX_SAFE_INTEGER);





//How to store a number using bigInt?
// just add 'n' at the end of the large number or BigInt(desired_number)

console.log(621667636877372732892782782989434232323232323n);
console.log(BigInt(621667636877372732892782782989434232323232323));


//Operations on BigInt (all usual operation can be performed)


console.log(1000n + 1000n);
console.log("Multiplication with BigInt", 40007787326324878232379793272378723877823798n * 5032804823080n);
console.log("Division with BigInt", 673264687687236487676798423n / 6324862387687n);
console.log("Modulus with BigInt", 5623479829762389798239497892346823074n % 32467832686328n);


//Can we mix BigInt and regular integers?
//No, it will throw an error . Arithematic operations are not performed on mix integers.

//Example
// console.log(6718978435454n * 233); //error

//Can we perform Math Operations on BigInt?
// Simply 'NO'


// But we have exceptions

//1. Relational operators
console.log(1000000000n < 500);
console.log(100000n === 100000) //false (as it checks the type also)
console.log(100000n == 100000) //true (do not checks the type and simple do coercian)

console.log(487234234982374983n + ' is a BIG number');





// *********************** CRAETING DATES and TIME ***********************

const current = new Date();
console.log("Date Type 1 :", current); //gives current date

console.log("Date Type 2 (Unix Epoc) :", new Date(0)); // gives 01 Jan, 1970 (Unix epoch). 

console.log("Date Type 3 :", new Date(3 * 24 * 60 * 60 * 1000));



console.log("Date Type 4 :", new Date(2050, 11, 23, 6, 30, 59));

//2050 > year

//11  > month (October)
//the months parameter in javascript is 0 based i.e january = 0 > february = 1 and so on

//23 > Date

// 06 > Hours

// 30 > minutes

// 59 > seconds (not necessary in most of the cases)


//Dates has their own methods to play with. Given below are the examples for that


console.log('\n');
const future_date = new Date(2050, 11, 23, 6, 30, 59);

console.log(`Methods for Date and Time of current timezone`);

//GET Methods
console.log(future_date.getFullYear());
console.log(future_date.getMonth());
console.log(future_date.getDate());
console.log(future_date.getDay());
console.log(future_date.getHours());
console.log(future_date.getMinutes());
console.log(future_date.getSeconds());
console.log(future_date.getMilliseconds());
console.log(future_date.getTime()); //time in milliseconds from Jan 1 1970 


//SET Methods
console.log('\n');
console.log(future_date.setFullYear(2080));
console.log(future_date.setMonth(5));
console.log(future_date.setDate(10));
console.log(future_date.setHours(12));
console.log(future_date.setMinutes(13));
console.log(future_date.setSeconds(14));
console.log(future_date.setMilliseconds(15));

console.log(future_date);
// console.log(future_date.()); //time in milliseconds from Jan 1 1970 

console.log('\n');
console.log(future_date.toISOString()); // to get date into nicely formattted string


console.log('\n');
console.log(future_date.getTimezoneOffset());



console.log('\n');
console.log(`Methods for Date and Time of UTC`);
console.log(future_date.getUTCFullYear());
console.log(future_date.getUTCMonth());
console.log(future_date.getUTCDate());
console.log(future_date.getUTCDay());
console.log(future_date.getUTCHours());
console.log(future_date.getUTCMinutes());
console.log(future_date.getUTCSeconds());
console.log(future_date.getUTCMilliseconds());
// console.log(future_date.getVarDate);







//Operations can be performed on dates to get desired output.

const sampleDate = new Date(2040, 23, 11, 12, 5, 6);
console.log(sampleDate);


// difference betwwen two date

const numberOfDays = (date1, date2) => {
  return Math.abs((date2 - date1) / (1000 * 60 * 60 * 24)); //why abs? so as to avoid negative output

}

console.log(numberOfDays(new Date(2050, 11, 23), new Date(2050, 11, 25)));


// For doing some more advance dates calculations you can use a 
// library named 'movement.js'.




// ******************** INTERNATIONALIZING DATE ********************

// Internationalizing dates means converting according to the country.

// Javascript has a internationalizing API which allows us to easily format numbers
// and dates according to the countries.

 const formatted_date = new Intl.DateTimeFormat('en-IN').format(new Date());
 console.log(formatted_date);

 //But here we only get the date and not the time.
 // So best practice is to make an object with all the desired values you want
 // and passing it as a parametere in the 'DateTimeFormat' method.


 const options={
  day:'numeric',
  month:'long',
  year:'numeric',
  weekday : 'long',
  hour:'numeric',
  minute:'numeric',
  second : 'numeric'
 }

 const formatted_date2 = new Intl.DateTimeFormat('en-IN',options).format(new Date());
 console.log(formatted_date2);




// ******************** INTERNATIONALIZING NUMBERS ********************

console.log('\n') ;

const option2={
  style: 'currency',
  unit:'mile-per-hour',
  currency: 'INR',
  useGrouping:false  //use for enabling and disabling the separators
}

const num=3246834663278.3242;

console.log(`US based number formatting : `, new Intl.NumberFormat('en-US',option2).format(num));
console.log(`Syria based number formatting : `, new Intl.NumberFormat('ar-SY',option2).format(num));
console.log(`Germany based number formatting : `, new Intl.NumberFormat('de-DE',option2).format(num));




// ******************** TIMERS ********************

//We have two kinds of timers in JS.


// 1. setTimeout() , it runs only once after a interval of time
 setTimeout(() => {
  console.log('Your Pizza is Ready');
 }, 4000); //4000 milliseconds ==  4 seconds




//We can pass arguments for setTimeout callback function which can be used inside the
// callback function


setTimeout((arg1,arg2) => {
  console.log(`Your ${arg1} and ${arg2} Pizza is Ready`);
 }, 4000, 'cheese', 'corn'); //4000 milliseconds ==  4 seconds


 //we can also pass an array of elements as arrgumenst using spread operator


 const ingredients = ['onion','capsicum'];

 const delete_timeout = setTimeout((arg1,arg2) => {
  console.log(`Your ${arg1} and ${arg2} Pizza is Ready too!`);
 }, 5000, ...ingredients);



//We can also clear the timeout (i.e delete it) based on some conditions/logic
// But in order to that the timeOut should be assigned to a variable so that 
// we can pass that variable inside the clearTimeout method.




if(ingredients.includes('onion'))
{
  clearTimeout(delete_timeout); //it will remove the delete_timeout setTimeout, hence the output wull not be printed
}




// 2. setInterval(), it keeps running forever until we stop it


// setInterval(()=>{
//   console.log('Hey');
// }, 2000)











// ************** TIMER ***************

let hours = 0;
let minutes = 0;
let seconds = 0;


const timer=setInterval(()=>{
  console.log(hours,minutes,seconds);
  if(hours==1)
{
  clearInterval(timer);
}

  if(seconds>=0 && seconds<=58)
  {
    seconds++;  
  }
else
{
  if(minutes>=0 && minutes <=58)
  {
    seconds=0;
    minutes++;
  }
  else
  {  seconds=0;
      minutes=0;
      hours++;
      
  } 
}
}
,1000)




console.log(timer);























