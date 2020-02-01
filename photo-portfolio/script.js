window.addEventListener('DOMContentLoaded', () => {
    const photoContainer = document.querySelector('.swiper-container1 .swiper-wrapper'),
        albumContainer = document.querySelector('.swiper-container2 .swiper-wrapper');
    

    let jsonCatalogues;
    const loadPhotos = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => {
                openPhotos(json.catalogues, 0, 0);
                jsonCatalogues = json.catalogues;
            });
        callback();
    }
        
    function openPhotos(catalogues, catalogueCounter, albumCounter) {
        let curAlbum = catalogues[catalogueCounter].albums[albumCounter],
            curCatalogue = catalogues[catalogueCounter];
            photoContainer.innerHTML = '';
            albumContainer.innerHTML = ''; 
        curAlbum.photos.forEach(photo => {
            let slide = document.createElement("img");
            slide.classList.add("swiper-slide");
            slide.src = photo.pic;
            photoContainer.appendChild(slide);
        }); 
        let i = 0;
        curCatalogue.albums.forEach(album => {
            let slide = document.createElement("div");
            slide.classList.add("swiper-slide");
            slide.dataset.counter = i;
            slide.style.backgroundImage = `url('${album.prev}')`;
            albumContainer.appendChild(slide);
            i++;
        });
    }

    let currentCatalogue = 0;
    loadPhotos('./db.json', () => {
        document.querySelector('nav').addEventListener('click', (e) => {
            if (e.target.classList.contains('catalogue2') && currentCatalogue == 0) {
                openPhotos(jsonCatalogues, 1, 0);
                currentCatalogue = 1;
            } else if (e.target.classList.contains('catalogue1') && currentCatalogue == 1) {
                openPhotos(jsonCatalogues, 0, 0);
                currentCatalogue = 0;
            }
            
        });
        albumContainer.addEventListener('click', (e) => {
            openPhotos(jsonCatalogues, currentCatalogue , e.target.dataset.counter);
        });

    });


    let imageConter;
    function countImages(i) {
        i = i || 1;
        
        
        let img = new Image();
        img.onload = function() {
            imageConter = i;
            countImages(++i);
        }
        
        img.src = './pic/catalogue1/album1/' + i + '.jpg';

    }




});




