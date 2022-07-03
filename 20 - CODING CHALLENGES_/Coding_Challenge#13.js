'use strict'


document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));


document.querySelector('button').addEventListener('click', function()
{
  const textAreaData =document.querySelector('textarea').value;

  const rows= textAreaData.split('\n');

  for (const [index,name] of rows.entries()) {
    const [firstname,lastname]=name.toLowerCase().trim().split('_');

const output=`${firstname}${lastname.replace(lastname[0],lastname[0].toUpperCase())}`;
console.log(`${output.padEnd(20,' ')}${'X'.repeat(index+1)}`);  
}


}
);