/*
Your tasks:
1. Use a constructor function to implement an ElectricCar(called'EV') as a child "class" of 'Car'. 
Besides a make and current speed, the 'EV' also has the current battery charge in % ('charge' property)
2. Implement a'charge Battery'method which takes an argument 'chargeTo' and sets the battery charge
 to 'chargeTo'
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge 
by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%'
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' 
(charge to 90%). Notice what happens when you 'accelerate'! 

Hint: Review the definiton of polymorphism 😉

Test data:
§ Data car 1: 'Tesla' going at 120 km/h, with a charge of 23%
*/



//parent class

const CarCl= function(make,speed)
{
    this.make=make;
    this.speed=speed;
    
}
//adding methods to prototype of the Carcl constructor function
Carl.prototype.accelerate= function()
 {
    this.speed=this.speed+10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
 };
 
 CarCl.prototype.brake= function()
 {
    this.speed=this.speed-5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
 };




//Child Class
const EV=fucntion(makeE,speedE,chargeE)
{

    CarCl.call(this,makeE,speedE)
    this.chargeE=chargeE;
}


// Prototype connection
EV.prototype=Object.create(CarCl.prototype); //Inheritance




EV.prototype.chargeBattery=function(chargeTo)
{
this.chargeE=chargeTo;
}

EV.prototype.accelerate=function() //Overridding
{
    this.speed=this.speed-20;
    this.chargeE=this.chargeE -(0.01*this.chrageE);
    console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.chargeE}%`);
}


const ElectricCar = new EV(Tesla,120,23);
ElectricCar.chargeBattery(90);
console.log(ELectricCar);
ElectricCar.brake();
ElectricCar.accelerate();  //it will invoke the method which is present st thr firdt position in the
                          //prototype chain






