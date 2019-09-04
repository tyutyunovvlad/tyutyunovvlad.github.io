window.addEventListener('DOMContentLoaded', () => {

const loadContent = async (url, callback) => {
	await fetch(url)
		.then(response => response.json())
		.then(json => createElement(json.goods));

	callback()
}

function createElement(arr) {
	const goodsWrapper = document.querySelector('.items');

	arr.forEach(function(item) {
		let goodsItem = document.createElement('div');
		goodsItem.classList.add('item');
		goodsItem.innerHTML = `
			<div class="item"><a href="#">
			<img src="${item.pic}" alt="product">
			<h6>${item.title}</h6>
			<p class="price">$${item.price}</p>
			<p>tap to buy</p>
			</a></div>
		`;
		goodsWrapper.appendChild(goodsItem);
		goodsItem.addEventListener('click', () => {
			const items = document.querySelector('.cart-items');
			let itemInCart = document.createElement('div');
			itemInCart.classList.add('item');
			itemInCart.innerHTML = `<img src="${item.pic}" alt="">
			<h6 class="name">${item.title}</h6>
			<p class="color">${item.color}</p>
			<p class="price"><span>${item.price}</span>$</p>
			<div class="del">x</div>`;
			items.appendChild(itemInCart);
		});
	});



	// arr.forEach((elem) => {
	// 	elem.addEventListener('click', () => {
	// 		const items = document.querySelector('.cart-items');
	// 		let itemInCart = document.createElement('div');
	// 		itemInCart.classList.add('item');
	// 		itemInCart.innerHTML = `<img src="pic/products/Apple TV 32GB.jpg" alt="">
	// 		<h6 class="name">Apple TV 32GB</h6>
	// 		<p class="color">black</p>
	// 		<p class="price"><span>49.99</span>$</p>
	// 		<div class="del">x</div>`;
	// 		items.appendChild(itemInCart);
	// 	});
	// });
}


loadContent('script/db.json', () => {

	const cartPage = document.querySelector('.cart-page'),
		cartBtn = document.querySelector('.cart-btn'),
		cartClose = document.querySelector('.cart-page > .background'),
		items = document.querySelector('.items'),
		item = document.querySelectorAll('.items > .item');


	function openCart() {
		cartPage.style.display = 'block';
		document.body.style.overflow = 'hidden';
		document.body.style.paddingRight = '16px';
	}

	function closeCart() {
		cartPage.style.display = 'none';
		document.body.style.overflow = 'visible';
		document.body.style.paddingRight = '0';
	}

	cartBtn.addEventListener('click', openCart);
	cartClose.addEventListener('click', closeCart);

	
	// item.forEach(function(btn, i) {
	// 	btn.addEventListener('click', (e) => {
	// 		let items = document.querySelector('.cart-items')
	// 			itemInCart = document.createElement('div');
	// 			itemContain = item.innerHTML;
	// 		e.preventDefault();
	// 		itemInCart.innerHTML = `
	// 			<img src="${i.pic}" alt="">
	// 			<h6 class="name">${item.title}</h6>
	// 			<p class="color">black</p>
	// 			<p class="price"><span>${item.price}</span>$</p>
	// 			<div class="del">x</div>
	// 		`;
	// 		itemInCart.classList.add('item');
	// 		items.appendChild(itemInCart);
	// 	});

	// });

	


	console.log(document.querySelectorAll('.item').innerHTML);
	});
});







