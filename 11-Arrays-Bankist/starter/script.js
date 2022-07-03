'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

//Adding initials to the accounts
accounts.forEach(function(acc)
{
  acc.username = acc.owner.toLocaleLowerCase().split(' ').map(value => value.slice(0,1)).join('');
})

console.log(accounts);






//function to display all the movemenst
const displayMovements=function(movements)
{
  containerMovements.innerHTML='';
  movements.forEach(function(value,index)
  {
   
    const type= value>0? 'deposit':'withdrawl';
    const html=`
    <div class="movements__row">
     <div class="movements__type movements__type--${type}">${index+1} ${type}</div>
     <div class="movements__date">3 days ago</div>
     <div class="movements__value">${value}€</div>
    </div>`;  


    containerMovements.insertAdjacentHTML('afterbegin',html);
}
  )
}
displayMovements(account1.movements);







//function to calculate and display the balance 
//(here we are only calculating for 1 account object i.e account1 in the given example)
const calcDisplayBalance = function(accs)
{
  accs.balance=accs.movements.reduce((acc,curr)=>acc+curr,0);
  //  labelBalance.textContent=`${balance} EUR` ;
}

calcDisplayBalance(account1);






//function to calculate the summary of the movements 
const calcDisplaySummary= function(account)
{
  const IN=account.movements.filter(mov => mov>0).reduce((acc,mov)=> acc+mov,0);
  const OUT=account.movements.filter(mov => mov<0).reduce((acc,mov)=> acc+mov,0);

  labelSumIn.textContent=`${IN}`;
  labelSumOut.textContent=`${Math.abs(OUT)}`;

  const interest = account.movements.filter(mov=> mov>0).map(deposit => deposit * account.interestRate / 100 ).reduce((acc,deposit)=> acc+deposit,0);

  labelSumInterest.textContent=`${interest}`;
}


calcDisplaySummary(account1);



//Updating UI


const updateUI=function(currAccount)
{
  displayMovements(currentAccount.movements);

  calcDisplayBalance(currAccount);
  
   calcDisplaySummary(currAccount);
}

 

//LOGIN DISPLAY FUNCTIONALITY
let currentAccount;

btnLogin.addEventListener('click',function(e)
{
e.preventDefault();
console.log(`\n`);
console.log('LOGGED IN');

currentAccount=accounts.find(acc => acc.username=== inputLoginUsername.value);
console.log(currentAccount);
if(currentAccount?.pin===Number(inputLoginPin.value)) 
//here we have used optimal chaining i.e firstly it is checking whether the current exist or not
// and if this is true then only it will read the 'pin' property
{
labelWelcome.textContent=`Welcome ${currentAccount.owner.split(' ')[0]}`;
containerApp.style.opacity=100;

inputLoginUsername.value=inputLoginPin.value='';
inputLoginPin.blur();

 updateUI(currentAccount);
}

})



// Money Transfer Functionality

btnTransfer.addEventListener('click', function(e)
{
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username=== inputTransferTo.value);

console.log(amount,receiverAcc);

  if(amount>0 && currentAccount.balance >=amount && receiverAcc?.username!==currentAccount.username){
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount); 

    updateUI(currentAccount);
  }

  inputTransferAmount.value=inputTransferTo.value=''; 
})





//Closing An Account (removing it from array of object)

btnClose.addEventListener('click',function(e)
  {
    e.preventDefault();
    
      if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin)
      {
        const closeUserIndex = accounts.findIndex(acc => acc.username === currentAccount.username);
        accounts.splice(closeUserIndex,1);
        containerApp.style.opacity=0;
  }
  inputCloseUsername.value=inputClosePin.value=''
}
  );




  //LOAN Approval Functinality


  btnLoan.addEventListener('click',function(e)
  {
    e.preventDefault();


    const loanAmount=Number(inputLoanAmount.value);
if(loanAmount>0 && currentAccount.movements.some(value=> value>= loanAmount*0.1 ))
{
  currentAccount.movements.push(loanAmount);
  updateUI(currentAccount);
}

inputLoanAmount.value='';

  });






/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////


//ARRAY Methods

//1) slice -> only returns a result(part of array) and do not modify/mutates the actual array
console.log('\n SLICE METHOD \n');



console.log(movements.slice(2));
//return values from the given index to the end of the array

console.log(movements.slice(2,6)); //rear index is excluded(not included)

console.log(movements.slice(-1)); 
//return last values from the result (i.e whatevere number you have 
// specified that last number of value will get returned )

// Output:1300

console.log(movements.slice(-2)); 
//Output : 70,1300

console.log(movements.slice(-5));
//Output: 3000,-650,-130,70,130

console.log(movements.slice(2,-4));
//The result will start from the start index and extracts except the number of value given as the 
//end index in parameters.

console.log(movements); //*****DO NOT MUTATES THE ORIGINAL ARRAY*******//




//2) splice (it works the same as slice but it mutates the original array)
// it is used to delete the values from the original array

console.log('\n SPLICE METHOD \n');

const dupli_array=[...movements];
console.log(dupli_array.splice(2,6)); 
// IMPORTANT ALERT: Here rear index is the number of element you want to remove (here you are removing
// 6 elements from the array startig from position 2)

// array.splice(index_from, number_of_element_to_be deleted)


console.log(dupli_array); //******MUTATES THE ORIGINAL ARRAY******//




//3) reverse
// it not only reverese the array 

console.log('\n REVERSE METHOD \n');
const vowels=['u','o','i','e','a'];
console.log(`Array before reversing: ${vowels}`);

vowels.reverse();

console.log(`Array after reversing: ${vowels}`); //*****MUTATES THE ORIGINAL ARRAY*******//



//4) concat
// used to concat two array's 

console.log('\n CONCAT METHOD \n');
const arr1=[10,15,20];

const arr2=[11,22,33];

console.log(arr1.concat(arr2));

console.log(arr1); //*****DO NOT MUTATES THE ORIGINAL ARRAY*****//




//5) join 

// used to join values of array using some value such as separator(, / ! etc)
// it will return a string

console.log('\n JOIN METHOD \n');
const letters=['a','b','c','d','e'];
console.log(letters.join('-'));

 




//FOREACH METHOD
//It basically iterates over each value of the array and performs a task specified written inside the 
// function which is used as a callback.

//forEach is also known as higher order fucnion because it uses a callback fucntion.

//for Each passes in value,index and the entire current array.

//Disadvantage: we "cannot use break/continue" with forEach as it loops over entire array only.



console.log(`\nforEach method`);
console.log(`----------------`);

const amount=[10,200,250,7,9,520,670,11]


amount.forEach(function(value,index,array)
{
  if (value>=200)
  {
    console.log(`${index}:You have deposited ${value} from ${array}`);
  }
  else{
    console.log(`${index}:You have deposited ${value} from ${array}`);
  }
})


 
// forEach with MAPS AND SETS

console.log(`\nforEach method on MAPS`);
console.log(`----------------`);
const MAP=new Map(
  [
    ['USA', 'Dollar'],
    ['ARAB', 'Dinar'],
    ['INDIA', 'Rupee']
  ]
)

MAP.forEach(function(value,key,map)
{
console.log((`${key}: currency is ${value} from ${map}`));
})


//no repetition of output on duplicate values 

console.log(`\nforEach method on SETS`);
console.log(`----------------`);
const SET=new Set(
['USD', 'GBR','EURO','EURO','USD','DINAR']    
)

SET.forEach(function(value,index,set)
{
console.log((`${index}: currency is ${value} from ${set}`));
})










console.log('\n');
console.log('\n');
console.log('\n');
console.log('DATA TRANSFORMATIONS: MAP,FILTER AND REDUCE');


console.log('\n');

console.log('1. MAP Method');
console.log('-------------');

// The 'MAP' method is a higher order fucntion which is used to loop over an original array and
// apply some functionality defined inside a callback function, over each element of the original 
// array and then return a brand new array with transformed value;

//Like forEach Map function also get access to three values i.e value,undex and whole array

// do we can use any of them in the callbacks. Below given is a genral example

// function(value, index, array){
// return index;
// }

const original_array=[1,2,3,4,5];

const mapped_array = original_array.map(function(value)
{
 return  value*2;
});

console.log(`Original Array is ${original_array}`);
console.log(`Array Transformed using Map method is ${mapped_array}`);



console.log('\n');

console.log('2. FILTER Method');
console.log('----------------')

// The 'FILTER' method is basically a higher order function which is used to filter out
// some value based on a condition provided by the callback function and then return the brand new 
// array with filtered values.

const original_array2=[0,1,2,10,15,20,25];

const filtered_array = original_array2.filter(function(value)
{
 return  value>2;
});

console.log(`Original Array is ${original_array2}`);
console.log(`Array Transformed using Map method is ${filtered_array}`);





console.log('\n');

console.log('3. REDUCE Method');
console.log('----------------')

//We use the 'REDUCE' method to boil down all the values of the array into a single output.
//The callback function will have 2 parameters i.e accumulator and current value.

// current value will be the value of the array where the index is being pointed.
// accumulator is basically the storage where the result is being acculmulated as per the condition 
// provided

const original_array3=[1,2,3,4,5];
const reduce_array_output = original_array3.reduce(function(accumulator,current)
{
return accumulator+current;
}
)

console.log(`Original Array is ${original_array3}`);
console.log(`Array Transformed using Map method is ${reduce_array_output}`);



//Finding maximum value using reduce
console.log(`\n`);
const findMaximumValue = function(movements)
{
  let maxValue= movements.reduce((acc,curr)=>curr>acc?curr:acc,movements[0]);
  console.log('Maximum value of the array is : ',maxValue);
}

findMaximumValue(account2.movements); //[5000, 3400, -150, -790, -3210, -1000, 8500, -30]




// The 'FIND' method is also  higher order function which recieves a callback function,
// but unlike filter it will return only the first value of the array which satisfies the given 
// condition/logic specified in the callback function

//Basically find methjod is used to find only one value 


console.log('\n');

console.log('4. FIND Method');
console.log('----------------')
//Example No. 1
const findOutput = movements.find(mov => mov<0); 
console.log(findOutput);
// movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// findOutput = -400; 



//Example No. 2

const findJessica = accounts.find(acc => acc.owner==='Jessica Davis');
console.log(findJessica);




/// The 'FINDINDEX' method is also  higher order function which recieves a callback function,
// but unlike filter it will return only the index of the firstelement of the array which satisfies the given 
// condition/logic specified in the callback function



console.log('\n');

console.log('4. FIND INDEX Method');
console.log('----------------')


//Example No. 1
const FINDINDEX = movements.findIndex(mov => mov<0); 
console.log(FINDINDEX);
// movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// findOutput = 2; 



//Example No. 2

const findJessicaIndex = accounts.findIndex(acc => acc.owner==='Jessica Davis');
console.log(findJessicaIndex);








// 'SOME' method is a higher order function which recieves a callback.
// The some method works in such a way that if even 1 of the values in the array matches the
// condition of the callback function the output will be TRUE but if none of the value matches the
// as per the logic of the callback then it will return TRUE


console.log('\n');

console.log('5. SOME Method');
console.log('----------------')

const someArray=[2,3,4,6,8,10];

const positiveResult= someArray.some(value => value%2 !=0 );
console.log("Positive Result using SOME method: ", positiveResult);

const negativeResult =someArray.some(value => value<0);
console.log("Negative Result using SOME method: ", negativeResult);




// 'EVERY' method is a higher order function which recieves a callback.
// The every method works in such a way that only if all of the values in the array satisfies the
// condition of the callback function the output will be TRUE but if none of the value matches the
// as per the logic of the callback then it will return TRUE


console.log('\n');

console.log('5. EVERY Method');
console.log('----------------')

const everyArray=[2,3,4,6,8,10];

const positiveResult1= someArray.every(value => value > 0 );
console.log("Positive Result using EVERY method: ", positiveResult);

const negativeResult1 =someArray.every(value => value%2==0);
console.log("Negative Result using EVERY method: ", negativeResult);







//FLAT Method: When you have a an array of array's aand value together i.e [[1,2,3],[4,5],6,7,8] but you
// want them to be a single array of values only then you use flat method.
//It do not mutates the original array.


//But flat method goes only 1 level deep (1 level nesting is only treated)
// more than 1 level nesting is not treated


//In order to do multi level nesting treatment we use the depth argument i.e flat(2) where the number 
// determines upto which level you want to treat the nesting

console.log('\n');

console.log('5. FLAT Method');
console.log('----------------')

const level1Array =[[1,2,3],[4,5],6,7,8];

console.log(level1Array.flat());

console.log(level1Array);




const multiNestedArray =[[1,[2,3]],[4,[5,6]],7,8];


console.log("Flat without depth argument for multinesting:",multiNestedArray.flat());

console.log(multiNestedArray);




console.log("Flat with depth argument for multinesting:",multiNestedArray.flat(2));

console.log(multiNestedArray);





// FLATMAP MEethod: It is basically a combination of falat and map method. It is introduce for better
// performance. But unlike flat it will recieve a callback for map functinality
// But here we are not able to use concept of depth argument.

console.log('\n');

console.log('5. FLATMAP Method');
console.log('----------------');

const  allAccountsMovements = accounts.flatMap(acc => acc.movements);
const overallBalance = allAccountsMovements.reduce((acc,curr)=> acc+curr,0);
console.log(allAccountsMovements);
console.log(overallBalance);







//***Important***
//SORT Method: It is used to sort the value but the glitch here is as follows:
// "sort method does soring on basis of strings". So basically if you sort an array of string then 
// the array will be sorted but if you try to do it with numbers then output wont be sorted as desired
console.log('\n');

console.log('5. SORT Method');
console.log('----------------');
const stringArray = ["z", "y", "m", "n", "b", "a"];
console.log(stringArray.sort());
// ['a', 'b', 'm', 'n', 'y', 'z']  //CORRECTLY SORTED


const numberArray = [2,10,-6,100,-37,1111];
console.log(numberArray.sort());
// [-37, -6, 10, 100, 1111, 2]    //WRONGLY SORTED

 

//Question: What to do if for correctly using sort method?
// Pass a callback function and keep in mind the below given points:


// 1. we pass two arguments in callback function i.e current and next value 

// 2.  ' B , A ' we have to return a positive value  (switch the order)

// 3.  ' A , B ' we have to return a negative value (keep the order)



//Example:
//[200, 450, -400, 3000, -650, -130, 70, 1300],

const sortedMovemenst=account1.movements.sort(function(curr,next)
{
  if(curr>next)
  return 1;  //keeping the order

else
return -1;  //switching the order

});

console.log(sortedMovemenst);



//*Important*  Making it shorter

// const sortedMovemenst=account1.movements.sort(a-b);

/* Here we are doing a-b i.e a > b and hence it is return a positive value i.e (chaging the order )*/









// EMPTY ARRAY USING ARRAY Constructor
// we cannot use normal methods on empty array except 1 i.e. fill() method
console.log('\n');

console.log('5. SORT Method');
console.log('----------------');
const empty_array=new Array(10); //creates and empty array of size 10

console.log(empty_array);



//fill(value) to fill array with single value

empty_array.fill(1);
console.log(empty_array);

// fill( value, start_index, last_index(excluded) )

empty_array.fill(3, 4, 8);
console.log(empty_array);





// ARRAY FROM  

// Array.from( length_object, callback_function)


//Example 1: creating an array of size 10 with only 1's in it.


const z=Array.from({length:10}, ()=>1);
console.log(`Array with 1's is : ${z}`);
 

//Example 2 : creating an array with consecutive value i.e 1,2,3 and so on


const y= Array.from({length:10}, (curr,index)=>index+1); 
//here we are not using 'curr' argument so we can also write '_' in place of that i.e (_ ,index)=>index+1)
console.log(`Array with consecutive values is : ${y}`);



//REAL USECASE OF ARRAY.FROM IS TO GENERATE ARRAY FROM OTHER ARRAY LIKE ITERABLE'S SUCH AS STRINGS, OBJECTS
