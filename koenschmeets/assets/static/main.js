hljs.initHighlightingOnLoad();
var bodyEl = document.body;
var menuButtonEl = document.getElementById('menu-button');
var isMenuOpen = false;
menuButtonEl.addEventListener('click', function () {
  if (!isMenuOpen) {
    bodyEl.classList.add('menu-opened');
    menuButtonEl.innerHTML = '<span class="entypo-up-open-big"></span>';
    isMenuOpen = true;
  } else {
    bodyEl.classList.remove('menu-opened');
    menuButtonEl.innerHTML = '<span class="entypo-menu"></span>';
    isMenuOpen = false;
  }
});
window.addEventListener('scroll', function (e) {
  var offset = document.getElementsByTagName('body')[0].scrollTop;
  if (offset > 580) {
    bodyEl.classList.add('scrolled-past-header');
  } else {
    bodyEl.classList.remove('scrolled-past-header');
  }
});
