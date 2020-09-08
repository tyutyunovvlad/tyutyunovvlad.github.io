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
            let slide = document.createElement("div");
            slide.classList.add("swiper-slide");
            slide.style.backgroundImage = `url('${photo.pic}')`;
            slide.dataset.pic = photo.pic;
            photoContainer.appendChild(slide);
        }); 
        let i = 0;
        curCatalogue.albums.forEach(album => {
            let slide = document.createElement("div");
            slide.classList.add("swiper-slide");
            slide.dataset.counter = i;
            slide.style.backgroundImage = `url('${album.prev}')`;
            albumContainer.appendChild(slide);
            albumContainer.style.transform = 'translate3d(0px, 0px, 0px)';
            i++;
        });
        window.dispatchEvent(new Event('resize'));
    }

    let currentCatalogue = 0;
    loadPhotos('./db.json', () => {
        document.querySelector('nav').addEventListener('click', (e) => {
            if (e.target.classList.contains('catalogue1') && currentCatalogue != 0) {
                openPhotos(jsonCatalogues, 0, 0);
                currentCatalogue = 0;
            } else if (e.target.classList.contains('catalogue2') && currentCatalogue != 1) {
                openPhotos(jsonCatalogues, 1, 0);
                currentCatalogue = 1;
            } else if (e.target.classList.contains('catalogue3') && currentCatalogue != 2) {
                openPhotos(jsonCatalogues, 2, 0);
                currentCatalogue = 2;
            }
            
        });
        albumContainer.addEventListener('click', (e) => {
            if (e.target.dataset.counter) {
                openPhotos(jsonCatalogues, currentCatalogue , e.target.dataset.counter);
            }
            document.querySelector('body > main > div > div.swiper-container1.swiper-container-initialized.swiper-container-horizontal.swiper-container-free-mode > div').style.transform = `translate3d(0px, 0px, 0px)`;
        });

        
        photoContainer.addEventListener('click', e => {
            if(e.target.classList.contains('swiper-slide')) {
                let photoPath = e.target.dataset.pic;
                let photoView = document.createElement('div');
                photoView.classList.add('photoView');
                photoView.style.background = ` rgba(0,0,0,0.7) url("${photoPath}") no-repeat center`;
                document.body.appendChild(photoView);

                photoView.addEventListener('click', (e) => {
                    photoView.parentNode.removeChild(photoView);
                });
            }
        });

    });




    // let imageConter;
    // function countImages(i) {
    //     i = i || 1;
        
        
    //     let img = new Image();
    //     img.onload = function() {
    //         imageConter = i;
    //         countImages(++i);
    //     }
        
    //     img.src = './pic/catalogue1/album1/' + i + '.jpg';

    // }






    window.dispatchEvent(new Event('resize'));
});




