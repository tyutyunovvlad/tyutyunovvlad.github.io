const checkBox = document.querySelector(".check__input"),
    checkSpan = document.querySelector(".check__span"),
    hamburger = document.querySelector(".header__hamburger"),
    menu = document.querySelector(".header__menu"),
    headerButton = document.querySelector(".header__button"),
    logo = document.querySelector(".header__logo");

    
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
        logo.style.opacity = '0';
        logo.style.transform ="translate(200px, 0)";
        menuOpened = true;
        hamburger.style.transform = 'rotate(90deg)';
        menu.style.transform ="translate(-80px, 0)";
        headerButton.style.transform ="translate(25px,0)";
    } else {
        logo.style.display = 'block';
        menuOpened = false;
        hamburger.style.transform = 'rotate(0deg)';
        logo.style.opacity = '1';
        logo.style.transform ="translate(0, 0)";
        menu.style.transform ="translate(-70px, -100px)";
        headerButton.style.transform ="translate(50px,-100px)";
    }
});
