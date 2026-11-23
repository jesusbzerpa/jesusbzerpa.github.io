// Boton ver más
$(".oculto").hide();
$(".btnVerMas").click(function(){
   var self = $(this); 
  self.next().toggle("slow");
/////  
  if(self.val()=="Leer más [+]; Leer menos [-]"){
    self.val("Ver menos");
  } else {
    $(self).val ("Leer más [+]; Leer menos [-]");
  }
});

// Add your javascript here
// Don't forget to add it into respective layouts where this js file is needed

$(document).ready(function() {
  AOS.init( {
    // uncomment below for on-scroll animations to played only once
    // once: true  
  }); // initialize animate on scroll library

  // Paginated 2x2 Portfolio Controller (strictly 4 cards per page)
  (function initPortfolioPagination() {
    var grid = document.getElementById('jzPortfolioGrid');
    if (!grid) return;
    var cards = Array.prototype.slice.call(grid.querySelectorAll('.jz-port-card'));
    var pageBtns = Array.prototype.slice.call(document.querySelectorAll('.jz-port-page-btn'));
    var actionBtns = Array.prototype.slice.call(document.querySelectorAll('[data-port-action]'));
    var counterEl = document.getElementById('jzPortfolioCounter');
    var perPage = 4;
    var total = cards.length;
    var totalPages = Math.ceil(total / perPage);
    var currentPage = 0;

    function renderPage(pageIdx, scrollIfNeeded) {
      if (pageIdx < 0) pageIdx = totalPages - 1;
      if (pageIdx >= totalPages) pageIdx = 0;
      currentPage = pageIdx;
      var start = currentPage * perPage;
      var end = Math.min(start + perPage, total);

      cards.forEach(function(card, idx) {
        if (idx >= start && idx < end) {
          card.classList.remove('is-hidden-card');
        } else {
          card.classList.add('is-hidden-card');
        }
      });

      pageBtns.forEach(function(btn) {
        var p = parseInt(btn.getAttribute('data-port-page'), 10);
        var isActive = (p === currentPage);
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      if (counterEl) {
        counterEl.textContent = 'Mostrando proyectos ' + (start + 1) + '–' + end + ' de ' + total;
      }

      if (scrollIfNeeded) {
        var sec = document.getElementById('portfolio');
        if (sec) {
          var rect = sec.getBoundingClientRect();
          if (rect.top < -80) {
            window.scrollTo({ top: window.pageYOffset + rect.top - 72, behavior: 'smooth' });
          }
        }
      }
      if (window.AOS && typeof window.AOS.refresh === 'function') {
        window.AOS.refresh();
      }
    }

    pageBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var p = parseInt(btn.getAttribute('data-port-page'), 10);
        if (!isNaN(p)) renderPage(p, false);
      });
    });

    actionBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var act = btn.getAttribute('data-port-action');
        var fromBottom = !!btn.closest('.jz-portfolio-footer');
        if (act === 'prev') renderPage(currentPage - 1, fromBottom);
        if (act === 'next') renderPage(currentPage + 1, fromBottom);
      });
    });

    renderPage(0, false);
  })();
});

// Smooth scroll for links with hashes
$('a.smooth-scroll')
.click(function(event) {
  // On-page links
  if (
    location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    location.hostname == this.hostname
  ) {
    // Figure out element to scroll to
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    // Does a scroll target exist?
    if (target.length) {
      // Only prevent default if animation is actually gonna happen
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      }, 1000, function() {
        // Callback after animation
        // Must change focus!
        var $target = $(target);
        $target.focus();
        if ($target.is(":focus")) { // Checking if the target was focused
          return false;
        } else {
          $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
          $target.focus(); // Set focus again
        };
      });
    }
  }
});
