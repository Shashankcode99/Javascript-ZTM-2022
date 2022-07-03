'use strict';


const modal = document.querySelector('.modal');
const close_modal = document.querySelector('.close-modal');
const open_modal = document.querySelectorAll('.show-modal');//used to select all element with same class name
const overlay = document.querySelector('.overlay');

const openModal= function () {
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
const closeModal= function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

for (let i = 0; i < open_modal.length; i++) {
    open_modal[i].addEventListener('click', openModal);
}
close_modal.addEventListener('click',closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown',function(e)
{
    if(e.key==='Escape' && !modal.classList.contains('hidden'))
    {
        
        closeModal();
    }
})