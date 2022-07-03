// LECTURE: let, const and var
// 1. Set the value of'language'to the language spoken where you live
// (some countries have multiple languages, but just choose one)
// 2. Think about which variables should be const variables 
// (which values will never change, and which might change?). 
// Then, change these variables to const.
// 3. Try to change one of the changed variables now,and observe what happens



let language='Hindi';
console.log(language);
language='Tamil';
console.log(language); //value is changed i.e overidden


const DOB='02-02-1999';
console.log(DOB);

DOB=23; //error
console.log(DOB);


const constantValue; //error i.e initialization is mandatory in case of const datatype

