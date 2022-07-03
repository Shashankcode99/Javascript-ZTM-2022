'use strict';

const booking = [];

const flight_booking = function (flightNum, price = '$499', passengerNum = 80) {

    const booking_object = {
        flightNum, //advance object literal technique to create object simply by using the property name
        price,
        passengerNum
    }

    booking.push(booking_object);

}

flight_booking('ASIA201', '$1200', 120);

flight_booking('ASIA202', '$1300', 120);

flight_booking('ASIA203', '$1400', 120);

flight_booking('ASIA204', undefined, 120);//we can skip arguments instead we can write undefined for them

console.log(booking);
console.log('\n');




//Passing arguments i.e Pass by value and Pass by reference


//***Important Key point***
//Javascript only have pass by value and no pass by reference . Though it looks like it have pass by by reference but in
//realoty it dont.

const flightCode = 'ASIA20';
const passenger_details =
{
    "name": 'Shanky',
    "passport_number": 2013465789
}


const passing_values_function = function (flightName, passenger) {
    flightName = 'LH880'; //will not changes the original object as value is passed 
    passenger.name = 'Mr.' + passenger.name;  //Changes the original object as the reference is passed
    //In reality it is passing reference o the same object present in the heap

    if (passenger.passport_number === 2013465789) {
        console.log("Right choice");

    }

    else {
        console.log('Wrong')
    }
}


//before calling the fucntion
console.log(flightCode);
console.log(passenger_details.name);
console.log(passenger_details);


console.log('\n');

passing_values_function(flightCode, passenger_details)


//after calling the function
console.log(flightCode);
console.log(passenger_details.name);
console.log(passenger_details);




//First Class Functions and High Order Functions



//FIRST CLASS FUCNTIONS
//______________________

//First class functions are the first citizens
// First clss fucntion are treated as simple values only
// First class function are just another 'type' of object.


// Basically we can,
//--------------------
//  Store a fucntion into a variable i.e fucntion expressions

//  Using them as values inside an Object

//  Passing the fucntions(callbacks)

//  Returning a fucntion


//We can also use methods on functions for example .bind etc



//HIGHER ORDER FUCNTIONS
//_______________________

// As we have first class functions we can also make higher order functions

// Higher order fucntions are those which 'recieves a function as an argument' or 'returns a function', or 'BOTH'

//For example addEventListner(click, function) ---> The event Listener receives a callback function.


//  function add()  ---> " This is higer order function "
//  {
//     let a=20;
//     let b=20;

//     return count()   ---> " returned function "
//     {
//         console.log('BRAVO');
//     }
// }



// **** REALLY REALLY IMPORTANT *****
//CALLBACKS

//1. Main use is Abstraction (Hiding not so impportant details)
//2. Makes code more resusable



//FUNCTIONS RETURNING FUNCTIONS


const greet = (greeting) => {
    return (name) => {
        console.log(`${greeting} ${name}`);
    }
}

const output = greet('Hello'); //output stores returned function
output('Shanky'); //passes the arguments to that returned function

greet('Hey')('Yuvansh'); //doing same thing as above but in a single step








//CALL AND APPLY METHOD

const airline_details1 = {

    airline: 'INDIGO',
    airline_code: 'IND001',
    booking: [],
    book(flightNum, name) {
        console.log(`${name} booked a seat on ${this.airline} flight ${this.airline_code} ${flightNum}`);
        this.booking.push({ flight: `${flightNum}`, Passenger: `${name}` })
        console.log(this.booking);
    }


}

airline_details1.book(200, 'Shanky');


const airline_details2 = {

    airline: 'AIR INDIA',
    airline_code: 'IND002',
    booking: [],
}
// ________________________________
//ALERT: Uncomment this example while using console to check the error type
// const booking2=airline_details1.book;
// booking2.book(300,'Yuvansh'); //error alert!
//_____________________________________

//DISCLAIMER: Read it properly

//but this will throw an error as the book function is now stored in a variable and here the concept of 
// 'this' keyword gets violated and hence it will give you undefined for values such as 'airline',
// 'airline_code'and whatever is used with 'this' keyword.


//Here we have to expicity tell this keyword how to behave in different scenarios.

// So to make this scenario possible we use call, apply and bind.


//So in order to the above example we will be using the call method as given below by giving the 
// name of the object as arguments and other values which we have to pass for that particular function



const booking3 = airline_details1.book;
booking3.call(airline_details2, 50, 'Kapil');

//here we are giving the object to which the 'this' keyword will now give reference to



//Apply Method  
//(in modern javascript it is used rarely instead we use the CALL method only).

//It is similar to the call method but the onlydifference is that it do not takes 
// the arguments for the function after the object name, instead it takes an
// array of those arguments

//Example

let swissAirline =
{
    airline: 'Swiss Airline',
    airline_code: 'IND003',
    booking: [],
}

const swissValues = [150, 'Vipul']
const booking4 = airline_details1.book;
booking4.apply(swissAirline, swissValues);



//BIND Method

// Like call and apply it also allows to explicitly/manually set the 
// 'this' keyword forany function call

//What makes it different is that it do not immediately call the function.
//Instead it return a new function



//In the given below example you can easily use the bookSwissAirline 
// rather tha using call method again and again.

const bookSwissAirline = booking4.bind(swissAirline);
bookSwissAirline(23, 'Amanpreet');


//We can use this bind method to make a speific function for sme specific task 
//with some specific values. For example

const bookSwissFlight23 = booking4.bind(swissAirline, 23, 'Ravinder');




// ***Important***  BIND Method with event listeners

//You have to click the 'BUY ANEW PLANE' button on the screen and then output will reflect in the console.
//Firstly add new properties to swissAirline object

swissAirline.planes = 300;
swissAirline.buyPlanes = function () {
    console.log(this);

    this.planes++;

    console.log(this.planes);
}

//IMPORTANT POINT: in an event handler the this keyword will point to the 
// element is attached to


document.querySelector('.buy').addEventListener('click', swissAirline.buyPlanes.bind(swissAirline));





//PARTIAL APLLICATION OF THE 'bind' method where dont really care about 'this'

const addTax = (rate, value) => value + rate * value;
console.log(addTax(0.5, 120));


//Now if you want a particular tax which is going to be used inside your code 
// then you can use the bind method with the function
//here we dont pass the 'this' explicitly instead we give null in parameters

const VAT = addTax.bind(null, 0.23);
console.log(VAT(150));




const addTaxFunc = (rate) => {

    return (value) => {
        return value + value * rate;
    }
}


const taxVAT = addTaxFunc(0.23);
const result = taxVAT(1000);
console.log(result);






const poll = {
    question: "What is your favourite programming language?",
    options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
    // This generates [0, 0, 0, 0]. More in the next section! 
    answers: new Array(4).fill(0),


    registerNewAnswer() {
        const choice = Number(prompt(`${this.question}\n ${this.options.join('\n')}`));

        typeof choice === 'number' && choice >= 0 && choice < this.options.length && this.answers[choice]++;
        this.displayResults();
        this.displayResults('string');
    },


    displayResults(type = 'array') {

        if (type === 'array') {
            console.log(poll.answers);
        }

        else if (type === 'string') {

            console.log(`Poll results are ${this.answers.join(', ')}`);

        }

        else {
            console.log('Given type is wrong!');
        }

    }
}

document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));







// IIFE (Immediately Invoked Function Expression)

//Fucntion which executes only once will never run again. MAjorly used with async await


//you cant simply make a function without giving it a name and hence to make it possible you can trick
// javascript by simply making it an expression but wrappig them inside parenthesis
(
    function()
{
    console.log('This will never run again!');
}
)(); //Immediately calling the fucntion here 




//Closures 

//Closures is basically about lexical scoping (global -> parent -> child )


//EXAMPLE 1 OF CLOSURE
const secure_boooking=function()
{ 
    let passenger_count = 0;
    return function(){
        passenger_count++;
        console.log(`Total Passengers: ${passenger_count}`);
    }
}
    
const passenger_booking = secure_boooking();

passenger_booking();
passenger_booking();
passenger_booking();
passenger_booking();


//Closure is nothing we create instaed it is something
//which get created automatically in some situations


// a function has access to its variable environment of the execution context 
// in which it was created


//CLOSURE: Variable Environment attached to the fucntion,exactly it was at the time 
// and place it was created


console.dir(passenger_booking); //This will actually give the function which
//contains all possible details regarding closure




//EXAMPLE 2 OF CLOSURE


let _result;

let closure_function1= function()
{
const answer=10;

_result= function()
{
    console.log('This is calculated answer is: ',answer*2);
}
}


let closure_function2= function()
{
const answer=100;

_result= function()
{
    console.log('This is calculated answer is: ',answer*2);
}
}

closure_function1();
_result();
console.log("Before Reassigning:\n");
console.dir(_result);


//Reassigning the _result 
closure_function2();
_result();
console.log("After Reassiging:\n");
console.dir(_result);



//EXAMPLE 3 OF CLOSURE

//Closures have priority above scope chain i.e if there is a variable in the global
// scope and with the same name it has inside the function with which it is making 
// closure than the value in the closure for that psrticular variable will be used.
const boardPassenger= function(no_of_passenger, wait_time)
{
    //dividing pssengers into groups

    const perGroup=no_of_passenger/3;

    setTimeout(function()
    {
console.log(`we are now boarding ${no_of_passenger} passengers.`);
console.log(`Total Passengers per group are: ${Math.floor(perGroup)}.`);
    },wait_time*1000);

console.log(`The flight will start boarding in ${wait_time*10} seconds`);

}
boardPassenger(1000,3);



//A coding exercise to convert red color of the heading to blue when
//the body of the document gets clicked

(function () {
    const header = document.querySelector('h1'); 
    header.style.color = 'red';

    document.querySelector('body').addEventListener('click',function(){
        header.style.color='blue';
    })
    })();