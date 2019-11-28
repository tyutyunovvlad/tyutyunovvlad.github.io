const headerTop = document.querySelector('.header__top'),
    headerBot = document.querySelector('.header__bot'),
    header = document.querySelector('header');

let previousOffset = 0;
let counter = 0;
window.addEventListener('scroll', (e) => {
    if (previousOffset < window.pageYOffset) {
        headerTop.style.display = 'none';
        header.style.height = '80px';
        counter = 0;
    } else {
        if((counter > 25) || window.pageYOffset == 0) {
            headerTop.style.display = '';
            header.style.height = '';
        }
        counter++;
    }
    previousOffset = window.pageYOffset;
    console.log(counter);
    
});




