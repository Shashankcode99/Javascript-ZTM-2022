// Let's go back to Julia and Kate's study about dogs.
//  This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

// Your tasks:
// Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), 
// and does the following things in order:
// 1. Calculate the dog age in human years using the 
//following formula : if the dog is <= 2 years old, humanAge = 2 * dogAge. 
// If the dog is > 2 years old, humanAge = 16 + dogAge * 4

// 2. Exclude all dogs that are less than 18 human years old
//(which is the same as keeping dogs that are at least 18 years old)

// 3. Calculate the average human age of all adult dogs(you should already know from other challenges how we calculate averages 😉)
// 4. Run the function for both test data sets

// Test data:
// § Data1:[5,2,4,1,15,8,3] 
// § Data2:[16,6,10,5,6,1,4]


const calcAverageHumanAge=function(ages)
{
//task 1 : converting dogs age to human age
const ageInHumanYears = ages.map(dogAge=>dogAge<=2 ? 2 * dogAge : 16 + dogAge * 4);

console.log(`Converted ages of dogs are: ${ageInHumanYears}`);




//task 2 : filtering out dogs with age more than 18 years old
const dogGreaterThan18 = ageInHumanYears.filter(dogAge => dogAge>=18);

console.log(`Dogs of age greater than 18 are: ${dogGreaterThan18}`);




//task 3: fincding average of all dogs
const averageHumanAgeOfDogs = dogGreaterThan18.reduce((acc,curr)=> acc+curr,0)/dogGreaterThan18.length;

console.log(`Average of dogs ages is: ${averageHumanAgeOfDogs}\n`);

}


calcAverageHumanAge([5,2,4,1,15,8,3]);
calcAverageHumanAge([16,6,10,5,6,1,4]);





//Same Function Using Method Chaining 


const calcAverage_Using_Method_Chaining = function(mov)
{
   return mov.map(dogAge=>dogAge<=2 ? 2 * dogAge : 16 + dogAge * 4).filter(dogAge => dogAge>=18).reduce((acc,curr,arr)=> acc+curr/arr.length,0);
}

console.log(calcAverage_Using_Method_Chaining([5,2,4,1,15,8,3]));
console.log(calcAverage_Using_Method_Chaining([16,6,10,5,6,1,4]));