let $name = document.getElementsByClassName('name')[0];
let $imgs = document.getElementById('imgs');

let width = 0;
let height = 0;
let nameWidth = 0;
let nameHeight = 0;
let nameX = 0;
let nameY = 0;

let imgMargin = 0;
let imgSize = 0;

let countWidthImgs = 0;
let countAtNameX = 0;
let imgX = 0;
let imgY = 0;

let moveX = 0;
let moveY = 0;
let quadrant = 1;
let cicle = 1;
let maxQuadrant1 = 0;
let maxQuadrant2 = 0;
let maxQuadrant3 = 0;
let maxQuadrant4 = 0;


const initQuadrant = () => {
    maxQuadrant1 = nameX + nameWidth + imgSize + imgMargin;
    if (maxQuadrant1 > width) {
        maxQuadrant1 = width;
    }

    maxQuadrant2 = nameY;
    if (maxQuadrant2 < 0) {
        maxQuadrant2 = 0;
    }

    maxQuadrant3 = nameX;
    if (maxQuadrant3 < 0) {
        maxQuadrant3 = 0;
    }

    maxQuadrant4 = nameY + nameHeight;
    if (maxQuadrant4 > height) {
        maxQuadrant4 = height;
    }
}

const updateMaxQuadrant = () => {
    if (quadrant === 1) {
        maxQuadrant1 += imgSize + imgMargin;
        if (maxQuadrant1 > width) {
            maxQuadrant1 = width;
        }
    } else if (quadrant === 2) {
        maxQuadrant2 -= imgSize + imgMargin;
        if (maxQuadrant2 < 0) {
            maxQuadrant2 = 0;
        }
    } else if (quadrant === 3) {
        maxQuadrant3 -= imgSize + imgMargin;
        if (maxQuadrant3 < 0) {
            maxQuadrant3 = 0;
        }
    } else if (quadrant === 4) {
        maxQuadrant4 += imgSize + imgMargin + imgMargin;
        if (maxQuadrant4 > height) {
            maxQuadrant4 = height;
        }
    }
    console.log('updateMaxQuadrant', quadrant, eval(`maxQuadrant${quadrant}`));
}

const nextQuadrant = () => {
    if (moveX > 0 && moveY === 0) {
        moveY = (imgSize + imgMargin) * -1;
        moveX = 0;
        quadrant = 2;
    }
    else if (moveX === 0 && moveY < 0) {
        moveX = (imgSize + imgMargin) * -1;
        moveY = 0;
        quadrant = 3;
    }
    else if (moveX < 0 && moveY === 0) {
        moveX = 0;
        moveY = (imgSize + imgMargin);
        quadrant = 4;
    }
    else if (moveX === 0 && moveY > 0) {
        moveX = (imgSize + imgMargin);
        moveY = 0;
        quadrant = 1;
        ++cicle;
    } else {
        console.error('pq');
    }
    updateMaxQuadrant();
}


const loadSkins = () => {
    console.clear();

    width = document.body.clientWidth;
    height = document.body.clientHeight;

    imgSize = 48;
    imgMargin = 12;

    countWidthImgs = parseInt(width / (imgSize + imgMargin));

    console.log('countWidthImgs', countWidthImgs);

    imgMargin = parseInt((width - (countWidthImgs * imgSize)) / (countWidthImgs - 1));


    nameWidth = $name.clientWidth;
    nameHeight = 2 * (imgSize + imgMargin);

    nameX = $name.offsetLeft;
    nameY = parseInt((height / 2) - (nameHeight / 2));

    moveX = imgSize + imgMargin;
    moveY = 0;
    quadrant = 1;
    cicle = 1;

    countAtNameX = parseInt(nameX / (imgSize + imgMargin))
    imgX = (countAtNameX - 1) * (imgSize + imgMargin);
    imgY = parseInt((height / 2) + (nameHeight / 2));

    initQuadrant();

    console.log('       width', width);
    console.log('      height', height);
    console.log('   nameWidth', nameWidth);
    console.log('  nameHeight', nameHeight);
    console.log('       nameX', nameX);
    console.log('       nameY', nameY);
    console.log('     imgSize', imgSize);
    console.log('   imgMargin', imgMargin);
    console.log('maxQuadrant1', maxQuadrant1);
    console.log('maxQuadrant2', maxQuadrant2);
    console.log('maxQuadrant3', maxQuadrant3);
    console.log('maxQuadrant4', maxQuadrant4);

    $imgs.innerHTML = "";
    skins.forEach(skin => {



        if (quadrant === 1 && (imgX + moveX) > maxQuadrant1) {
            nextQuadrant();
        }
        if (quadrant === 2 && (imgY + moveY) < maxQuadrant2) {
            nextQuadrant();
        }
        if (quadrant === 3 && (imgX + moveX) < maxQuadrant3) {
            nextQuadrant();
        }
        if (quadrant === 4 && (imgY + moveY) > maxQuadrant4) {
            nextQuadrant();
        }

        if (quadrant === 2 || quadrant === 4) {
            let testX = imgX + (moveX * cicle);
            let testY = imgY + (moveY * cicle);
            let testW = testX + imgSize;
            let testH = testY + imgSize;

            let colisionXY = (nameX) <= testX &&
                (nameX + nameWidth) >= testX &&
                nameY <= testY &&
                (nameY + nameHeight) >= testY;

            let colisionWH = (nameX) <= testW &&
                (nameX + nameWidth) >= testW &&
                nameY <= testH &&
                (nameY + nameHeight) >= testH;

            if (quadrant === 2 && (colisionXY || colisionWH)) {
                imgY = maxQuadrant2 + imgSize + imgMargin;
            }

            if (quadrant === 4 && (colisionXY || colisionWH)) {
                imgY = maxQuadrant4 - imgSize - imgMargin;
            }

            if (colisionXY) {
                console.log('colidiu', quadrant, skin.src);
            }
        }


        imgX += moveX;
        imgY += moveY;
        // console.log('src', skin.src, quadrant, imgX, imgY);

        if (skin.d) {
            console.log("------------------------", skin.src, "-------------------");
            console.log('imgX', imgX);
            console.log('imgY', imgY);
            console.log("------------------------------------------------------------");
        }

        const $img = document.createElement('img');
        $img.src = skin.src;
        $img.className = 'img-100';
        $img.style.position = 'absolute';
        $img.style.width = `${imgSize}px`;
        $img.style.height = `${imgSize}px`;

        // $img.style.width = `3rem`;
        // $img.style.height = `3rem`;

        $img.style.left = `${imgX}px`;
        $img.style.top = `${imgY}px`;

        if (skin.href) {
            const $link = document.createElement('a');
            $link.href = skin.href;
            $link.target = '_blank';
            $link.append($img);
            $imgs.append($link);
        } else {
            $imgs.append($img);
        }
    });
}
loadSkins();
window.addEventListener('resize', loadSkins);