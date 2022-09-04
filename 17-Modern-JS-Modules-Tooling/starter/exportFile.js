console.log('Exporting Module!');

const brandName= ["Levis","PepeJeans","JohnPlayer","HugoBoss"];
const cost = 10000;

export const addBrand = function(val)
{
    brandName.push(val);
}

addBrand('Lee Cooper');
addBrand('HighLander');

export {brandName,cost}; 

/*
Point 1: We have basically two types of exports:

1. << named exports >> (simple putting the export keyword in front of the variable or function you want to export)
 And we have to import them separately as well.

 For example: import addBrand from './exportFile.js'


Point 2: We can also give named exports variables and function different names by using alias technique.

Example: export {totalCost as price}



Point 3: We can import entire file using (*)

Example: import * as ShoppingCart from './shoppingCart';




2. << default exports >>

Default exports are used when we want only one thing to get exported per module.

 
Example

export default function(ele)
{
    ... 
    ...
    ...
}


How to import them?
-------------------

Now you can import them in any file and can give them name as you desired choice. 
import name_of_your_choice from './shoppingCart.js'




*/



//How we export/import modules in NodeJs apart from common JS?

//Here comes the concept of 'require' keyword


/*

//EXPORT:

export.addToCart = function()
{
    .....
    .....
    .....
    .....
}


//IMPORT:

import {addToCart} = require ('./shoppingCart.js');
*/




/*
SOME BASICS OF COMMAND LINE
---------------------------


    Mac              Window                           Use           
1.  ls                 dir                  shows content of the current folder
2.  cd                 cd                   used for changing directory
3.  cd ..              cd..                 moving one level up
4.  clear (cmd+k)      cls                  clear the screen
5.  mkdir              mkdir                creates a folder
6.  touch              edit                 creates a file
7.  rm                 del                  delete a file 
8.  mv                                      moving a file into parent folder (e.g  mv index.js  ../ )
9.  rmdir                                   removing directory/folder 
(only works for empty directory)                                   

*/



/*
Let's learn NPM !! 

NPM stands for Node Package Manager.

Q. If you want to use node modules in your project then what will be the first step?

-> npm init
 ( a package.json file while be created )

Q. What all things will package.json will hold?
 -> name, version etc.
    Most importantly it will hold a dependencies object, which will have name and version of all
    the installed node packages.
    A specific node modules folder will be craeted which will have specific folders according
    to the installed packages and will have different files as per the functionalities.
    You can import them.

 
*/





/* 

**Important** Bundling with Parcel and NPM Scripts?


Parcel is a built-in tool which is also available on npm.

-> npm i parcel --save-dev (because it is a dev dependency & not something we want in our code )



How to use parcel?

npx parcel index.html (starting point)

*/


 

/*
IMPERATIVE v/s DECLARATIVE CODE
-------------------------------

IMPERATIVE:
{
. We have to explain computer each step it has to follow to achieve the goal.
   Basically: 'WHAT' to do and 'HOW' to do.

  Example: Step by Step recipe of cake

}


DECLARTIVE:
{
    . In declarative programmer tells only 'WHAT' to do.
       The HOW (step by step) gets encapsultaed

       Example: Description of the cake (hwo the cake shoould be)
}



WHAT IS FUNCTIONAL PROGRAMMING?
-> It is a declarative paradigm which is based on the idea of writing sofware by combining
   "pure functions" avoiding side effects and mutating data.
    
*/
