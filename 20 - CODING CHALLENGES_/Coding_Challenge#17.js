const dogs = [
    { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] }, 
    { weight: 8, curFood: 200, owners: ['Matilda'] },
    { weight: 13, curFood: 275, owners: ['Sarah', 'John'] }, 
    { weight: 32, curFood: 340, owners: ['Michael'] },
        ];

// Julia and Kate are still studying dogs, and this time they are studying if dogs are 
//eating too much or too little.
// Eating too much means the dog's current food portion is larger than the recommended portion, 
//and eating too little is the opposite.
// Eating an okay amount means the dog's current food portion is within a range 10% above 
//and 10% below the recommended portion (see hint).

// Your tasks:
// 1. Loop over the 'dogs' array containing dog objects,and for each dog, calculate the recommended
// food portion and add it to the object as a new property.
// Do not create a new array, simply loop over the array. 
// Forumla: recommendedFood = weight ** 0.75 * 28. 
//(The result is in grams of food, and the weight needs to be in kg)

dogs.forEach(dogDetails => {

    dogDetails.recommendedFood = Math.trunc(dogDetails.weight ** 0.75 * 28);
    console.log(dogs);
});



// 2. Find Sarah's dog and log to the console whether it's eating too much or too little. 
//Hint: Some dogs have multiple owners, so you first need to find Sarah in the owners array,
// and so this one is a bit tricky (on purpose) 🤓



const sarahDogDetails = dogs.find(dogDetails => dogDetails.owners.includes('Sarah'));
 console.log(sarahDogDetails.curFood > sarahDogDetails.recommendedFood ? 'Eating too much' : 'Eating Less');


//  3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') 
//  and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
 const ownersEatTooMuch = dogs.filter(dogs=>dogs.curFood>dogs.recommendedFood).flatMap(dogs=>dogs.owners);
 console.log(ownersEatTooMuch);
 
 
 const ownersEatTooLittle = dogs.filter (dogs=>dogs.curFood<dogs.recommendedFood).flatMap(dogs => dogs.owners);
 console.log(ownersEatTooLittle);


// 4. Log a string to the console for each array created in 3.
//likethis:"Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"


const eatTooMuchString = `${ownersEatTooMuch.join(' and ')}'s dogs eat too much`;
console.log(eatTooMuchString);

const eatTooLittleString = `${ownersEatTooLittle.join(' and ')}'s dogs eat too little`;
console.log(eatTooLittleString);

// 5. Log to the console whether there is any dog eating exactly the amount of food that is recommended 
//(just true or false)

const isEatingExactAmount = dogs.some( dog => (dog.curFood === dog.recommendedFood));
console.log(isEatingExactAmount);


// 6. Log to the console whether there is any dog eating an okay amount of food 
//(just true or false)

const checkingEatingOkayCondition =dog => (dog.curFood >=dog.recommendedFood*0.90 && dog.curFood <=dog.recommendedFood*0.11);

const isEatingOkayAmount = dogs.some(checkingEatingOkayCondition );
console.log(isEatingOkayAmount);


// 7. Create an array containing the dogs that are eating an okay amount of food
//(try to reuse the condition used in 6.)


const eatingOkayAmount = dogs.filter(checkingEatingOkayCondition);
console.log(eatingOkayAmount);






// 8. Create a shallow copy of the 'dogs' array and sort it by recommended food portion in an 
//ascending order (keep in mind that the portions are inside the array's objects 😉)
 
const sortedArray = dogs.slice().sort((curr,next)=>
{
    if(curr.recommendedFood>next.recommendedFood)
    {
        return 1;
    }
    else{
        return -1;
    }
}
);

console.log(sortedArray);

// Hints:
// § Use many different tools to solve these challenges,
// you can use the summary lecture to choose between them 😉

// § Being within a range 10% above and below the 
//recommended portion means:  .
// Basically, the current portion should be between 90% and 110% of the recommended portion.

//Test Data:

// const dogs = [
// { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] }, 
// { weight: 8, curFood: 200, owners: ['Matilda'] },
// { weight: 13, curFood: 275, owners: ['Sarah', 'John'] }, 
// { weight: 32, curFood: 340, owners: ['Michael'] },
//     ];