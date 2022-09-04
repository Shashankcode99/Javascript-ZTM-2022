'use strict';


//What is oBject Oriented Programming?

/* 

1. Object Oriented Programming or OOP's is basically a programming paradigm based on the concepts
of OBJECT.

 what do you mean by paradigm? -> how to style or organize the code.

2. In OOP's object are basically self-contained code of block.
 
3. Object are bulding blocks of the application and interact with each other.

4. Object may contain data(properties) and code(methods). With the help of object we pack data 
   and the corresponding behaviour into one block. 

5. Interactions happens through a public interface i.e API's.   

6. OOP's was develped to organize the code and avoid the spaghetti code 
*/




//CLASSES AND INSTANCES


/*
Classes are like bluprints from which we can create new objects based on the rules
described inside the class.

Class do not contains the actual data. 

Object Created from the class is known as INSTANCE of the class. 
Definition : So basically an Instance is a real object that we can use , which was created from a class
*/








// HOW WE ACTUALLY DESIGN CLASSES

/*

To design a class there no actual correct way to design a class.
But we have 4 fundamental principal with help of ehich we can design a class. 

1. Abstraction - Hiding the "not so important" data
2. Enscapsulation -  Keeping properties and methods private so that they are not acessible outside the class
3. Inheritance - Inheriting functionality of one class into some other class/classes.  (reusability of the code)
4. Polymorphism -  A child class can overwrite a method it inherited from a parent class. 

*/







//Difference between Classical OOP and and OOP in JS



/* 

"Classical OOP" : CLASSES    


           CLASS
             |    (instantiation)
             V
          INSTANCE
 



"OOP in JS" : PROTOTYPE


    Prototype

        ^
        |   (Pro)
    
      Object


Here, Objects are linked to a prototype object. 

What is the prototype object?
-> Basically contains all the methods and properties which an object can use. This is also known as 
    "Prototypal Inheritance". Sometimes it is also known as "Delegation" becuse here objects delegates their 
    behaviour to the protype.






What are the way of Implementing Prototypal Inheritance?
-> There are 3 ways for this:

1. Constructor function

- Technique to create objects from a function.
- This is how built in objects like Array , MAp or Sets are formed.


2. ES6 classes

 - Modern alternative to the constructor syntax
 - "Syntatic sugar" : behine the scenes, ES6 classes works exactly like constructor function
 - ES6 classes do not behave like class in classical OOP

  


3. Object.create() 

 - Most wasiet and straightforward way of linking an object to the protype object.
 
*/





//FROM HERE WE ARE STARTING IMPLEMENTING OOP

// 1. CONSTRUCTOR FUNCTION AND THE "NEW" OPERATOR.

/* 

What is the purpose of constructor function?
-> creating an object from a function


How constructor function is different from regular function?
-> we have to call them using "new" keyword.

We can only have function declaration and function expression as constructor fucntion and not the arrow 
function as it do not have it's own this keyword.
*/


//Exmaple

const Person = function (firstName, lastName) {
   //Instance Properties
   this.FN = `${firstName}`,
      this.LN = `${lastName}`

}
const shanky = new Person('Shashank', 'Tyagi');

const yuvi = new Person('Yuvansh', ' Kapoor');

const vip = new Person('Vipul', 'Jain');

console.log(shanky);
console.log(yuvi);
console.log(vip);

console.log(shanky instanceof Person)

//What happens after this?

// 1. a new empty object '{}' is created.
// 2. function is called and "this" keyword is equal to the newly created object.
// 3. this newly created empty object '{}' is linked to a object prototype
// 4. function automatically returns {}




//Prototypes 

/*Each an every function in javascript has a property called prototype and that includes constructor functions.
 
1. Each and every object created from the constructor function inherits the methods of the constructor
   and has access to all the properties and methods defined on this prototype.

*/


//How to add a property or method to the prototype.


// Syntax :   costructor_unction_name . prototype . method_property


//Example: The votingEligible method will be available to all the objects created from Person constructor function.


Person.prototype.votingEligible = function (age) {
   return age >= 18 ? true : false;
}


//to know the proprties of the prototype object


console.log(Person.prototype)






// ES6 CLASSES

/*
Classes in Javascript is not as in other languages like java or CPP(c++).
Infact it is the syntatic sugar (i.e backend functionality is same) for what we are doing with 
constructor function.


For better understanding you can say that ES6 classes is a more nicer and cleaner way of doing inheritance.
The syntax is different but the actual functionality working behind the scenes is same as the 
constructor function.
 

3 Key Points for Classes.

i) Classes are NOT Hoisted (cannot be used before declaration)
ii) Classes are first citizens/first class functions (can be passed into or returned from another function)
iii) Classes are executed in strict mode 
*/



//class expression

const PersonCl = class {

}

//class declaration

class PersonCl2 {

   //very first thing to do inside the class is adding a constructor method, which works
   // the same way as we have seen in previous concept (constructor function)
   constructor(firstName, birthDate) {
      this.firstName = firstName;
      this.birthDate = birthDate;
   }


   //methods below will be same as earlier i.e they will be available to all the objects you 
   //make with the help of the class.

   //Simply, methods will be added to .prototype property
   calcAge() {
      console.log(2037 - this.birthDate);
   }

   calName() {
      console.log(`The name is ${this.firstName}`);
   }


   //Getter and Setter of the class



   //Getter
   get age() {
      return 2050 - this.birthDate;
   }


   static hey()  //static method
   {
      console.log(`Hey Shanky!`);
      console.log(this); //will point to the entire class
   }


}

const Obj1 = new PersonCl2("Shanky", 2000);
console.log(Obj1.__proto__);
console.log(Obj1.calcAge());
console.log(Obj1.age); ``

PersonCl2.hey(); //will call the method
// Obj1.hey();  //not possible



// GETTERS AND SETTERS

/* 
Every Object in JS can have getter and setter property.(example given below)

Similarly Class have getters and setters too. (see the above example)

Getters and Setters are basically functions used to get and set the values, but outside 
they look like regular properties.

 */


// Getters and Setters for Object
const bankDetails =
{
   name: 'Shanky',
   movements: [1, 2, 3, 4],



   //GETTER

   get lastMovement() {
      return this.movements.slice(-1).pop();
   },


   //SETTER

   set addMovement(mov) {
      return this.movements.push(mov);
   }
};


console.log(bankDetails.lastMovement);
bankDetails.addMovement = 50;   //it act as a property so will initiliaze the value 
console.log(bankDetails.movements);








//STATIC METHOD

/* Static methods are not available to the instances of the class.
  Basically they are not added to the prototype property.

  They are always created using keyword 'static'
 
*/
console.log(Array.from(bankDetails));






//OBJECT.CREATE

/* Works differently with comparison to constructor function and ES6 classes.

There is still concept of prototypal inheritance but without any prototype property, constructor 
fucntion or new keyword. 


Basically with the help of object.create we can manually set the prototype of any object to other 
object we want.

*/

//below will going to be the protoType of all the Person object
const personProto =
{
   calcAge() {
      return 2050 - this.birthDate;
   }
}


//Creating an object with another obejct as its prototype property

const _newPerson = Object.create(personProto);
console.log(_newPerson);

_newPerson.firstName = 'Sonali';
_newPerson.lastName = 'Dada';
_newPerson.birthYear = 1996;





//INHERITANCE BETWEEN CLASSES : "CONSTRUCTOR FUNCTION" 

const baseClass = function (firstName, birthYear) {
   this.firstName = firstName;
   this.birthYear = birthYear;
}

baseClass.prototype.calAge = function () {
   return 2050 - this.birthYear;
};


const derivedClass = function (firstName, birthYear, course) {
   // this.firstName=firstName;
   // this.birthYear=birthYear;

   /* The above two lines were same as in the baseClass construtore function which is violating the DRY 
   pricipal. So in order to use the insatnce property of the base class along with 'this' keyword pointing 
   to the derived class we will do the below step*/

   baseClass.call(this, firstName, birthYear);
   this.course = course;
}



derivedClass.prototype = Object.create(baseClass.prototype);

derivedClass.prototype.introduce = function () {
   console.log(`Hi my name is ${this.firstName} and i am ${this.birthYear} years old. I am from course ${this.course}`);
}



const _shashank = new derivedClass('Shashank', '1999', 'MCA');


console.log(derivedClass.prototype);

console.log(_shashank);
_shashank.introduce();
let _shankyAge = _shashank.calAge()
console.log(_shankyAge);


console.log(_shashank.__proto__);





// INHERITANCE BETWEEN CLASSES : "ES6 CLASSES"


/* For Inheritance among ES6 Classes we only need two thing i.e extends keyword and super fucntion.

extends keyword-> used to inherit properties of the parent class into child class

super function-> it is basically the constructor function of the parent class

*/




class StudentCl extends PersonCl2 {


   constructor(firstName, birthDate, course) //constructor function same as the parent class but with some extra params
   {
      super(firstName, birthDate); //constructor function of the parent class i.e PersonCl2 
      this.course = course;
   }


   introduce = function () {
      console.log(`Hi my name is ${this.firstName} and i am ${2040 - this.birthDate} years old. I am from course ${this.course}`);
   }

}


const martha = new StudentCl('Martha', '1992', 'Computer Applications');

martha.introduce();






// INHERITANCE BETWEEN CLASSES : "Object.create"



const personProto1 =
{

   calcAge() {
      console.log(2030 - this.birthYear);
   },

   init(firstName, birthYear) {

      this.firstName = firstName;
      this.birthYear = birthYear;
   }

}

const steven = Object.create(personProto1);


const StudentProto = Object.create(personProto1);

StudentProto.init = function (firstName, birthYear) {
   personProto1.init.call(this, firstName, birthYear);
   this.course = this.course;
};




StudentProto.introduce = function () {
   console.log(`Hi my name is ${this.firstName} and i am ${2040 - this.birthYear} years old. I am from course ${this.course}`);
}


const mark = Object.create(StudentProto);
//StudentProto object is now the prototype of mark  
//PersonProto1 is now the parent prototype of mark



mark.init('Mark', 2010, 'Computer Science');
mark.introduce();
mark.calcAge();











//ENCAPSULATION__PROTECTED PROPERTIES AND METHODS


/*  */



class Account {



   constructor(owner, currrency, pin) {
      this.owner = owner;
      this.currrency = currrency;
      //Protected properties
      this._pin = pin;  //using underscore is basically a convenction to make the reader understand that this is a protected property and we should not access them outside the class.
      this._movements = [];
      this.locale = navigator.language;
      console.log(`Thanks for openeing the account ${this.owner}`);
   }


   getMovements() {
      return this._movements;
   }

   deposit(val) {
      this._movements.push(val);
      return this;
   }

   withdraw(val) {
      this._movements.push(-val);
      return this;
   }


   _approveLoan(val)   //it is an internal method to be used inside another methods of the class
   {
      return true;
   }




   requesLoan(val) {
      if (this._approveLoan(val))
         this.deposit(val);
      console.log(`Loan Approved`);
      return this;
   }
}


const shank = new Account('Shanky', 'INR', '1111');
shank.deposit(1000);
shank.deposit(1000);
shank.withdraw(200);

shank.getMovements();
shank.requesLoan(5000);
// shank._approveLoan(5000); //is accessible even if the method is internal
console.log();




//METHOD CHAINING : How to perform it?

/*   IMPORTANT  */
// shank.deposit(500).deposit(2700).withdraw(900).deposit(500); 

/*The above example wont work because the first method call wont return anything so whenever another
method is called it will be called upon undefined hence an error will be thrown.

In order to get rid of this error we simply return 'this' on the methods*/


//After returning 'this'


shank.deposit(500).deposit(2700).withdraw(900).deposit(500); 
 






