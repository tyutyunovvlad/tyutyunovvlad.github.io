const goodsWrapper = document.querySelector('.goods'),
toCartButtons = document.querySelectorAll('.to-cart'),
catalogButton = document.querySelector('.catalog-button');

getData().then((data) => {
    renderData(data);

    const cartButton = document.querySelector('#cart'),
    cartBody = document.querySelector('.cart'),
    cartWrapper = document.querySelector('.cart-wrapper'),
    goodsCounterWrapper = document.querySelector('.counter'),
    toCartButtons = document.querySelectorAll('.to-cart'),
    goods = document.querySelectorAll('.card'),
    discountCheckboxes = document.querySelectorAll('.filter-check_checkbox'),
    filterPriceInputs = document.querySelectorAll('.filter-price_input'),
    goodsPrices = document.querySelectorAll('.card .card-price span'),
    search = document.querySelector('.search-wrapper_input'),
    searchBtn = document.querySelector('.search-btn'),
    goodsWrapper = document.querySelector('.goods'),
    catalogButton = document.querySelector('.catalog-button');

let goodsCounter = goodsCounterWrapper.innerHTML;




for (let i = 0; i < discountCheckboxes.length; i++) {
    discountCheckboxes[i].addEventListener('change', function(){
        if (this.checked) {
            this.nextElementSibling.classList.add('checked');
            goods.forEach(function(elem) {
                let checker = elem.querySelector('.card-sale');
                if(checker === null){
                    elem.parentNode.style.display = 'none';
                } 
            });
        } else {
            this.nextElementSibling.classList.remove('checked');
            goods.forEach(function(elem) {
                elem.parentNode.style.display = 'block';
            })
        }
    });
    
}

cartButton.addEventListener('click', () => {
    cartBody.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.body.style.marginRight = '15px';
});


cartBody.addEventListener('click', function() {
    if(event.target.classList.contains('cart-close') || event.target === this) {
        cartBody.style.display = 'none';
        document.body.style.overflow = 'visible';
        document.body.style.marginRight = '0';
    }
});

goods.forEach(function(card) {
    let btn = card.querySelector('button');
    btn.addEventListener('click', () => {

        if(btn.classList.contains('card__added')) {
            return;
        }

        btn.classList.add('card__added');
        btn.innerHTML = `В корзине &#10004`;


        let goodClone = card.cloneNode(true);
        let xButton = document.createElement('div');
        goodClone.querySelector('button').style.display = 'none';
        xButton.innerHTML = `&times`;
        xButton.classList.add('xButton');
        xButton.addEventListener('click', () => {
            xButton.parentNode.remove();
            goodsCounter--;
            goodsCounterWrapper.innerHTML = goodsCounter;
            if( goodsCounter == 0) {
                document.querySelector('#cart-empty').style.display = 'block';
            }
            btn.classList.remove('card__added');
            btn.innerHTML = `В корзину`;
            changeTotalPrice();
        });
        goodClone.appendChild(xButton);
        cartWrapper.appendChild(goodClone);
        goodsCounter++;
        goodsCounterWrapper.innerHTML = goodsCounter;
        document.querySelector('#cart-empty').style.display = 'none';
        changeTotalPrice();
    });
});


function changeTotalPrice() {
    const cardPrices = cartWrapper.querySelectorAll('.card-price span'),
        cardTotal = document.querySelector('.cart-total span');
    let totalPrice = 0;
    cardPrices.forEach(function(elem) {
       totalPrice += +elem.innerHTML; 
       console.log(elem.innerHTML);
    });
    cardTotal.innerHTML = totalPrice;
}

filterPriceInputs.forEach((input) => {
    input.addEventListener('change', () => {
        goodsPrices.forEach(function(price) {
            if(min.value != '' && max.value != '') {
                if(+price.innerHTML < min.value || +price.innerHTML > max.value) {
                    price.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                } else {
                    price.parentNode.parentNode.parentNode.parentNode.style.display = 'block';
                }
            } else if (min.value == '' && max.value != '') {
                if(+price.innerHTML > max.value) {
                    price.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                } else {
                    price.parentNode.parentNode.parentNode.parentNode.style.display = 'block';
                }
            } else if (max.value == '' && min.value != '') {
                if(+price.innerHTML < min.value) {
                    price.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                } else {
                    price.parentNode.parentNode.parentNode.parentNode.style.display = 'block';
                }
            } else {
                price.parentNode.parentNode.parentNode.parentNode.style.display = 'block';
            }
        });
    });
});

searchBtn.addEventListener('click', searchGoods);
search.addEventListener('keydown', (e) => {
   if(e.keyCode == 13) {
       searchGoods();
   } 
});

function searchGoods() {
    let searchText = new RegExp(search.value.trim(), 'i');
    goods.forEach((good) => {
        const title = good.querySelector('.card-title');
        if(!searchText.test(title.textContent)) {
            good.parentNode.style.display = 'none';
        } else {
            good.parentNode.style.display = '';
        }
    });
}

let catalogOpened = false;
catalogButton.addEventListener('click', () => {
    if (catalogOpened) {
        document.querySelector('.catalog').style.display = 'none';
        catalogOpened = false;
    } else {
        document.querySelector('.catalog').style.display = 'block';
        catalogOpened = true;
    }
});

renderCatalog();
});




function getData() {
    return fetch('https://tyutyunovvlad.github.io/project-JS-Ozon/db/db.json')
        .then((response) => {
            if (response.ok == true) {
                console.log('very goooddd');
                return response.json();
            } else {
                throw new Error ('very baaddd: ' + response.status);
            }
        })
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.warn(err);
            goodsWrapper.innerHTML = '<div class="goods__error">Very baadd, please try later</div>'
        });
}

function renderData(data) {
    data.goods.forEach((elem) => {
        let newCard = document.createElement('div');
        newCard.classList.add('col-12', 'col-md-6', 'col-lg-4', 'col-xl-3');
        newCard.innerHTML = `
            <div class="card" data-category="${elem.category}">
                <div class="card-img-wrapper">
                    <span class="card-img-top"
                        style="background-image: url('${elem.img}')"></span>
                </div>
                <div class="card-body justify-content-between">
                    <div class="card-price"><span>${elem.price}</span> ₽</div>
                    <h5 class="card-title">${elem.title}</h5>
                    <button class="btn btn-primary to-cart">В корзину</button>
                </div>
            </div>
        `
        if(elem.sale == true) {
            let saleBlock = document.createElement('div');
            saleBlock.innerHTML = `🔥Hot Sale🔥`;
            saleBlock.classList.add('card-sale');
            newCard.querySelector('.card').appendChild(saleBlock);
        }
        goodsWrapper.appendChild(newCard);
    });
}


function renderCatalog() {
    const cards = document.querySelectorAll('.goods .card'),
        catalogList = document.querySelector('.catalog-list'),
        categories = new Set(),
        catalog = document.querySelector('.catalog');

    cards.forEach((card) => {
        categories.add(card.dataset.category);
    });

    categories.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        catalogList.appendChild(li);
        li.addEventListener('click', () => {
            cards.forEach((card) => {
                if (card.dataset.category != item) {
                    card.parentNode.style.display = 'none';
                } else {
                    card.parentNode.style.display = 'block';
                }
            });
        });
    });


}
