const showModelBtn=document.querySelectorAll('.btn--show-model');
const overlay=document.querySelector('.overlay');
const modal=document.querySelector('.modal');
const closeWindowBtn=document.querySelector('.btn--close-modal')

// showModelBtn.addEventListener('click',openWindow)
closeWindowBtn.addEventListener('click', closeWindow)

function openWindow(e){
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');

}
function closeWindow(){
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
showModelBtn.forEach(btn=> btn.addEventListener('click',openWindow))

// };
// end of modal class

// button scroll
let section1=document.querySelector('#section--1');
let btnScroll=document.querySelector('.btn__scroll--to');

btnScroll.addEventListener('click',function(e) {
    section1.scrollIntoView({behavior:'smooth'});

});
// scrollSections
let scrollSections=document.querySelector('.nav-links');
scrollSections.addEventListener('click',function(e){
    e.preventDefault();
    if(e.target.classList.contains('nav-link')){
        const id=e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior:'smooth'});

    }
});
// sticky navigation using intersection navigation API
const header=document.querySelector('.header');
const nav=document.querySelector('.nav');

const navHeight=nav.getBoundingClientRect().height;
const stickyNav=function(entries){
    const [entry]=entries;
    if(!entry.isIntersecting){
        nav.classList.add("sticky");
    }
    else{
        nav.classList.remove("sticky");

    }
};
// IntersectionObserver bya5od function w object
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  });

  headerObserver.observe(header);

//   reveal section y3ni kol ma scroll section byzhr m3aya step by step
const allSections=document.querySelectorAll('.section');

const revealSections=function(entries,observe){

    const [entry]=entries;
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden')
    observe.unobserve(entry.target);

}

const sectionObserve=new IntersectionObserver(revealSections,{
    root:null,
    threshold:0.15,
})
allSections.forEach(function(section){
    sectionObserve.observe(section);
    section.classList.add("section--hidden");
})
// slider
const slides=document.querySelectorAll('.slide');
const btnLeft=document.querySelector('.slide__btn--left');
const btnRight=document.querySelector('.slide__btn--right');
const dotContainer=document.querySelector('.dots');

let slider=function(){
let currSlide=0;
let maxSlide=slides.length;
   const createDots = function(){
    slides.forEach( function(_,i) {
        dotContainer.insertAdjacentHTML(
            'beforeend',
            `<button class="dots__dot" data-slide="${i}"></button>`
        );
    });
   };
   const activateDots=function(slide){
    document.querySelectorAll('.dots__dot').forEach(dot=>dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
};

const goToSlide = function(slide){
    slides.forEach((s,i)=>(s.style.transform=`translateX(${100 * (i-slide)}%)`));
}
// next slide
const nextSlide=function(){
    if(currSlide ===maxSlide-1){
        currSlide=0;

    }
    else{
        currSlide++;
    }
    goToSlide(currSlide);
    activateDots(currSlide);
};

// prev slide
const  prevSlide=function(){
    if(currSlide === 0){
        currSlide=maxSlide -1 ;

    }
    else{
        currSlide--;

    }
    goToSlide(currSlide);
    activateDots(currSlide);
}


const init=function(){
    goToSlide(0);
    createDots();
    activateDots(0);
};
init();
// event handlers
btnRight.addEventListener("click",nextSlide)
btnLeft.addEventListener("click",prevSlide);

dotContainer.addEventListener("click",function(e){

    if(e.target.classList.contains('dots__dot')){
        const {slide}=e.target.dataset;
        goToSlide(slide);
        activateDots(slide);
    }
})
};
slider();

// tabbed component
let tabsContainer=document.querySelector('.operations__tap--container');
let tabs=document.querySelectorAll('.operation__tap ');
let tabsContent=document.querySelectorAll('.operation__content')

tabsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operation__tap');

    // Guard clause
    if (!clicked) return;

    // Remove active classes
    tabs.forEach(t => t.classList.remove('operation__tap--active'));
    tabsContent.forEach(c => c.classList.remove('operation__content--active'));

    // Activate tab
    clicked.classList.add('operation__tap--active');

    // Activate content area
    document
      .querySelector(`.operation__content--${clicked.dataset.tab}`)
      .classList.add('operation__content--active');
  });


