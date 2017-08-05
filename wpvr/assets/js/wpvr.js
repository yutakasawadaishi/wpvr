/* */

//
'use strict';

//
window.onload = function() {

    //
    var WPVR_ROOT_HREF = document.querySelector('body').getAttribute('wpvr_root_href');
    var WPVR_CAREGORIES_HREF = document.querySelector('body').getAttribute('wpvr_categories_href');
    var WPVR_LINK_HREF = document.querySelector('body').getAttribute('wpvr_link_href');
    var SLIDE_WIDTH = 5;

    var slides = document.querySelector('#slides');
    var slidesCount = 0;
    var slidesPosition = 0;

    var camera = document.querySelector('#camera');
    var cameraZoom = false;

    var json;

    //
    listenUiEvent();
    loadSlides(WPVR_LINK_HREF);

    //
    function listenUiEvent() {
        var uiHome = document.querySelector('#ui-home');
        uiHome.setAttribute('opacity', '1');
        uiHome.addEventListener('click', function() {
            loadSlides(WPVR_ROOT_HREF)
        });
        uiHome.addEventListener('mouseenter', function() {
            this.appendChild(getAnimFadeOut());
        });
        uiHome.addEventListener('mouseleave', function() {
            this.appendChild(getAnimFadeIn());
        });

        var uiNext = document.querySelector('#ui-next');
        uiNext.setAttribute('opacity', '1');
        uiNext.addEventListener('click', function() {
            repositionSlides('next');
        });
        uiNext.addEventListener('mouseenter', function() {
            this.appendChild(getAnimFadeOut());
        });
        uiNext.addEventListener('mouseleave', function() {
            this.appendChild(getAnimFadeIn());
        });

        var uiPrev = document.querySelector('#ui-prev');
        uiPrev.setAttribute('opacity', '1');
        uiPrev.addEventListener('click', function() {
            repositionSlides('prev');
        });
        uiPrev.addEventListener('mouseenter', function() {
            this.appendChild(getAnimFadeOut());
        });
        uiPrev.addEventListener('mouseleave', function() {
            this.appendChild(getAnimFadeIn());
        });

        var uiZoom = document.querySelector('#ui-zoom');
        uiZoom.setAttribute('opacity', '1');
        uiZoom.addEventListener('click', function() {
            if (cameraZoom) {
                repositionCamera();
            } else {
                repositionCamera(1);
            }
        });
        uiZoom.addEventListener('mouseenter', function() {
            this.appendChild(getAnimFadeOut());
        });
        uiZoom.addEventListener('mouseleave', function() {
            this.appendChild(getAnimFadeIn());
        });

        var uiCategories = document.querySelector('#ui-categories');
        uiCategories.setAttribute('opacity', '1');
        uiCategories.addEventListener('click', function() {
            loadSlides(WPVR_CAREGORIES_HREF)
        });
        uiCategories.addEventListener('mouseenter', function() {
            this.appendChild(getAnimFadeOut());
        });
        uiCategories.addEventListener('mouseleave', function() {
            this.appendChild(getAnimFadeIn());
        });

        function getAnimFadeOut() {
            var anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'opacity');
            anim.setAttribute('to', '.5');
            anim.setAttribute('dur', '250');
            return anim;
        }

        function getAnimFadeIn() {
            var anim = document.createElement('a-animation');
            anim.setAttribute('attribute', 'opacity');
            anim.setAttribute('to', '1');
            anim.setAttribute('dur', '250');
            return anim;
        }
    }

    function loadSlides(wpvr_href) {
        repositionSlides();
        repositionCamera();
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                json = JSON.parse(this.responseText);
                updateSlides();
                window.history.pushState(null, json['header']['title'], json['header']['href']);
                document.title = json['header']['title'];
            }
        };
        xhr.open('GET', wpvr_href, true);
        xhr.send();
    }

    function updateSlides() {
        slidesCount = 0;
        var temp = [];
        switch (json['header']['page_type']) {
            case 'single':
                var slidesSingle = createSlidesSingle(json['body']['articles'][0]);
                for (var i in slidesSingle) {
                    temp.push(slidesSingle[i]);
                    slidesCount++;
                }
                break;
            case 'category':
                for (var i in json['body']['articles']) {
                    temp.push(createSlideCategory(json['body']['articles'][i]));
                    slidesCount++;
                }
                break;
            case 'categories':
                for (var i in json['body']['articles']) {
                    temp.push(createSlideCategories(json['body']['articles'][i]));
                    slidesCount++;
                }
                break;
            default:
                for (var i in json['body']['articles']) {
                    temp.push(createSlideCategory(json['body']['articles'][i]));
                    slidesCount++;
                }
                break;
        }

        while (slides.firstChild) slides.removeChild(slides.firstChild);

        for (var i in temp) {
            temp[i].setAttribute('position', (i * SLIDE_WIDTH) + ' 0 0');
            slides.appendChild(temp[i]);
        }
    }

    function repositionSlides(direction) {
        switch (direction) {
            case 'next':
                slidesPosition++;
                if (slidesPosition > (slidesCount - 1)) {
                    slidesPosition = 0;
                }
                break;
            case 'prev':
                slidesPosition--;
                if (slidesPosition < 0) {
                    slidesPosition = (slidesCount - 1);
                }
                break;
            default:
                slidesPosition = 0;
                break;
        }
        var anim = document.createElement('a-animation');
        anim.setAttribute('attribute', 'position');
        anim.setAttribute('to', (slidesPosition * SLIDE_WIDTH * -1) + ' 0 0');
        anim.setAttribute('dur', '1000');
        slides.appendChild(anim);
    }

    function repositionCamera(position) {
        var to;
        switch (position) {
            case 1:
                cameraZoom = true;
                to = '0 1.7 -1';
                break;
            default:
                cameraZoom = false;
                to = '0 1.7 0';
                break;
        }
        var anim = document.createElement('a-animation');
        anim.setAttribute('attribute', 'position');
        anim.setAttribute('to', to);
        anim.setAttribute('dur', '1000');
        camera.appendChild(anim);
    }

    function createSlideCategory(article) {
        var slide = document.createElement('a-entity');
        slide.setAttribute('scale', '.95 .95 .95');

        var category = document.createElement('a-entity');
        category.setAttribute('text', 'align: left; anchor: left; baseline: center; color: #fff; lineHeight: 50; ' + 'value: ' + article.category.name);
        category.setAttribute('position', '-2.5 .5 0');
        category.setAttribute('scale', '2.5 2.5 2.5');

        var title = document.createElement('a-entity');
        title.setAttribute('text', 'align: left; anchor: left; baseline: top; color: #fff; lineHeight: 50; ' + 'value: ' + article.title);
        title.setAttribute('position', '-2.5 .25 0');
        title.setAttribute('scale', '5 5 5');

        var eyecatch = document.createElement('a-image');
        eyecatch.setAttribute('src', article.eyecatch);
        eyecatch.setAttribute('width', SLIDE_WIDTH);
        eyecatch.setAttribute('height', '3.25');
        eyecatch.setAttribute('position', '0 0 -.25');
        eyecatch.setAttribute('opacity', '.75');

        var excerpt = document.createElement('a-entity');
        excerpt.setAttribute('text', 'align: left; anchor: left; baseline: top; color: #fff; lineHeight: 75; ' + 'value: ' + article.excerpt);
        excerpt.setAttribute('position', '-2.5 -.5 0');
        excerpt.setAttribute('scale', '2.5 2.5 2.5');

        slide.setAttribute('wpvr_href', article.wpvr_href);
        slide.addEventListener('click', function() {
            loadSlides(this.getAttribute('wpvr_href'));
        });

        slide.appendChild(eyecatch);
        slide.appendChild(category);
        slide.appendChild(title);
        slide.appendChild(excerpt);

        return slide;
    }

    function createSlideCategories(article) {
        var slide = document.createElement('a-entity');
        slide.setAttribute('scale', '.95 .95 .95');

        var title = document.createElement('a-entity');
        title.setAttribute('text', 'align: center; anchor: left; baseline: top; color: #fff; lineHeight: 50; ' + 'value: ' + article.title);
        title.setAttribute('position', '-2.5 .25 0');
        title.setAttribute('scale', '5 5 5');

        var eyecatch = document.createElement('a-image');
        eyecatch.setAttribute('src', article.eyecatch);
        eyecatch.setAttribute('width', SLIDE_WIDTH);
        eyecatch.setAttribute('height', '3.25');
        eyecatch.setAttribute('position', '0 0 -.25');
        eyecatch.setAttribute('opacity', '.75');

        slide.setAttribute('wpvr_href', article.wpvr_href);
        slide.addEventListener('click', function() {
            loadSlides(this.getAttribute('wpvr_href'));
        });

        slide.appendChild(eyecatch);
        slide.appendChild(title);

        return slide;
    }

    function createSlidesSingle(article) {
        var slide = [];

        var cover = document.createElement('a-entity');

        var category = document.createElement('a-entity');
        category.setAttribute('text', 'align: left; anchor: left; baseline: center; color: #fff; lineHeight: 50; ' + 'value: ' + article.category.name);
        category.setAttribute('position', '-2.5 .5 0');
        category.setAttribute('scale', '2.5 2.5 2.5');

        var title = document.createElement('a-entity');
        title.setAttribute('text', 'align: left; anchor: left; baseline: center; color: #fff; lineHeight: 50; ' + 'value: ' + article.title);
        title.setAttribute('position', '-2.5 0 0');
        title.setAttribute('scale', '5 5 5');

        var eyecatch = document.createElement('a-image');
        eyecatch.setAttribute('src', article.eyecatch);
        eyecatch.setAttribute('width', SLIDE_WIDTH);
        eyecatch.setAttribute('height', '3.25');
        eyecatch.setAttribute('position', '0 0 -.25');
        eyecatch.setAttribute('opacity', '.75');

        cover.appendChild(eyecatch);
        cover.appendChild(category);
        cover.appendChild(title);

        cover.addEventListener('click', function() {
            repositionSlides('next');
        });

        slide.push(cover);

        for (var i in article['contents']) {
            var content = document.createElement('a-entity');
            content.setAttribute('text', 'align: left; anchor: left; baseline: center; color: #fff; lineHeight: 75; ' + 'value: ' + article.contents[i]);
            content.setAttribute('position', '-2.5 0 0');
            content.setAttribute('scale', '2.5 2.5 2.5');
            content.addEventListener('click', function() {
                repositionSlides('next');
            });
            slide.push(content);
        }

        if (article['images'].length) {
            for (var i in article['images']) {
                var image = document.createElement('a-image');
                image.setAttribute('src', article.images[i]);
                image.setAttribute('width', SLIDE_WIDTH);
                image.setAttribute('height', '3.25');
                image.setAttribute('scale', '.95 .95 .95');
                image.addEventListener('click', function() {
                    repositionSlides('next');
                });
                slide.push(image);
            }
        }

        return slide;
    }

};