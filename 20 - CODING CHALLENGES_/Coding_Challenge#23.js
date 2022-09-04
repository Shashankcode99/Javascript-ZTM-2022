'use strict';

const imgContainer = document.querySelector('.images');


const wait = function (seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000);
    })
}
const createImage = function (imgPath) {

    return new Promise(function (resolve, reject) {
        const img = document.createElement('img');
        img.src = imgPath;

        //resolving
        img.addEventListener('load', function () {
            imgContainer.append(img);
            resolve(img);
        });
        //rejecting
        img.addEventListener('error', function () {
            reject(new Error('Image Not Found '));
        });
    })
}

let currntImg;
createImage('img/img-1.jpg').then(resImg => {
    currntImg = resImg;
    console.log('Image 1 Loaded ');
    return wait(2);
}).then(() => {
    currntImg.style.display = 'none';
    return createImage(`img/img-2.jpg`)
}).then(
    img2 => {
        currntImg = img2;
        console.log('Image 2 Loaded ');
        return wait(2);
    }).then(() => {
        currntImg.style.display = 'none';
        return createImage(`img/img-2.jpg`)
    }).catch(err => console.log(err));    