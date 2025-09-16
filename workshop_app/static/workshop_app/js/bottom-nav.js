/* Bottom Navigation interactions
   - Handles active state switching with animation
   - Example API: window.bottomNav.setActive('home')
*/
(function () {
  var nav = document.querySelector('.bottom-nav');
  if (!nav) return;

  var items = Array.prototype.slice.call(nav.querySelectorAll('[data-nav]'));

  function setActive(key) {
    items.forEach(function (el) {
      var isActive = el.getAttribute('data-nav') === key;
      el.classList.toggle('is-active', isActive);
      el.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
  }

  // Click handling
  nav.addEventListener('click', function (e) {
    var target = e.target.closest('[data-nav]');
    if (!target) return;
    var key = target.getAttribute('data-nav');
    setActive(key);
  });

  // Export minimal API
  window.bottomNav = window.bottomNav || { setActive: setActive };
})();


