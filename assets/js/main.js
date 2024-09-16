(function ($) {
  "use strict";

  $(document).ready(function () {
    // Back to top button
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        $(".back-to-top").fadeIn("slow");
      } else {
        $(".back-to-top").fadeOut("slow");
      }
    });
    $(".back-to-top").click(function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        10, // Durasi animasi menjadi 600ms
        "easeInOutExpo"
      );
      return false;
    });

    // Stick the header at top on scroll
    $("#header").sticky({
      topSpacing: 0,
      zIndex: "50",
    });

    // Intro background carousel
    $("#intro-carousel").owlCarousel({
      autoplay: true,
      dots: false,
      loop: true,
      animateOut: "fadeOut",
      items: 1,
    });

    // Initiate the wowjs animation library
    new WOW().init();

    // Initiate superfish on nav menu
    $(".nav-menu").superfish({
      animation: {
        opacity: "show",
      },
      speed: 400,
    });

    // Mobile Navigation
    if ($("#nav-menu-container").length) {
      var $mobile_nav = $("#nav-menu-container").clone().prop({
        id: "mobile-nav",
      });
      $mobile_nav.find("> ul").attr({
        class: "",
        id: "",
      });
      $("body").append($mobile_nav);
      $("body").prepend(
        '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
      );
      $("body").append('<div id="mobile-body-overly"></div>');
      $("#mobile-nav")
        .find(".menu-has-children")
        .prepend('<i class="fa fa-chevron-down"></i>');

      $(document).on("click", ".menu-has-children i", function (e) {
        $(this).next().toggleClass("menu-item-active");
        $(this).nextAll("ul").eq(0).slideToggle();
        $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });

      $(document).on("click", "#mobile-nav-toggle", function (e) {
        $("body").toggleClass("mobile-nav-active");
        $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
        $("#mobile-body-overly").toggle();
      });

      $(document).click(function (e) {
        var container = $("#mobile-nav, #mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($("body").hasClass("mobile-nav-active")) {
            $("body").removeClass("mobile-nav-active");
            $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
            $("#mobile-body-overly").fadeOut();
          }
        }
      });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Portfolio - uses the magnific popup jQuery plugin
    $(".portfolio-popup").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-fade",
      gallery: {
        enabled: true,
      },
      zoom: {
        enabled: true,
        duration: 300,
        easing: "ease-in-out",
        opener: function (openerElement) {
          return openerElement.is("img")
            ? openerElement
            : openerElement.find("img");
        },
      },
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 1,
        },
        768: {
          items: 2,
        },
        900: {
          items: 3,
        },
      },
    });

    // Clients carousel (uses the Owl Carousel library)
    $(".clients-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: {
          items: 2,
        },
        768: {
          items: 4,
        },
        900: {
          items: 6,
        },
      },
    });
  });

  // Apply .scrolled class to the body as the page is scrolled down
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  // Mobile nav toggle
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  // Hide mobile nav on same-page/hash links
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  // Toggle mobile nav dropdowns
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  // Preloader
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  // Scroll top button
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  // Animation on scroll function and init
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  // Initiate glightbox
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  // Frequently Asked Questions Toggle
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  // Init swiper sliders
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  // Correct scrolling position upon page load for URLs containing hash links
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  // Navmenu Scrollspy
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})(jQuery);
