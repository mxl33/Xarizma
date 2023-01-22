"use strict";

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };

  webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

;
testWebP(function (support) {
  if (support == true) {
    document.querySelector('body').classList.add('webp');
  } else {
    document.querySelector('body').classList.add('no-webp');
  }
}); // ---------- webp for background ----------

; // ---------- include ----------
// ---------- burger ----------

var header = document.querySelector('.header');
var iconMenu = document.querySelector('.menu-header__icon');

if (iconMenu) {
  var clickButton = function clickButton(e) {
    if (iconMenu.classList.contains('menu-header__icon_active')) {
      document.body.classList.remove('_lock');
      iconMenu.classList.remove('menu-header__icon_active');
      header.classList.remove('header_active');
    } else {
      document.body.classList.add('_lock');
      iconMenu.classList.add('menu-header__icon_active');
      header.classList.add('header_active');
    }
  };

  iconMenu.addEventListener("click", clickButton);
} // ---------- burger ----------
// ---------- smart-header ----------


var lastScroll = 0;
var defaultOffset = 200;

var scrollPosition = function scrollPosition() {
  return window.pageYOffset || document.documentElement.scrollTop;
};

var containHide = function containHide() {
  return header.classList.contains('header_hide');
};

window.addEventListener('scroll', function () {
  if (scrollPosition() > lastScroll && !containHide() && scrollPosition() > defaultOffset) {
    //scroll down
    header.classList.add('header_hide');
  } else if (scrollPosition() < lastScroll && containHide()) {
    //scroll up
    header.classList.remove('header_hide');
    header.classList.add('header_short');
  } else if (window.scrollY == 0) {
    header.classList.remove('header_short');
  }

  lastScroll = scrollPosition();
}); // ---------- smart-header ----------
// ---------- goto ----------

var gotoButtons = document.querySelectorAll('.goto-button[data-goto]');

if (gotoButtons.length > 0) {
  var ongotoButtonClick = function ongotoButtonClick(e) {
    var gotoButton = e.target;

    if (gotoButton.dataset["goto"] && document.querySelector(gotoButton.dataset["goto"])) {
      var gotoBlock = document.querySelector(gotoButton.dataset["goto"]);
      var gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY; // - document.querySelector('header').offsetHeight;
      //? smart header more priority 
      // header.classList.remove('header_short');
      // header.classList.add('header_hide');

      if (header.classList.contains('header_active')) {
        document.body.classList.remove('_lock');
        header.classList.remove('header_active');
        iconMenu.classList.remove('menu-header__icon_active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  };

  gotoButtons.forEach(function (gotoButton) {
    gotoButton.addEventListener("click", ongotoButtonClick);
  });
} // ---------- goto ----------
// ---------- slider-main ----------


var sliderMain = new Swiper('.slider-main', {
  slidesPerView: 1,
  grabCursor: true,
  preloadImages: false,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true
  },
  navigation: {
    nextEl: '.slider-navigation-main__slider-button_next',
    prevEl: '.slider-navigation-main__slider-button_prev'
  },
  pagination: {
    el: '.slider-navigation-main__pagination',
    type: 'fraction',
    renderFraction: function renderFraction(currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>';
    }
  },
  autoplay: {
    delay: 3000
  },
  thumbs: {
    swiper: {
      el: '.slider-mini',
      slidesPerView: 5,
      grabCursor: true,
      preloadImages: false,
      watchSlideProgress: true,
      watchSlideVisibility: true,
      lazy: {
        loadOnTransitionStart: true,
        loadPrevNext: true
      }
    }
  }
});
var sliderMainBlock = document.querySelector('.slider-main');
sliderMainBlock.addEventListener("mouseenter", function (e) {
  sliderMain.autoplay.stop();
});
sliderMainBlock.addEventListener("mouseleave", function (e) {
  sliderMain.params.autoplay.delay = 3000;
  sliderMain.autoplay.start();
});
var sliderMiniBlock = document.querySelector('.slider-mini');
sliderMiniBlock.addEventListener("mouseenter", function (e) {
  sliderMain.autoplay.stop();
});
sliderMiniBlock.addEventListener("mouseleave", function (e) {
  sliderMain.params.autoplay.delay = 3000;
  sliderMain.autoplay.start();
}); // ---------- slider-main ----------
// ---------- slider-booking-guide ----------

var sliderBookingGuide = new Swiper('.slider-booking-guide', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  watchOverflow: true,
  preloadImages: false,
  grabCursor: true,
  centeredSlides: true,
  initialSlide: 2,
  lazy: {
    loadOnTransitionStart: true,
    loadPrevNext: true
  },
  navigation: {
    nextEl: '.slider-navigation-booking-guide__slider-button_next',
    prevEl: '.slider-navigation-booking-guide__slider-button_prev'
  },
  pagination: {
    el: '.slider-navigation-booking-guide__pagination',
    type: 'fraction',
    renderFraction: function renderFraction(currentClass, totalClass) {
      return '<span class="' + currentClass + '"></span>' + ' из ' + '<span class="' + totalClass + '"></span>';
    }
  },
  breakpoints: {
    1660: {
      slidesPerView: 5.5
    },
    1400: {
      slidesPerView: 5
    },
    1120: {
      slidesPerView: 4
    },
    900: {
      slidesPerView: 3
    },
    665: {
      slidesPerView: 2.5
    },
    530: {
      slidesPerView: 2
    },
    350: {
      slidesPerView: 1.35,
      centeredSlides: false,
      initialSlide: 0
    }
  }
}); // ---------- slider-booking-guide ----------
// ---------- tab ----------

var tabsBtn = document.querySelectorAll(".hall-tab");
var tabsItems = document.querySelectorAll(".features-list");
tabsBtn.forEach(onTabClick);

function onTabClick(item) {
  item.addEventListener("click", function () {
    var currentBtn = item;
    var tabId = currentBtn.getAttribute("data-tab");
    var currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains('hall-tab_active')) {
      tabsBtn.forEach(function (item) {
        item.classList.remove('hall-tab_active');
      });
      tabsItems.forEach(function (item) {
        item.classList.remove('features-list_active');
      });
      currentBtn.classList.add('hall-tab_active');
      currentTab.classList.add('features-list_active');
    }
  });
}

document.querySelector('.hall-tab').click(); // ---------- tab ----------
// ---------- accordion ----------

document.querySelectorAll('.spoiler-qstn__trigger').forEach(function (item) {
  return item.addEventListener('click', function () {
    var parent = item.parentNode;

    if (parent.classList.contains('spoiler-qstn_active')) {
      parent.classList.remove('spoiler-qstn_active');
    } else {
      document.querySelectorAll('.spoiler-qstn').forEach(function (child) {
        return child.classList.remove('spoiler-qstn_active');
      });
      parent.classList.add('spoiler-qstn_active');
    }
  });
}); // ---------- accordion ----------
// ---------- animations ----------
// ---------- intro ----------

var tlH1 = gsap.timeline();
tlH1.from('.info__heading', {
  duration: .5,
  x: -200,
  opacity: 0
}).from('.info__heading-after', {
  duration: 1,
  x: -200,
  opacity: 0,
  ease: "elastic.out(.9, .4)"
}); // ---------- intro ----------
// ---------- sub-heading ----------

var subHeadingS = document.querySelectorAll(".sub-heading");
subHeadingS.forEach(function (element) {
  var tlSub = new TimelineMax();
  tlSub.from(element, .5, {
    x: -200,
    opacity: 0
  });
  var trigger = ScrollTrigger.create({
    trigger: element,
    animation: tlSub
  });
}); // ---------- sub-heading ----------
// ---------- list item ----------
// let listItemS = document.querySelectorAll(".article-block__item");
// listItemS.forEach(function (element) {
//     let tlItem = new TimelineMax();
//     tlItem.from(element, { duration: 1, x: -200, opacity: 0, ease: "elastic.out(1.5, 1)" },);
//     let trigger = ScrollTrigger.create({
//         trigger: element,
//         animation: tlItem,
//     });
// });
// ---------- list item ----------
// ---------- animations ----------