/*
Your tasks:
1. Re-create Challenge #3,but this time using ES6 classes: create an 'EVCl' child class of the 
'CarCl' class
2. Make the 'charge' property private
3. Implement the ability to chain the 'accelerate' and 'chargeBattery'
methods of this class, and also update the 'brake' method in the 'CarCl' class.
Then experiment with chaining!
Test data:
§ Data car 1: 'Rivian' going at 120 km/h, with a charge of 23%




Given below is the previous coding challeng

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



class CarClTemp {
    constructor(make, speed) {
        this.make = make;
        this.speed = speed;
 
    }
    accelerate() {
        this.speed = this.speed + 10;
        console.log(`${this.make} is going at ${this.speed} km/h`);
    };
 
    brake() {
        this.speed = this.speed - 5;
        console.log(`${this.make} is going at ${this.speed} km/h`);
        return this;
    };
 
 }
 
 class EVCl extends CarClTemp {
 #charge;
    constructor(make, speed, charge) {
        super(make,speed)
        this.#charge = charge;
    }
 
    chargeBattery(chargeTo) {
        this.#charge = chargeTo;
        return this;
    }
 
    accelerate()//Overridding
    {
        this.speed = this.speed - 20;
        this.#charge = this.#charge - (0.01 * this.#charge);
        console.log(`${this.make} going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
        return this;
    }
 }
 
 const riv=new EVCl('Rivian',120,23);
 
 console.log(riv);
 riv.accelerate().accelerate().brake().accelerate().chargeBattery(70).accelerate().brake();