 import {addBrand} from './exportFile.js'; //importing the named varibale/functions 
import { brandName, cost } from './exportFile.js';

console.log('Importing Module!');
console.log(cost);
console.log(brandName);

addBrand('Roadster');

console.log(brandName);