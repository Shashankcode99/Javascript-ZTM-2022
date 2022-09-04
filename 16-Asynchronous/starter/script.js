'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////


/*
AJAX stands for Asynchronous Javascript and XML.
It allow us to communicate with remote web servers asynchronously.
With AJAX cals we can request data from web servers dynamically.
*/


//There are multiple ways of making an XML request,but we will start with the old school one.


const renderCountry = function (data) {
  const html = `<article class="country">
<img class="country__img" src=${data.flag} />
<div class="country__data">
  <h3 class="country__name">${data.name}</h3>
  <h4 class="country__region">${data.region}</h4>
  <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
  <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
  <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
</div>
</article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;

}


const getCountry = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data1, data2] = JSON.parse(this.responseText);
    console.log(data2);
    renderCountry(data2);
  })
};

// getCountry('india');
// getCountry('portugal');
// getCountry('usa');
// getCountry('australia');
// getCountry('sri lanka');


//How Web Works?

/*
The whole process of cient sending a request to entire webpage or for data from a web api and getting 
back the response is known as 'CLIENT-SERVER RCHITECTURE' OR 'REQUEST REPSONSE MODEL'.


Step 1: The DNS (Domain Name Server) is the middle man wich converts the domain name to the Internet Address 


                     (DNS)
i.e https://abc.com -------> http://123.322.212.0.443   (443 is for 'https' and 80 is for 'http')


Step 2:  TCP/IP(Transmission Control Protocol/Internet Protocol) Connection is established and 
 remain active till the response is rece 




*/




// CALLBACK HELL

//This is for getting neighbour count depending upon the response from the bove call
const getCountryNeighbour = function (country) {

  //AJAX call for getting country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data1, data2] = JSON.parse(this.responseText);
    console.log(data2);
    //get country 1
    renderCountry(data2);

    //get neighbour country 1
    const neighbour = data2.borders[0];

    if (!neighbour) return;
    else {
      //AJAX call to get country 2
      const request2 = new XMLHttpRequest();
      request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
      request2.send();

      request2.addEventListener('load', function () {
        const data3 = JSON.parse(this.responseText)
        console.log(data2);

        //get country 1
        renderCountry(data3);
      });

    }
  }
  )
}

getCountryNeighbour('portugal');





//PROMISES

/*
A promise is an object which used as a placeholder for the fuuture result of an asynchronous request  


LIFECYCLE OF A PROMISE:

PENDING (before the future value is available)
                 |
                 |  ASYNC TASK 
                 v                 
SETTLED (asynchronous task has finished)
         ____________________
        |                    |
        |                    |  
        v                    v 
  FULFILLED PROMISE        REJECTED PROMISE
  (data is fetched           (async task 
    successfully)             got errored)


*/


const getCountryData = function (country) {
  fetch(`https://restcountries.com/v2/name/${country}`).then(function (response) {
    console.log(response);
    return response.json();
  }).then(function (data) {
    console.log(data);
  })
}

getCountryData('india');



// PROMISE CHAINING

//using the same "getting neighbour country" example



const getCountryNeighbourData = function (country) {
  //Country 1
  fetch(`https://restcountries.com/v2/name/${country}`).then(response => response.json()).then(data => {
    renderCountry(data[0])
    const neighbour = data[0].borders[0];
    if (!neighbour) return;

    //Country 2
    else {
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
    }
  }).then(function (data) {
    return response.json();
  }).then(data => renderCountry(neighbour)).catch(err => alert(err));
};
getCountryData('india');



// Handling Rejected Promise
//using .catch (it will be used as global error handler 
//(i.e error inside the chain or at the end of the chain))

//Given in above example only (at the end) 





//EVENT LOOP (SUPER IMPORTANT)


/*
What is concurrency model?
-> How javascript handles multiple task happening at the same time.



BAsically we have the runtime browser which comproses of all the 
necessary pieces which are required for executing the Javascript code 

1. Js Engine 
   _______________________________________________________________      
  |                                                               |
  v                                                               v
 Call Stack (where the code is executed )        Heap (memory for object storage )

2. Web API's (fetch API, DOM etc)

3. Call back queue





What does Event Loop does?

It basically checks the call stack (regradless of the global execution context) whether the stack
is empty or not. If it finds it empty it will then take the first callbvack from the callback queue
and will put it in the call stack to be executed.

This is known as "EVENT LOOP TICK" i.e each time it will make a callback to the call back queue and r
returns a callback.




What is microtask queue?

The callback coming from the promises are being kept inside a special queue that is known as microtask queue.
It has a speciality of having priority over the call back queue.

It will first empty the entire priority queue an then the callbacks from callback queue will start moving into 
the call stack. 



Microtask Queue always have priority over Callback Queue.
*/



//Event loop in Practice

console.log("1st LOC Executed");
setTimeout(() => console.log(`2nd LOC Executed --> 0 Seconds Timeout`), 0);
Promise.resolve('Resolved First Promise: ').then(res => console.log(`${res} 3rd LOC is Executed`));


Promise.resolve('Resolved Second Promise: ').then(res => {
  for (let i = 0; i < 100; i++) { };
  console.log(`${res} 4th LOC is executed`);
})
console.log(`5th LOC is executed`);




// ***** Important: Building Promises from scratch

//We build a promise using the promise constructor and it takes one executor function as argument


let lotteryPromise = new Promise(function (resolve, reject) {

  console.log(`Lottery Draw is Happening`);
  setTimeout(function () {

    if (Math.random() > 0.5) {
      resolve("WINNER WINNER CHICKEN DINNER");
    }

    else {
      reject(new Error("OOPSIE!! BETTER LUCK NEXT TIME!"));
    }
  }, 2000)
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));






//Promisifing Geolocation API

navigator.geolocation.getCurrentPosition(position => console.log(position),
  error => console.error(error));


const getPosition = function () {


  return new Promise(function (resolve, reject) {

    navigator.geolocation.getCurrentPosition(position => resolve(position), error => reject(error));
  })
}


getPosition.then(pos => console.log(pos)).catch(err => console.error(error));





//Consuming Promises with Async Await

//Async functions are special functions generated using keyword 'async'.
// An async function can have one or more await inside of it .
// await basically waits for the execution of a particular part of code before going further.


//async await is nothing but syntatic sugar for promises $ .then(),
// as behind the scenes it is working as a promises only.


//Example

const whereAmI = async function (country) {

  const res = await fetch(`https://restcountries.com/v2/name/${country}`);
  console.log(res);

  const data = await res.json();
}

whereAmI(portugal);
console.log("Woah");




//Error Handling with async/await

//We cannot use .catch() with async/await hence we came across new phenomenon known as 'try-catch block';

//Syntax with Example


const whereAmI2 = async function (country) {
  try {
    const res = await fetch(`https://restcountries.com/v2/name/${country}`);
    console.log(res);

    const data = await res.json();
  }
  catch (err) {
    console.error(err);
  }
}

whereAmI2(portugal);
console.log("Woah");



//Running Promises in Parallel (Promise.all)




const getJSON = function (msg, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg}  (${response.status})`)
    }

    return response.json();
  })
}





const get3Countries = async function (country1, country2, country3) {
  try {

    //The below 3 ajax call will be done one after another for e.g 680ms, 682ms, 684 ms 
    // const [data1] = await getJSON(`https://restcountries.com/v2/name/${country1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v2/name/${country2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v2/name/${country3}`);
    // console.log([data1.capital, data2.capital, data3.capital]);


    /* MAIN POINT TO REMEMBER */

    // But in order to run them parallelly(all at the same time),
    // we have to use a Promise constructor method i.e Promise .all which takes an array of promises
    // and then return a single promise

    const parallelPromiseResult = await Promise.all([getJSON(`https://restcountries.com/v2/name/${country1}`), getJSON(`https://restcountries.com/v2/name/${country2}`), getJSON(`https://restcountries.com/v2/name/${country3}`)])

    console.log(parallelPromiseResult); //returns an array of array's which contain object of details

    //But Promise.all short circuits when 1 of the promises is rejected

  }
  catch (err) {
    console.log(err);
  }
}

get3Countries('portugal', 'canada', 'india');



//PROMISE COMBINATORS : 'race' , 'allSettled' and 'any'

// 1. Promise.race 

/* It also takes an array of promise and returns a single promise.
 In Promise.race basically first settled promise wins the race. 

 Given below is an example using IIFE
*/

(

  async function () {

    const res = await Promise.race([getJSON(`https://restcountries.com/v2/name/italy`), getJSON(`https://restcountries.com/v2/name/india `), getJSON(`https://restcountries.com/v2/name/mexico `)])
    //So which promise will win the race (executes first, it will be the output promise for entire result)

    console.log(res[0]); //out of the above 3 only 1(which will execute first) will be executed. 
  }
)

  ();


// 2. Promise.allSettled (came in ES2020 )

/* It is as simple as its name.
  It will never short circuit and will return all the Promises. 
  Hence it will return all resolved as well as rejected promises also.
    */


  Promise.allSettled([ 
    Promise.resolve('Success!'),
    Promise.reject('Failed'),
    Promise.resolve('Success Again!')
  ])


  // 3. Promise.any (came in ES2021: Latest)

  /* It is somewhat similar to Promise.race but it do not consider rejected ones.
    It will return the first 'resolved' promises only and ignores the rejected promises 
    (always gonna be a fulfilled promise) .
    */


  Promise.any([ 
    Promise.resolve('Success!'),
    Promise.reject('Failed'),
    Promise.resolve('Success Again!')
  ])