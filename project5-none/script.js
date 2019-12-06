window.addEventListener('DOMContentLoaded', () => {

const headerTop = document.querySelector('.header__top'),
    headerBot = document.querySelector('.header__bot'),
    header = document.querySelector('header');

let previousOffset = 0;
let counter = 0;
let headerActive = true;
window.addEventListener('scroll', (e) => {
    if(window.innerWidth < 415) {
        console.log("");
    } else {
        if (previousOffset < window.pageYOffset) {
            headerTop.style.transform = 'translate(0px,-80px)';
            headerTop.style.visibility = 'hidden';
            header.style.height = '80px';
            headerTop.style.height ="0px";
            counter = 0;
            headerActive = false;
            
        } else {
            if((counter > 25) || window.pageYOffset == 0) {
                headerTop.style.visibility = '';
                header.style.height = '';
                headerTop.style.transform = '';
                headerTop.style.height ='';
                headerActive = true;
            }
            counter++;
        }
        previousOffset = window.pageYOffset;
    }
    
    
});


header.addEventListener('mouseover',(e) => {
    headerTop.style.visibility = '';
    header.style.height = '';
    headerTop.style.transform = '';
    headerTop.style.height ='';
});

header.addEventListener('mouseout', (e) => {
    if(headerActive==false) {
        headerTop.style.transform = 'translate(0px,-80px)';
        headerTop.style.visibility = 'hidden';
        header.style.height = '80px';
        headerTop.style.height ="0px";
        counter = 0;
    }
});

let jsonQoutes;
const container = document.querySelector('.qoute__wrapper');
const loadQoutes = async (url, callback) => {
	await fetch(url)
		.then(response => response.json())
		.then(json => {
            createQoute(json.qoutes, 0);
            jsonQoutes = json.qoutes;
        });

	callback()
}

function createQoute(qoutes, counter) {
    
    let curEl = qoutes[counter];
    container.innerHTML = `
        <div class="quote"><i class="fas fa-quote-left"></i></div>
        <div class="circle" style="background-image:url('${curEl.pic}')"></div>
        <p class="page5__quote__text">${curEl.text}</p>
        <div class="line"></div>
        <p><span>${curEl.name}</span>, ${curEl.job}</p>
    `;
}

loadQoutes('./db.json', () => {
    const sliderPanel = document.querySelector('.slider__btns'),
        sliderBtns = document.querySelectorAll('.slider__btn');
    sliderPanel.addEventListener('click', (e) => {
        e.preventDefault();
        let activeBtn = document.querySelector('.slider__btn.active');
        if (e.target.classList.contains('slider__btn')) {
            activeBtn.classList.remove('active');
            e.target.classList.add('active');
            let qouteNum = e.target.dataset.num;
            container.style.opacity = '0';
            setTimeout(() => {
                createQoute(jsonQoutes, qouteNum);
                container.style.opacity = '1';
            }, 500);
            
        }
    });

    if(window.innerWidth < 415) {
        document.querySelector('.page6__top__content img').src = "./page6__rhombs__mobile.png";
    }
});



























});