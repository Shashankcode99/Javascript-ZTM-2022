// Given an array of forecasted maximum temperatures, the thermometer
//  displays a string with the given temperatures. Example: [17, 21, 23] will print 
// "... 17oC in 1 days ... 21oC in 2 days ... 23oC in 3 days ..."
// Your tasks:
// 1. Createafunction'printForecast'whichtakesinanarray'arr'andlogsa string
//  like the above to the console. Try it with both test datasets.
// 2. Usetheproblem-solvingframework:Understandtheproblemandbreakitup into sub-problems!
// Test data:
// § Data 1: [17, 21, 23]
// § Data2:[12,5,-5,0,4]



const forecasted=[17, 21, 23];
console.log(forecasted);





const STR=function printForecast(temp)
{
    let str=`...`;
    for (let index = 0; index < temp.length; index++) {
       
        str = str+`${temp[index]} oC in ${index+1} days...`;
       
    }
    return str;
}


const result=STR(forecasted);
console.log(result);