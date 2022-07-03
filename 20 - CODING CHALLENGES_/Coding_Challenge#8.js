// Back to the two gymnastics teams, the Dolphins and the Koalas!
//  There is a new gymnastics discipline, which works differently.
// Each team competes 3 times, and then the average of the 3 scores 
// is calculated (so one average score per team).

// A team only wins if it has at least double the average score 
// of the other team. Otherwise, no team wins!

// Your tasks:
// 1. Createanarrowfunction'calcAverage'tocalculatetheaverageof3scores

// 2. Usethefunctiontocalculatetheaverageforbothteams

// 3. Createafunction'checkWinner'that takes the average score of each team
// as parameters ('avgDolhins' and 'avgKoalas'), and then logs
//  the winner to the console, together with the victory points, 
// according to the rule above. Example: "Koalas win (30 vs. 13)"


// 4. Usethe'checkWinner'functiontodeterminethewinnerforbothData1 and Data 2

// 5. Ignoredrawsthistime

// Test data:
// § Data 1: Dolphins score 44, 23 and 71. Koalas score 65, 54 and 49 § 
// Data 2: Dolphins score 85, 54 and 41. Koalas score 23, 34 and 27
// Hints:
// § To calculate average of 3 values, add them all together and divide by 3
// § To check if number A is at least double number B, check for A >= 2 * B.
// Apply this to the team's average scores 😉 GOOD LUCK 😀
//     The Complete JavaScript Course 9



let calcAverage = (score1,score2,score3) =>(score1+score2+score3)/3;


const avgScoreDolphins = calcAverage(85,54,41);
const avgScoreKoalas = calcAverage(23,34,27);


let checkWinners = function(avgDolphins,avgKoalas)
{
    if (avgDolphins>=(2*avgKoalas)) console.log(`Dolphins are Winner! ${avgDolphins} v/s ${avgKoalas}`); 
    else if (avgKoalas>=(2*avgDolphins)) console.log(`Koalas are Winner! ${avgKoalas} v/s ${avgDolphins}`); 
    else console.log(`No team wins!`);
}


checkWinners(avgScoreDolphins,avgScoreKoalas);
