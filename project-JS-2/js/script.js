const switcher = document.querySelector("#cbx"),
	more = document.querySelector(".more"),
	modal = document.querySelector(".modal"),
	videos = document.querySelectorAll(".videos__item");
	searchBar = document.querySelector(".search");
	searchBarInput = document.querySelector(".search > input");
	videosWrapper = document.querySelector(".videos__wrapper")
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

function search(target) {
	gapi.client.init({  ////////////////////////////////підтвердження на дозвіл ///////////////////////////////////// 
		'apiKey': 'AIzaSyBu3EbMAjCJquREOhQ4Qu6vAplAlGGuKGY',
		'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest']
	}).then(function() {
		return gapi.client.youtube.search.list({
			"maxResults": "9",
			"part": "snippet",
			"q": `${target}`,
			"type": ""
		});
	}).then(function(response) {
		console.log(response.result);
		videosWrapper.innerHTML = '';

		response.result.items.forEach(item => {
			let card = document.createElement('a');
			
			card.classList.add('videos__item', 'videos__item-active');
			card.setAttribute('data-url', item.id.videoId);

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
	})
}

searchBar.addEventListener('submit', (e) => {
	e.preventDefault();
	gapi.load('client', () => { search(searchBarInput.value) });
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
	nightModal();
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

function nightModal() {
	if (nightMode == true){
		modal.style.background = "rgb(100 100 100 / 0.2)";
	}
}


//  AIzaSyBu3EbMAjCJquREOhQ4Qu6vAplAlGGuKGY