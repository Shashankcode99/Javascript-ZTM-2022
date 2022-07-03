'use strict';


//Topics in this file:

// 1. Destructuring Array
// 2. Destructuring Object
// 3. Spread Operator (unpacks array elements)
// 4. Rest Operator (packs elements into an array)
// 5. Short Circuiting (|| or &&)
// 6. Nullish Coalescing Operator
// 7. for-of loop
// 8. Advanced Object Literals

// 9. Sets and Map
// 10. What datastructure is to be used when

// 11. Strings 




// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  Name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],




  order1: function (startIndex, lastIndex) {
    return [this.starterMenu[startIndex], this.mainMenu[lastIndex]];

  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//DESTRUCTURING 
//Destructuring is basically breaking down a bigger data structure into a smaller data structure.



// 1. DESTRUCTURING ARRAY

//KEY POINT:   ORIGINAL ARRAY IS NOT AFFECTED
const arr = [1, 2, 3]
const [x, y, z] = arr;
console.log(x, y, z);


//using arrauy from the object i.e categories
const [first, second] = restaurant.categories;
console.log(first, second);
//gives Italian Pizzeria



//skipping the value by simply using blank space in the destructing assignment i.e [ first,  , second]
const [firstx, , secondx] = restaurant.categories;
console.log(firstx, secondx);
//gives Italian Vegetarian(i.e 3rd value of the categories will get stored in the secondx varibale)






//For swapping two value.
// -------------------------------

// Without destructuring

let [main, secondary] = restaurant.categories;
let temp = main;
main = secondary;
secondary = temp;
console.log("Without Destructuring = ", main, secondary);



//With help of Destructuring we assign the values with inverted array of inverted values
//This is called Mutating the variables.
[main, secondary] = [secondary, main]

console.log("With Destructuring = ", main, secondary)






//Destructuring value returning from a custom function

let [breakfast, lunch] = restaurant.order1(2, 1);  //here we are passing index and destructuring the returned array in new array

console.log("For Breakfast we have :", breakfast);
console.log("For Lunch we have :", lunch);




//Destructuring with nested Array

let nestedArray = [2, 4, ['apple', 'lemon']];

const [l, , fruits] = nestedArray;
console.log(l, fruits); //destruct.. 

//output:  2 [apple, lemon]



//Destructuring inside Destructing
const [k, , [fruit1, fruit2]] = nestedArray;
console.log(k, fruit1, fruit2);





// we can simple define default values otherwise undefined will get logged

const [p, q, r] = [8, 9];
console.log(p, q, r);

//p=8,q=9 and r=undefined, whereas in given below example


const [s = 1, t = 1, u = 1] = [8, 9];
console.log(s, t, u);

// //s8, t=9 whereas u=1(default value we have given);






// 2. DESTRUCTURING OBJECTS

//To destructure objects we use {} braces coz objects are defined by {} (simple as that)

//Basic Rule/Condition: USe same variable name for referencing the keys as JAvascript has no power to recognize the properties
const { Name, categories, openingHours } = restaurant;
console.log(Name);
console.log(categories);
console.log(openingHours);



//To somewaht overcome this problem we use a technique for giving cutsom name to keys as follows:

const { Name: restaurantName, categories: pizza, openingHours: timings } = restaurant;
console.log("Restaurant Name is: ", restaurantName);
console.log("Available Variety of Pizza's are: ", pizza);
console.log("Timings of the restaurant are as follows: ", timings);




//Accessing values which are not present in the object by giving them default values

const { menu } = restaurant;
console.log(menu);//will give undefined as we dont have any key named 'menu' in the oject

//whereas we can easily give that a default value so that even if it is not present it will 
//print some value


const { menu2 = ['default value printed'], starterMenu: starters = [] } = restaurant;
console.log(menu2, starters);


//Mutating Variables


let a = 100;
let b = 200;
const obj2 = {
  a: 500,
  b: 600,
  c: 700
};

console.log("Before mutating a =", a, " and b=", b);

// {a,b}=obj; 
//cant do this because the curly braces will act as the block and we cant do assignment to a block
//Error messgae: Uncaught SyntaxError: Unexpected token '=' 



//*Important*  so to remove this error we wrap everything inside the paranthesis ie ()
({ a, b } = obj2);
console.log("After mutating through DESTRUCTURING a =", a, " and b=", b);



//Netsed Array

const { fri } = openingHours;
console.log(fri);
const { fri: { open, close } } = openingHours;
console.log(fri);
const { fri: { open: openHour, close: closeHour } } = openingHours;
console.log(openHour, closeHour);








//SPREAD OPERATOR
// ----------------
//Its is basically used to expand an array into all its elements or unpacking all the
//array elements at one.

//Common practice

const array1 = [7, 8, 9];
const array_without_spread = [1, 2, array1[0], array1[1], array1[2]];
console.log("Array without using spread operator:", array_without_spread);

//with spread operator

const array2 = [100, 200, 300, 400];
const array_with_spread = [25, 50, 75, ...array2];
console.log("Array using spread operator:", array_with_spread);

console.log(array1); // Output: [7,8,9]
console.log(...array1);  // Output: 7 8 9


//Two use cases of spread operator :
// 1. Making a shallow copy of an array i.e somewhat similar to object.assign

const shallow_array = [...array2];
console.log(shallow_array);

// 2. Merge two arrays together

const merged_array = [...array1, ...array2];
console.log(merged_array);



//Point to be noted :  Iterables are arrays,strings,maps,sets but not objects.

//for strings:

const name = 'Shanky';
const spread_name = [...name, ' ', "S"];
console.log(spread_name);
//Output: ['S', 'h', 'a', 'n', 'k', 'y', ' ', 'S']



//Using spread operator in a function

const pasta = function (ing1, ing2, ing3) {
  console.log(`Topping for ypur pizza are: ${ing1}, ${ing2} and ${ing3} `);
}


const ingredients = ['mushroom', 'capsicum', 'tomatoes'];

pasta(...ingredients);


//Although objects are not iterables, spread operator can be used with them also

const newRestaurant = { ...restaurant, rum: 'oldMonk' };
console.log(newRestaurant);


//****Very Important*****: making a cpy of object and not affecting the original object
// (without using Object.assign())

const restaurantCopy = { ...restaurant };
restaurantCopy.Name = 'Pizzeria Mania (Name Changed)';

console.log(restaurant);
console.log(restaurantCopy);



//REST PATTERN AND PARAMETERS


//it has the same syntax as spread operator but it does the total opposite
//rest is basically packing elements in an array
//rest is used to collect and pack the remaining values into an array

// KEY POINT 1: the rest operator is always used in the last 
// KEY POINT 2: and there can only be one rest operator in the destructuring 



//WITH ARRAY
const [val1, val2, ...others] = [1, 2, 3, 4, 54, 67]
console.log(val1);
console.log(val2);
console.log(others);

//WITH OBJECTS
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat);
console.log(weekdays);


//WITH FUNCTIONS

const add = function (...numbers) {
  console.log(numbers);
}

add(2, 3);
add(100, 200, 300, 400);
add(999, 9999, 99999, 999999, 9999999, 99999999);



//  SHORTCIRCUITING(|| OR &&)

// OR(||)
// In || short circuiting the values are checked in way that if the first value is a falsy 
//value then it gets ignored and will give only truthy value as output.

//If there are multiple falsy values then it will skip those value until it gets its first truthy value


//In CS term || short circuits when gets firts truty value

//Examples

console.log(3 || 'true');   //3
console.log('' || 5); //5
console.log(undefined || null);  //null
console.log(null || '' || 0 || undefined || 'Hello' || 3 || 27);  //Hello




// AND(&&)
// In && short circuiting the values are checked in way that if the first value is a falsy 
//value then the circuit is breaked and it prints the value(just oppsoite of ||)

//If there are multiple truthy values then it will skip those value until it gets its first falsy value


//In CS term || short circuits when gets firts falsy value

//Examples

console.log(3 && 'false');   //false
console.log('' && 5); //''
console.log(undefined && null);  //undefined
console.log('Hello' && 3 && 27 && null && '' && 0 && undefined);  //null



//NULLISH COALESCING OPERATOR (??)

//wht are nullish value (only null and undefined)  not the ('' or 0)

//It basiclly works same as OR short circuit but only considering nullish values

//Example:

const value1 = 0;
const output1 = value1 || 10
console.log(output1);   //10

//checks for all types of falsy value (null,undefined, 0 and ' ');


const output2 = value1 ?? 10
console.log(output2);   // 0

const output3 = ' ' ?? 10
console.log(output3);   // ' '

// avoids 0 and ' ' and hence do not breaks the circuit at 0 or ' ' and prints them.

const output4 = undefined ?? 10
console.log(output4);   // 10

const output5 = null ?? 10
console.log(output5);   // 10

// Here it breaks the circuit at null or undefined and jumps to next value in the expression 
// and prints if finds it to bethe truthy value




//  ***Important***   for Of loop

// we can use continue and break with for of also

const _menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const i of _menu) {
  console.log(i);
  console.log('\n');
}

//to get the index it is a pain in for of loop as compared to normal for loop
//here we use .enteries() method

for (const item of _menu.entries()) {
  console.log(item);
  console.log('\n');
}


//what we get from _menu.entries()
console.log(_menu.entries());

//what we get when we destruvture _menu.entries()
console.log([..._menu.entries()]);   //key value pairs as an individual array

//we can do destructuring also
for (const [index, item] of _menu.entries()) {
  console.log(`${index + 1}:${item}`);
  console.log('\n');
}



//Advance Object literals

// CHANGES INTRODUCED IN ENHANCED OBJECT LITERALS
// 1. to copy an object inside another object just write the name of the object
// 2. you can simple write a function without creating a property

//Example to prove point 1

const obj_1 = {
  a: 10,
  b: 20,
  c: 30
}

//Now if you want to copy this object into another object you will genrally do this

const obj_2 = {

  g: 50,
  h: 100,
  i: 200,

  //usually this is bit annoying as the key and value both has same name
  // obje_1: obj_1
  //so in ES6 we can simply make copy an object inside another by just writing the name i.e

  obj_1  //obj_1 got copied
}

console.log(obj_2);





//Example to prove point 2

const obj_3 = {
  a: 1,
  b: 2,
  c: 3,

  addTwoNumbers(value1, value2) {
    return value1 + value2;
  }

}
console.log('\n');



// LOOPING OVER OBJECTS 
// We have 3 options :




// 1. Looping overs properties (keys)
const keys_array = Object.keys(openingHours)
console.log(keys_array);
for (const property of keys_array) {
  console.log("Property(key) of the Object is: ", property);
}

console.log('\n');

// 2. Looping over values
const value_array = Object.values(openingHours)
console.log(value_array);
for (const value of value_array) {
  console.log("Value of the Object is:", value);
}

console.log('\n');
// 3. Looping over entire object (using enteries)
const entries = Object.entries(openingHours)
console.log(entries);

for (const value of entries) {
  console.log("Pair of the Object is:", value);
}








// SETS

// Sets cannot have duplicates

//Syntax : const set_name = new Set(Iterable i.e array,strings etc)   

// Sets do not have the concept of index as they are unique so there is no point of 
// retrieving value from the set and we only check whether the 
//element is present in the set or not using the  has method

//set are iterables

//Example:

const orderedSet = new Set([5, 4, 3, 2, 1, 5, 4, 3, 2, 1]);
const orderedSet2 = new Set(['Shanky', 'Zeeshan', 'Aman', 'Deepambar', 'Yuvansh', 'Shanky', 'Aman']);

console.log(orderedSet);
console.log(orderedSet2);
console.log(new Set('Shankyy'));

console.log(orderedSet.size); //how to find size of a set i.e using size method

console.log(orderedSet2.has("Deepambar")); //finding existence of an element in the set, return true or false
console.log(orderedSet2.has("Akshay")); //finding existence of an element in the set, return true or false


console.log(orderedSet2.add('Tanya')); //adding elements into set
console.log(orderedSet2.add('Tanya'));

orderedSet2.delete('Zeeshan') //Deleting an element from the set
console.log(orderedSet2);

// orderedSet2.clear(); //This is used to empty the set


for (const order of orderedSet2) {
  console.log(order);
}




// *important*  Main use case of sets is to remove duplicate values of the array

const duplicate_value_array = [1, 1, 2, 2, 3, 3, 4, 5, 5, 'Shanky', 'Shanky', 'Aman'];

const set_from_array = new Set(duplicate_value_array);
console.log(set_from_array);

//How to covert the set into array again

const converted_array = [...set_from_array];
console.log(converted_array);



//MAPS

//The structure of maps is similar to objects but the fundamental difference between them
// is of keys as in objects keys are always 'string' but in maps keys can be
// string, an object or even a map


//declaring a map

const new_map = new Map();

//adding value into map using the method : set
// the set method not only saves the val;ues but also return the map after each addition

new_map.set('name', 'Shanky');
console.log(new_map);
new_map.set('height', '6 feet');
console.log(new_map);
new_map.set('designation', 'Software Intern');
console.log(new_map);
new_map.set('stipend', 20000);
console.log(new_map);

//maps get logged as:    key => value


//Chaining set method ***important***

const new_map2 = new Map();
new_map2.set('name', 'Yuvansh').set('height', '8 feet')
  .set('designation', 'Devops Intern')
  .set('stipend', 20000);
console.log(new_map2);

//getting value from the map  using get method and passing the key

console.log(new_map.get('name'));
console.log(new_map2.get('designation'));


//finding the existence

console.log(new_map.has('name'));
console.log(new_map.has('address'));


//deleting the values from the map
new_map2.delete('height')
console.log(new_map2);

//size of the map;
console.log(new_map.size);

//clearing the map i.e to make it empty

new_map2.clear();
console.log(new_map2);




//Setting arrays or objects as keys

const ar = [1, 2];

new_map.set(ar, 'Temp');
console.log(new_map);



//Using set method for mutlipl elements is gonna be real hectic job, to make it easier we simply 
//pass an array of elements(array of arrays)

const quiz = new Map([['question', 'Best programming language in the world?'],
  ['1', 'C'],
  ['2', 'Java'],
  ['3', 'Javascript'],
  ['answer', 'Javascript'],
  [true, 'Correct!']]);

  console.log(quiz);





  //**Imprtant **  Which Datastructure is to be used when.

  //Sources of Data
  // --------------
  //1. Within the code
  //2. From UI
  //3. Web API's


  //when we want sinple list we can use ARRAY or SET;
  //when we want key value pairs OBJECTS and  MAP;



        // Arrays                            v/s              Sets
//        --------                                           ------
  // 1. Use when you                                       1. When you want high performance
  // want ordered data                                     2. When you want to work with unique value
  // (might contains duplicate)                            3. Want to remove duplicates from array          

  // 2. When you want to manipulate data




        // Objects                            v/s              Maps
//        ---------                                            ------
  // 1. Traditional way of                                   1. When you want high performance
  // storing key vale pair                                   2. key can have any datatype
  //                                                         3. Easy to iterate         
  //                                                         4. Easy to compute size
  // 2. Easier way to access values using
      // [] or . 
  
  // 3. Use when you want to include function                5.use when you simply want to
  //                                                           map keys to value
 
  //4. use when working with json                            6.us when keys are not string  



 




//STRINGS

const str1= "My name is Shashank";
const str2="INDIRAPURAM";

//getting charactere at a position

console.log(str1[0]);
console.log(str1[4]);
console.log(str2[5]);


//getting index of the character (first occurence only)

console.log(str1.indexOf('e'));
console.log(str1.lastIndexOf('a'));
//length of the strig

console.log(str1.length);
console.log(str2.length);

console.log(str1.slice(3));
console.log(str1.slice(3,12)); //last index not included 


console.log(str1.slice(-2)); //starts counting from back(gets the string upto the number you have specified)


console.log(typeof new String('Shanky')); //by using new keyword the string is created as an object

console.log(str1.toUpperCase()); //convert to uppercase
console.log(str2.toLowerCase()); // convert to lowercase


const email = 'ShashankTyagi@gmail.com \n';

console.log(email.toLowerCase().trim()); //trim method removes white spaces from both side of the array

//ES6 has trim(), trimStart() i.e removes spaces from start only, and trimEnd() removes from end.




//** important ** replacing parts of string
//if a string has multiple similar words then replace method works on the first occurence only.
// to overcome this we have to use REGULAR EXPRESSIONS (learn them properly).


const currency = 'INR 5000' ;
console.log(currency);
console.log(currency.replace('INR','$'));



console.log(str1.includes('Shashank'));
console.log(str2.startsWith('I'));
console.log(str2.endsWith('m'));



//splitting the string by providing a split value i.e     split()

const my_school='St. Joseph\'s Academy';

console.log(my_school.split(''));

//joining the string,words etc i.e    join()

const new_school=[my_school,'Ghaziabad',201014].join(' ');
console.log(new_school);




//Padding i.e adding characters to astring untill it reaches a desired length

//Syntax:    str.padStart/padEnd(total_length_you_want, padding value)

//Example:

const gym='The Gold\'s Gym';
console.log(gym.padStart(30,'+'));
console.log(gym.padEnd(40,'-'));


//repeating a string i.e repeat()

const str='Running the Test Cases!';

console.log(str.repeat(10));



