'use strict';


//Challenge 23 using async/await
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


const loadNPause = async function () {
    try {

        let resImg = await createImage('img/img-1.jpg');
        console.log('Image 1 Loaded ');
        await wait(2);
        resImg.style.display = 'none';
        resImg = await createImage(`img/img-2.jpg`);
        console.log('Image 2 Loaded ');
        await wait(2);
        resImg.style.display = 'none';
        let

    }
    catch (err) {
        console.log(err);
    }
}



const loadAll = async function (imgArr) {
    try {

        const imgs = imgArr.map(async image => await createImage(image))
        console.log(imgs);
        const imgsEl = await Promise.all(imgs);
        console.log(imgsEl);


        imgsEl.forEach( img => img.classList.add('paralle'));

    } catch (err) {
        console.error(err);
    }
}

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img- 3.jpg']); 