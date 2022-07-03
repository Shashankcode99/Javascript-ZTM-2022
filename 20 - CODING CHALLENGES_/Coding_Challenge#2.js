//Same BMi question but with if else condition and using Tempelate Literals

let markHeight=1.69;
let markWeight=78;

let johnHeight=1.95;
let johnWeight=92;

let markHigherBMI;


let markBMI=markWeight / (markHeight * markHeight);
let johnBMI=johnWeight / (johnHeight * johnHeight);


console.log(markBMI,johnBMI);

if(markBMI>johnBMI)
{
    markHigherBMI=true;
    console.log(`Is Mark's BMI ${markBMI }is higher than John's BMI ${johnBMI}? ${markHigherBMI}`);
}

else{
    markHigherBMI=false;
    console.log(`Is Mark's BMI ${markBMI }is higher than John's BMI ${johnBMI}? ${markHigherBMI}`)`);