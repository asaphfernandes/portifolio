let $name = document.getElementsByClassName('name')[0];
let $imgs = document.getElementById('imgs');

let imgMargin = 8;
let imgSize = 0;

let width = 0;
let height = 0;
let nameWidth = 0;
let nameHeight = 0;
let nameX = 0;
let nameY = 0;

let countWidthImgs = 0;
let countAtNameX = 0;
let imgX = 0;
let imgY = 0;

let moveX = 0;
let moveY = 0;
let quadrant = 1;
let maxQuadrant1 = 0;
let maxQuadrant2 = 0;
let maxQuadrant3 = 0;
let maxQuadrant4 = 0;


const initQuadrant = () => {
    maxQuadrant1 = nameX + nameWidth + imgSize + (imgSize / 2);
    if (maxQuadrant1 > width) {
        maxQuadrant1 = width;
    }

    maxQuadrant2 = nameY - imgSize - (imgSize / 2);
    if (maxQuadrant2 < 0) {
        maxQuadrant2 = 0;
    }

    maxQuadrant3 = nameX - imgSize - (imgSize / 2);
    if (maxQuadrant3 < 0) {
        maxQuadrant3 = 0;
    }

    maxQuadrant4 = nameY + nameHeight + imgSize + imgSize;
    if (maxQuadrant4 > height) {
        maxQuadrant4 = height;
    }
}

const updateMaxQuadrant = () => {
    if (quadrant === 1) {
        maxQuadrant1 += imgSize;
        if (maxQuadrant1 > width) {
            maxQuadrant1 = width;
        }
    } else if (quadrant === 2) {
        maxQuadrant2 -= imgSize;
        if (maxQuadrant2 < 0) {
            maxQuadrant2 = 0;
        }
    } else if (quadrant === 3) {
        maxQuadrant3 -= imgSize;
        if (maxQuadrant3 < 0) {
            maxQuadrant3 = 0;
        }
    } else if (quadrant === 4) {
        maxQuadrant4 += imgSize;
        if (maxQuadrant4 > height) {
            maxQuadrant4 = height;
        }
    }
}

const nextQuadrant = () => {
    updateMaxQuadrant();
    if (moveX > 0 && moveY === 0) {
        moveY = imgSize * -1;
        moveX = 0;
        quadrant = 2;
    }
    else if (moveX === 0 && moveY < 0) {
        moveX = imgSize * -1;
        moveY = 0;
        quadrant = 3;
    }
    else if (moveX < 0 && moveY === 0) {
        moveX = 0;
        moveY = imgSize;
        quadrant = 4;
    }
    else if (moveX === 0 && moveY > 0) {
        moveX = imgSize;
        moveY = 0;
        quadrant = 1;
    } else {
        console.error('pq');
    }
}


const loadSkins = () => {
    width = document.body.clientWidth;
    height = document.body.clientHeight;
    nameWidth = $name.clientWidth;
    nameHeight = $name.clientHeight;
    nameX = $name.offsetLeft;
    nameY = $name.parentNode.offsetTop;
    
    imgSize = 40;
    
    moveX = imgSize;
    moveY = 0;
    quadrant = 1;

    countWidthImgs = parseInt(width / imgSize)
    countAtNameX = parseInt(nameX / imgSize)
    // imgX = (width / 2) - (nameWidth / 2);
    imgX = (countAtNameX - 1) * (width / countWidthImgs);
    imgY = (height / 2) + (nameHeight / 2);

    initQuadrant();

    console.clear();
    console.log('nameX', nameX);
    console.log('nameY', nameY);
    console.log('nameWidth', nameWidth);
    console.log('nameHeight', nameHeight);
    console.log('maxQuadrant1', maxQuadrant1);
    console.log('maxQuadrant2', maxQuadrant2);
    console.log('maxQuadrant3', maxQuadrant3);
    console.log('maxQuadrant4', maxQuadrant4);

    $imgs.innerHTML = "";
    skins.forEach(skin => {



        if (quadrant === 1 && (imgX + (moveX * 2)) > maxQuadrant1) {
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

        let testX = imgX + moveX;
        let testY = imgY + moveY;

        if (nameX <= testX &&
            (nameX + nameWidth) >= testX &&
            nameY <= testY &&
            (nameY + nameHeight) >= testY) {
            if (quadrant === 2) {
                imgY -= nameHeight + imgSize;
            }

            if (quadrant === 4) {
                imgY += nameHeight + imgSize;
            }
            console.log('colidiu', quadrant, skin.src);
        }



        imgX += moveX;
        imgY += moveY;
        // console.log('src', skin.src, quadrant, imgX, imgY);


        const $img = document.createElement('img');
        $img.src = skin.src;
        $img.className = 'img-100';
        $img.style.position = 'absolute';
        $img.style.width = `${imgSize - imgMargin}px`;
        $img.style.height = `${imgSize - imgMargin}px`;
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