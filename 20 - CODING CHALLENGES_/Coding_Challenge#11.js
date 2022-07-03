'use strict'



const game = {
    team1: 'Bayern Munich', team2: 'Borrussia Dortmund', players: [
      [
        'Neuer',
        'Pavard',
        'Martinez',
        'Alaba',
        'Davies',
        'Kimmich',
        'Goretzka',
        'Coman',
        'Muller',
        'Gnarby',
        'Lewandowski',
      ], [
        'Burki',
        'Schulz',
        'Hummels',
        'Akanji',
        'Hakimi',
        'Weigl',
        'Witsel',
        'Hazard',
        'Brandt',
        'Sancho',
        'Gotze',
      ],],
    score: '4:0',
    scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
      'Hummels'],
    date: 'Nov 9th, 2037',
    odds: {
      team1: 1.33,
      x: 3.25,
      team2: 6.5,
    },
  };
  
  
  const scored_player = [...game.scored];
  console.log(scored_player);
  for (const [number, name] of scored_player.entries()) {
    console.log(`Goal ${number + 1}:${name}`)
  }
  
  let sum = 0;
  const _odds = Object.values(game.odds);
  for (const value of _odds) {
    sum = sum + value;
  }
  console.log(sum);
  console.log(sum / _odds.length);
  
  
  const entriess = Object.entries(game.odds);
  
  for (const [team, odd] of entriess) {
  
    const teamName = team === 'x' ? 'draw' : `victory ${game[team]}`;
    console.log(`Odd of ${teamName}: ${odd}`);
  }
  
  console.log('\n');