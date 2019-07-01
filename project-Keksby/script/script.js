const checkBox = document.querySelector(".check__input"),
    checkSpan = document.querySelector(".check__span"),
    hamburger = document.querySelector(".header__hamburger"),
    menu = document.querySelector(".header__menu"),
    headerButton = document.querySelector(".header__button"),
    logo = document.querySelector(".header__logo"),
    mMenu = document.querySelector(".m-menu"),
    slider = document.querySelector(".page5__goods"),
    item1 = document.querySelector("#item1"),
    item2 = document.querySelector("#item2"),
    item3 = document.querySelector("#item3");
let startingX,
    curLeft;
    





checkSpan.addEventListener('click', () => {
    if (!checkBox.hasAttribute("checked")) {
        checkBox.setAttribute("checked", '');
    } else {
        checkBox.removeAttribute("checked");   
    }
});

let menuOpened = false;

hamburger.addEventListener('click', () => {
    if (menuOpened === false) {
        logo.style.transform ="translate(300px, 0)";
        menuOpened = true;
        hamburger.style.transform = 'rotate(90deg)';
        mMenu.style.transform = 'translateX(10%)';

    } else {
        logo.style.display = 'block';
        menuOpened = false;
        hamburger.style.transform = 'rotate(0deg)';
        logo.style.transform ="translate(0, 0)";
        mMenu.style.transform = 'translateX(-200%)';
    }
});

function i1handleTouchStart(evt) {
    startingX = evt.touches[0].clientX;
    let sliderStyle = window.getComputedStyle(slider),
        leftString = sliderStyle.getPropertyValue('left'),
        left = "";
    for (let i = 0; i < leftString.length; i++) {
        if (leftString[i] == "." || leftString[i] =="p"){
            break;
        }
        left += leftString[i];
    }  
    curLeft = left;
    console.log(curLeft);
    slider.style.transition = '';
};
function i1handleTouchMove(evt) {
    let touch = evt.touches[0].clientX;
    if (touch < startingX) {
        let change = startingX - touch; 
        slider.style.left = curLeft - change + 'px'; 
    } else {
        console.log('touch',touch);
        console.log('startingX',startingX);
        console.log('curLeft',curLeft);
        let change = touch - startingX; 
        console.log('change', change);
        slider.style.left = +curLeft + +change + 'px';
    }
    // item1.style.left = '-' + change + 'px';
    // item2.style.left =  (screen.width*32/50 - change) + 'px';
    evt.preventDefault();
};
function i1handleTouchEnd(evt) {
    // let change = startingX - evt.changedTouches[0].clientX;
    // let half = screen.width / 3;
    // if (change < half) {
    //     // item1.style.left = '0';
    //     // item2.style.left='80%';
    // } else {
    //     // item1.style.transition = "all ease-in-out 0.3s";
    //     // item2.style.transition = "all ease-in-out 0.3s";
    //     // item1.style.left = "-60%";
    //     // item2.style.left = "20%";
    // }    
};

// function i2handleTouchStart(evt) {
//     startingX = evt.touches[0].clientX;
//     item1.style.transition = '';
//     item2.style.transition = '';
// }
// function i2handleTouchMove(evt) {
//     let touch = evt.touches[0].clientX;
//     let change = touch - startingX;
//     if (change < 0) {
//         return;
//     }
//     item1.style.left = (change - screen.width) + 'px';
//     item2.style.left = change + 'px';
//     evt.preventDefault();
// }
// function i2handleTouchEnd(evt) {
//     let change = evt.changedTouches[0].clientX - startingX;
//     let half = screen.width / 4;
//     if (change < half) {
//         item1.style.left = '-100%';
//         item2.style.left = '0';
//     } else {
//         item1.style.transition = 'all .3s';
//         item2.style.transition = 'all .3s';
//         item1.style.left = '0';
//         item2.style.left = '100%';
//     }
// }




function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }