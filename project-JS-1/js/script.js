window.addEventListener('DOMContentLoaded', () => {

const  loadContent = async (url, callback) => {
	await fetch(url)
		.then(response => response.json())
		.then(json => createElement(json.goods));

	callback();
}

function createElement(arr) {
	const goodsWrapper = document.querySelector('.goods__wrapper');

	arr.forEach(function(item) {
		let goodsItem = document.createElement('div');
		goodsItem.classList.add('goods__item');
		goodsItem.innerHTML = `
			<img class="goods__img" src="${item.url}" alt="phone">
            <div class="goods__colors">Доступно цветов: 4</div>
            <div class="goods__title">
                ${item.title}
            </div>
            <div class="goods__price">
                <span>${item.price}</span> руб/шт
            </div>
            <button class="goods__btn">Добавить в корзину</button>
		`;
		goodsWrapper.appendChild(goodsItem);
	});
}


loadContent('js/db.json', () => {
	const cartWrapper = document.querySelector('.cart__wrapper'),
		cart = document.querySelector('.cart'),
		close = document.querySelector('.cart__close'),
		open = document.querySelector('#cart'),
		goodsBtn = document.querySelectorAll('.goods__btn'),
		products = document.querySelectorAll('.goods__item'),
		confirm = document.querySelector('.confirm'),
		badge = document.querySelector('.nav__badge'),
		totalCost = document.querySelector('.cart__total > span'),
		titles = document.querySelectorAll('.goods__title');

	function openCart() {
		cart.style.display = 'block';
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = '16px';
	}

	function closeCart() {
		cart.style.display = 'none';
		document.body.style.overflow = '';
		document.body.style.paddingRight = '0px';
	}



	open.addEventListener('click', openCart);
	close.addEventListener('click', closeCart);

	goodsBtn.forEach(function(btn, i) {
		btn.addEventListener('click', () => {
			let item = products[i].cloneNode(true),
				noButton = item.querySelector('button'),
				xButton = document.createElement('div'),
				emptyText = cartWrapper.querySelector('.empty');
				badgeCounter = badge.textContent;
			noButton.style.display = 'none';
			badgeCounter++;
			badge.textContent = badgeCounter;
			itemAdded();
			xButton.classList.add('goods__item-remove');
			xButton.innerHTML = '&times';
			item.appendChild(xButton);
			cartWrapper.appendChild(item);
			if (emptyText) {
				emptyText.style.display = 'none';
			}
			calcTotal();
			removeFromCart();
		});

	});



	function sliceTitle() {
		titles.forEach(function(title) {
		if (title.textContent.length < 65) {
			return;
		} else {
		const str = title.textContent.slice(0, 65) + '...';
		title.textContent = str;
		}
	}); }

	function itemAdded() {
		confirm.style.display = 'block';
		let counter = 100;
		const id = setInterval(frame, 10);
		function frame() {
			if (counter <= 10) {
				clearInterval(id);
				confirm.style.display = 'none';
			} else {
				counter--;
				confirm.style.opacity = '0.' + counter;
				confirm.style.transform =`translateY(${counter}px)`;
			}
		}
	}

	function calcTotal() {
		const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
		let total = 0;
		prices.forEach(function(item) {
			total += +item.textContent;
		});
		totalCost.textContent = total;
	}

	function removeFromCart() {
		const xButton = cartWrapper.querySelectorAll('.goods__item-remove'),
		emptyText = cartWrapper.querySelector('.empty');
		let badgeCounter = badge.textContent;
		xButton.forEach(function(btn) {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				badgeCounter--;
				badge.textContent = badgeCounter;
				calcTotal();
				if (badgeCounter == 0) {
					emptyText.style.display = 'block';
				}

			});
		});
	}

	sliceTitle();
	});
});

/****  GETTING
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(json => console.log(json))

  ****/

    /****  POSTING

let example = {username: "Ivan"};

fetch('https://jsonplaceholder.typicode.com/posts', 
{
	method: "POST",
	body: JSON.stringify(example)

})
  .then(response => response.json())
  .then(json => console.log(json)) 

   ****/