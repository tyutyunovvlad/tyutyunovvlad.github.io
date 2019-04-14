const switcher = document.querySelector("#cbx"),
	more = document.querySelector(".more"),
	modal = document.querySelector(".modal"),
	videos = document.querySelectorAll(".videos__item");
let player;

function bindSlideToggle(trigger, boxBody, content, openClass) {
	let button = {
		'element': document.querySelector(trigger),
		'active': false
	};
	const box = document.querySelector(boxBody),
		boxContent = document.querySelector(content);

	button.element.addEventListener('click', () => {
		if (button.active === false) {
			button.active = true;
			box.style.height = boxContent.clientHeight + 'px';
			box.classList.add(openClass);
		} else {
			button.active = false;
			box.style.height = 0 +'px';
			box.classList.remove(openClass);
		}
	});
}

bindSlideToggle('.hamburger', '[data-slide="nav"]', '.header__menu', 'slide-active');

function switchMode() {
	if (nightMode === false) {
		nightMode = true;
		document.body.classList.add('night');
		document.querySelectorAll('.hamburger > line').forEach(item => {
			item.style.stroke = "#fff";
		});
		document.querySelector('.logo > img').src =  'logo/youtube_night.svg';
	} else {
		nightMode = false;
		document.body.classList.remove('night');
		document.querySelectorAll('.hamburger > line').forEach(item => {
			item.style.stroke = "#000";
		});
		document.querySelector('.logo > img').src =  'logo/youtube.svg';
	}
}

let nightMode = false;

switcher.addEventListener('change', () => {
	switchMode();
});

// const data = [
//        	['img/thumb_3.webp', 'img/thumb_4.webp', 'img/thumb_5.webp'],
//         ['#3 Верстка на flexbox CSS | Блок преимущества и галерея | Марафон верстки | Артем Исламов',
//             '#2 Установка spikmi и работа с ветками на Github | Марафон вёрстки  Урок 2',
//             '#1 Верстка реального заказа landing Page | Марафон вёрстки | Артём Исламов'],
//         ['3,6 тыс. просмотров', '4,2 тыс. просмотров', '28 тыс. просмотров'],
//         ['X9SmcY3lM-U', '7BvHoh0BrMw', 'mC8JW_aG2EM']
//     ];

// more.addEventListener('click', () => {
// 	const videosWrapper = document.querySelector(".videos__wrapper");
// 	more.remove();

// 	for (let i = 0; i < data[0].length; i++) {
// 		let card = document.createElement('a');
// 		card.classList.add('videos__item', 'videos__item-active');
// 		card.setAttribute('data-url', data[3][i]);
// 		card.innerHTML = `
// 			<img src="${data[0][i]}" alt="thumb">
//             <div class="videos__item-descr">
//                 ${data[1][i]}
//             </div>
//             <div class="videos__item-views">
//                 ${data[2][i]}
//             </div>
// 		`;
// 		videosWrapper.appendChild(card);
// 		setTimeout(() => {
// 			card.classList.remove('videos__item-active');
// 		}, 10);
// 		bindNewModal(card);
// 	}
// 	sliceTitle('.videos__item-descr', 100);	
// });

function start() {
	gapi.client.init({  ////////////////////////////////підтвердження на дозвіл ///////////////////////////////////// 
		'apiKey': 'AIzaSyBu3EbMAjCJquREOhQ4Qu6vAplAlGGuKGY',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
	}).then(function() {  //////////////////////////////// Запрошуємо дані ///////////////////////////////////// 
		return gapi.client.youtube.playlistItems.list({
			"part": "snippet,contentDetails",
			"maxResults": "16",
			"playlistId": "PLDY5HKIUQrLbqNM8aZ1qy84labIu6qOu7"
		});
	}).then(function(response) { //////////////////////////////// дії з відповідю /////////////////////////////////////                                                            
		console.log(response.result);
		const videosWrapper = document.querySelector(".videos__wrapper");

		response.result.items.forEach(item => {
			let card = document.createElement('a');
			
			card.classList.add('videos__item', 'videos__item-active');
			card.setAttribute('data-url', item.contentDetails.videoId);

			card.innerHTML = `
				<img src="${item.snippet.thumbnails.high.url}" alt="thumb">
				<div class="videos__item-descr">
						${item.snippet.title}
				</div>
				<div class="videos__item-views">
						Шо дивися
				</div>
			`;
			videosWrapper.appendChild(card);
			setTimeout(() => {
				card.classList.remove('videos__item-active');
			}, 10);
		});

		sliceTitle();
		bindModal(document.querySelectorAll('.videos__item'));

	}).catch( e => {  ////////////////////////////// на випадок помилки //////////////////////////////////
		console.log(e);
	});
}

more.addEventListener('click', () => {
	more.remove();
	gapi.load('client', start);
});

function sliceTitle(content, sliceTo) {
	document.querySelectorAll(content).forEach(item => {
		item.textContent.trim();
		if (item.textContent.length < sliceTo){
			return;
		} else {
			const str = item.textContent.slice(0, sliceTo) + "...";
			item.textContent = str;
		}
	});
}

sliceTitle('.videos__item-descr', 100);


function openModal() {
	modal.style.display = 'block';
}

function closeModal() {
	modal.style.display = 'none';
	player.stopVideo();
}

function bindModal(cards) {
	cards.forEach(item => {
		item.addEventListener('click', (e) => {
			e.preventDefault();
			const id = item.getAttribute('data-url');
			loadVideo(id);
			openModal();
		});
	});
}

function bindNewModal(cards) {
		cards.addEventListener('click', (e) => {
			e.preventDefault();
			const id = cards.getAttribute('data-url');
			loadVideo(id);
			openModal();
	});
}

modal.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal')) {
		closeModal();
	}
});

document.addEventListener('keydown', function (e) {
	 if (e.keyCode === 27) {
		  closeModal(); 
		} 
	});

bindModal(videos);

function createPlayer() {
	var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	setTimeout(() => {
		player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: 'M7lc1UVf-VE',
		  });
	}, 300);
	
}

createPlayer();

function loadVideo(id) {
	player.loadVideoById({'videoId':`${id}`});
}




//  AIzaSyBu3EbMAjCJquREOhQ4Qu6vAplAlGGuKGY