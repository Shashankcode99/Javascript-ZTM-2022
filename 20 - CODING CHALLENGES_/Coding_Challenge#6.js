// Let's go back to Mark and John comparing their BMIs! This time, 
// let's use objects to implement the calculations!
//  Remember: BMI = mass / height ** 2 = mass / (height * height) 
// (mass in kg and height in meter)
// Your tasks:
// 1. Foreachofthem,createanobjectwithpropertiesfortheirfullname,mass,and height 
// (Mark Miller and John Smith)
// 2. Createa'calcBMI'methodoneachobjecttocalculatetheBMI(thesame method on both objects). 
// Store the BMI value to a property, and also return it from the method
// 3. Log to the console who has the higher BMI,together with the full name and he respective BMI. 
// Example: "John's BMI (28.3) is higher than Mark's (23.9)!"
// Test data: Marks weights 78 kg and is 1.69 m tall. John weights 92 kg and is 1.95 m tall.



const markBMI=
{
    fullname:'Mark Miller',
    mass:78,
    height:1.69,
    calcBMI:function()
    {
        this.bmi=this.mass/this.height**2;
        return this.bmi;
    }
}


const johnBMI=
{
    fullname:'John Smith',
    mass:92,
    height:1.95,
    calcBMI:function()
    {
        this.bmi=this.mass/this.height**2;
        return this.bmi;
    }
}


markBMI.calcBMI();
johnBMI.calcBMI();

    if(johnBMI.bmi>markBMI.bmi)
    {
        console.log(`${johnBMI.fullname} BMI (${johnBMI.bmi}) is higher than ${markBMI.fullname} ${markBMI.bmi}`);
    }

    else if(markBMI.bmi>johnBMI.bmi)
    {
        console.log(`${markBMI.fullname} BMI (${markBMI.bmi}) is higher than ${johnBMI.fullname} ${johnBMI.bmi}`);
    }

    else
    {
        console.log(`BMI's are equal`);
    }