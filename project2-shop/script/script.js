window.addEventListener('DOMContentLoaded', () => {

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

item.forEach(function(btn, i) {
	btn.addEventListener('click', () => {
		let items = document.querySelector('.cart-items')
			itemInCart = document.createElement('div');
			itemContain = item.innerHTML;
		itemInCart.innerHTML = itemContain;

		itemInCart.classList = 'item';
		items.appendChild(itemInCart);
	});
});
console.log(document.querySelectorAll('.item').innerHTML);
});

