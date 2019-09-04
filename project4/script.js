menu();

function menu() {
    const menuOpenBtn = document.querySelector('.header__menu__btn'),
        mobileMenuBody = document.querySelector('.mobile__menu'),
        menuCloseBtn = document.querySelector('.menu__close__btn');

    menuOpenBtn.addEventListener('click', () => {
        mobileMenuBody.style.transition = 'all 1s ease-in-out';
        mobileMenuBody.style.transform = 'translate(0, 0)';
        mobileMenuBody.style.position = 'fixed';
        document.body.style.overflow = 'hidden';
        document.querySelector('html').style.overflow = 'hidden';
    });

    menuCloseBtn.addEventListener('click', () => {
        mobileMenuBody.style.transform = 'translate(0, -100%)';
        mobileMenuBody.style.position = 'fixed';
        document.body.style.overflow = '';
        document.querySelector('html').style.overflow = '';
    });
}

let startingX, curLeft;
const slider = document.querySelector('.page4__content');

function page4ContentTouchStart(evt){
    startingX = evt.touches[0].clientX;
    console.log(startingX);
    let sliderLeftStr = window.getComputedStyle(slider).getPropertyValue('left');
    let left = "";
    for(let i = 0; i < sliderLeftStr.length; i++) {
        if(sliderLeftStr[i] == '.' || sliderLeftStr[i] == 'p') {
            break;
        }
        left += sliderLeftStr[i];
    }
    curLeft = left;
    slider.style.transition ='';
}

function page4ContentTouchMove(evt){
    let touch = evt.touches[0].clientX;
    if (touch < startingX) {
        let change = startingX -touch;
        slider.style.left = curLeft - change + 'px';
    } else {
        let change = touch -startingX;
        slider.style.left = +curLeft + +change +'px';
    }
    evt.preventDefault();
}

function page4ContentTouchEnd(evt){
    
}