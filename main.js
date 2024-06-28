const headline1 = document.getElementsByClassName('pc_headline_text1');
const headline2 = document.getElementsByClassName('pc_headline_text2');
const headline3 = document.getElementsByClassName('pc_headline_text3');
const slideExtras = document.getElementsByClassName('pc_slide_extras_box');
const slideTitles = document.getElementsByClassName('pc_slide_title');
const slideInfoText = document.getElementsByClassName('pc_slide_info_text');
const slideHyperlinks = document.getElementsByClassName('pc_slide_hyperlink');
const outerCircleSVG = document.getElementsByClassName('outer_circle_svg');
const innerCircleSVG = document.getElementsByClassName('inner_circle_svg');
const progressRing = document.getElementById('Opaque_Ring');
const slideContainer = document.getElementById('pc_image_slider');
const imageSlides = document.getElementsByClassName('pc_slide_img');
const mobileSlider = document.getElementById('mobile_slider');
const mobileSliderCards = document.getElementsByClassName('mobile_slider_card');
const mobileSliderImages = document.getElementsByClassName('mobile_slider_img_container');
const mobileSliderInfo = document.getElementsByClassName('mobile_slider_details_container');
const navDots = document.getElementsByClassName('nav_dots');
const rootElement = document.querySelector(':root');
const backgroundColorsList1 = ['rgb(77, 39, 205)', 'rgb(77, 39, 205)', 'rgb(14, 18, 58)', 'rgb(22, 38, 59)', 'rgb(18, 76, 161)', 'rgb(1, 44, 145)', 'rgb(0, 131, 76)'];
const backgroundColorsList2 = ['rgb(204, 204, 206)', 'rgb(28, 3, 98)', 'rgb(20, 23, 72)', 'rgb(13, 19, 27)', 'rgb(38, 207, 227)', 'rgb(255, 255, 255)', 'rgb(1, 183, 105)'];

let cur = 0;
let n = headline1.length;

for(let i=0;i<n;i++){
    mobileSliderInfo[i].style.backgroundColor = backgroundColorsList1[i];
    mobileSliderImages[i].style.backgroundColor = backgroundColorsList2[i];
}

function change() {
    for (let i = 0; i < cur; i++) {
        headline1[i].classList.add('inactive');
        headline1[i].classList.remove('active');
        headline2[i].classList.add('inactive');
        headline2[i].classList.remove('active');
        headline3[i].classList.add('inactive');
        headline3[i].classList.remove('active');
        slideExtras[i].classList.add('inactive');
        slideExtras[i].classList.remove('active');
        slideTitles[i].classList.add('inactive');
        slideTitles[i].classList.remove('active');
        slideInfoText[i].classList.add('inactive');
        slideInfoText[i].classList.remove('active');
        slideHyperlinks[i].classList.add('inactive');
        slideHyperlinks[i].classList.remove('active');
        outerCircleSVG[i].style.stroke = 'var(--color-svg-active-stroke)';
        innerCircleSVG[i].style.fill = 'var(--color-svg-active-fill)';
        imageSlides[i].classList.remove('active_slide');
        mobileSliderCards[i].classList.remove('active_card');
        navDots[i].style.backgroundColor = 'var(--color-font-disabled)';
    }

    rootElement.style.setProperty('--color-background1', backgroundColorsList1[cur]);
    rootElement.style.setProperty('--color-background2', backgroundColorsList2[cur]);
    headline1[cur].classList.remove('inactive');
    headline1[cur].classList.add('active');
    headline2[cur].classList.remove('inactive');
    headline2[cur].classList.add('active');
    headline3[cur].classList.remove('inactive');
    headline3[cur].classList.add('active');
    slideExtras[cur].classList.remove('inactive');
    slideExtras[cur].classList.add('active');
    slideTitles[cur].classList.remove('inactive');
    slideTitles[cur].classList.add('active');
    slideInfoText[cur].classList.remove('inactive');
    slideInfoText[cur].classList.add('active');
    slideHyperlinks[cur].classList.remove('inactive');
    slideHyperlinks[cur].classList.add('active');
    outerCircleSVG[cur].style.stroke = 'var(--color-svg-active-stroke)';
    innerCircleSVG[cur].style.fill = 'var(--color-svg-active-fill)';
    progressRing.style.strokeDasharray = `${135.5 * cur}, 1000`;
    slideContainer.style.transform = `translateY(${-100 * cur}%)`;
    imageSlides[cur].classList.add('active_slide');
    mobileSliderCards[cur].classList.add('active_card');
    mobileSliderCards[cur].scrollIntoView({behavior: 'smooth'});
    navDots[cur].style.backgroundColor = 'var(--color-font-bold)';

    for (let i = cur + 1; i < n; i++) {
        headline1[i].classList.remove('active');
        headline1[i].classList.remove('inactive');
        headline2[i].classList.remove('active');
        headline2[i].classList.remove('inactive');
        headline3[i].classList.remove('active');
        headline3[i].classList.remove('inactive');
        slideExtras[i].classList.remove('active');
        slideExtras[i].classList.remove('inactive');
        slideTitles[i].classList.remove('active');
        slideTitles[i].classList.remove('inactive');
        slideInfoText[i].classList.remove('active');
        slideInfoText[i].classList.remove('inactive');
        slideHyperlinks[i].classList.remove('active');
        slideHyperlinks[i].classList.remove('inactive');
        outerCircleSVG[i].style.stroke = 'var(--color-svg-inactive)';
        innerCircleSVG[i].style.fill = 'var(--color-svg-inactive)';
        imageSlides[i].classList.remove('active_slide');
        mobileSliderCards[i].classList.remove('active_card');
        navDots[i].style.backgroundColor = 'var(--color-font-disabled)';
    }
}

function inc() {
    if (cur < n - 1) {
        cur++;
        change();
    }
}

function dec() {
    if (cur > 0) {
        cur--;
        change();
    }
}

function setIndex(idx){
    cur=idx;
    change();
}

change();

function throttle(callback, delay) {
    let lastCall = 0;
    return function() {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        callback.apply(null, arguments);
    };
}
  
function handleScroll(event) {
    event.preventDefault();
    if (event.deltaY > 0) {
        inc();
    } 
    else {
        dec();
    }
}
    
const throttledScroll = throttle(handleScroll, 1000);
window.addEventListener("wheel", throttledScroll, { passive: false });

// Mobile Slider

let slideWidth;

function findWdith(){
    slideWidth = mobileSlider.getBoundingClientRect().width;
}
window.addEventListener('load', findWdith);
window.addEventListener('resize', findWdith);

function findIndex(event){
    event.preventDefault();
    let scrolledLength = mobileSlider.scrollLeft;
    let currIndex = Math.floor((scrolledLength + slideWidth/2) / slideWidth);
    setIndex(currIndex);
}

const throttledScrollMobile = throttle(findIndex, 1000);
mobileSlider.addEventListener('scrollend', throttledScrollMobile);