//Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy.
// A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
// Your tasks:
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
// 1. Julia found out that the owners of the first and the last two dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
// 2. Create an array with both Julia's(corrected)and Kate'sdata
// 3. For each remaining dog,log to the console whether it's an adult("Dognumber1
// is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy   ")
// 4. Run the function for both test data sets

// Test data:
// § Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3] 
// § Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]





console.log('Coding Callenge 15\n');


const juliaData1 = [3, 5, 2, 12, 7];
const kateData1 = [4, 1, 15, 8, 3];

const juliaData2 = [9, 16, 6, 8, 3];
const kateData2 = [10, 5, 6, 1, 4];

const checkDogs=function(dogsJulia,dogKate)
{
//we made a shgallow copy of the array because it is abad practice to mutate the parameters
// of the  function


//to make a shallow copy either we can use spread operatore i.e [...array_name] or we can use method
// i.e array_name.slice() --> this will slice all the values and will return whole array itself

//const shallowCopyArray=dogsJulia.slice();

const shallowCopyArray=[...dogsJulia];
shallowCopyArray.splice(0,1);
shallowCopyArray.splice(-2);


const finalArray=[...shallowCopyArray,...dogKate];

console.log(finalArray);

finalArray.forEach(function(value,index)
{
  const category = value>=3?`is an adult, and is ${value} years old`:`is still a puppy`;
  console.log(`Dog number ${index+1} ${category}`);
})
}

checkDogs(juliaData1,kateData1);
console.log(`\n`);
checkDogs(juliaData2,kateData2);