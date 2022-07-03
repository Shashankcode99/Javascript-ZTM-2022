'use strict';

//normal this 
console.log(this);  //REFERENCE: GLOBAL ENVIROMENT 


//this with simple function
let calAge = function(birthDate) 
{
    console.log(2030-birthDate);
    console.log(this);      //REFERENCE: undefined when in strict mode whereas global object without strict mode

}





//this with arrow function
let calAgeArrow = (birthDate) =>
{
    console.log(2030-birthDate);
    console.log(this);      //REFERENCE:global object if no parent function is available

}





let obj={
    name:'shashank',
    year:2000,
    calcAge: function()
    {
        console.log(this);  //REFERENCE: to the object itself
        console.log(2050-this.year);
    }
}




calAge(1998);

calAgeArrow(1890);

obj.calcAge();