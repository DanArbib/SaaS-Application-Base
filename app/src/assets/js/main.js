// In a new file, let's say utils.ts

// Sticky header logic
export function handleStickyHeader() {
  window.onscroll = function () {
      const ud_header = document.querySelector(".ud-header") as HTMLElement;
      const sticky = ud_header.offsetTop;
      const logo = document.querySelectorAll(".header-logo");

      if (window.pageYOffset > sticky) {
          ud_header.classList.add("sticky");
      } else {
          ud_header.classList.remove("sticky");
      }

      if (logo.length) {
          // === logo change
          if (ud_header.classList.contains("sticky")) {
              (document.querySelector(".header-logo") as HTMLImageElement).src =
                  "assets/images/logo/logo.svg";
          } else {
              (document.querySelector(".header-logo") as HTMLImageElement).src =
                  "assets/images/logo/logo-white.svg";
          }
      }

      if (document.documentElement.classList.contains("dark")) {
          if (logo.length) {
              // === logo change
              if (ud_header.classList.contains("sticky")) {
                  (document.querySelector(".header-logo") as HTMLImageElement).src =
                      "assets/images/logo/logo-white.svg";
              }
          }
      }

      // show or hide the back-top-top button
      const backToTop = document.querySelector(".back-to-top") as HTMLElement;
      if (
          document.body.scrollTop > 50 ||
          document.documentElement.scrollTop > 50
      ) {
          backToTop.style.display = "flex";
      } else {
          backToTop.style.display = "none";
      }
  };
}

// Responsive navbar logic
export function handleNavbarToggler() {
  let navbarToggler = document.querySelector("#navbarToggler") as HTMLElement;
  const navbarCollapse = document.querySelector("#navbarCollapse") as HTMLElement;

  navbarToggler.addEventListener("click", () => {
      navbarToggler.classList.toggle("navbarTogglerActive");
      navbarCollapse.classList.toggle("hidden");
  });

  // close navbar-collapse when a link is clicked
  document
      .querySelectorAll("#navbarCollapse ul li:not(.submenu-item) a")
      .forEach((e) =>
          e.addEventListener("click", () => {
              navbarToggler.classList.remove("navbarTogglerActive");
              navbarCollapse.classList.add("hidden");
          })
      );
}

// Sub-menu logic
export function handleSubMenu() {
  const submenuItems = document.querySelectorAll(".submenu-item");
  submenuItems.forEach((el) => {
      el.querySelector("a")?.addEventListener("click", () => {
          el.querySelector(".submenu")?.classList.toggle("hidden");
      });
  });
}

// FAQ accordion logic
export function handleFAQAccordion() {
  const faqs = document.querySelectorAll(".single-faq");
  faqs.forEach((el) => {
      el.querySelector(".faq-btn")?.addEventListener("click", () => {
          el.querySelector(".icon")?.classList.toggle("rotate-180");
          el.querySelector(".faq-content")?.classList.toggle("hidden");
      });
  });
}

// WOW.js initialization
export function initWOW() {
  new WOW().init();
}

// Scroll to top logic
export function scrollToTop() {
  function scrollTo(element: HTMLElement, to = 0, duration = 500) {
      const start = element.scrollTop;
      const change = to - start;
      const increment = 20;
      let currentTime = 0;

      const animateScroll = () => {
          currentTime += increment;

          const val = Math.easeInOutQuad(currentTime, start, change, duration);

          element.scrollTop = val;

          if (currentTime < duration) {
              setTimeout(animateScroll, increment);
          }
      };

      animateScroll();
  }

  Math.easeInOutQuad = function (t: number, b: number, c: number, d: number) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  (document.querySelector(".back-to-top") as HTMLElement).onclick = () => {
      scrollTo(document.documentElement);
  };
}

// Theme switcher logic
export function handleThemeSwitcher() {
  const themeSwitcher = document.getElementById('themeSwitcher') as HTMLElement;

  // Theme Vars
  const userTheme = localStorage.getItem('theme');
  const systemTheme = window.matchMedia('(prefers-color0scheme: dark)').matches;

  // Initial Theme Check
  const themeCheck = () => {
      if (userTheme === 'dark' || (!userTheme && systemTheme)) {
          document.documentElement.classList.add('dark');
          return;
      }
  };

  // Manual Theme Switch
  const themeSwitch = () => {
      if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          return;
      }

      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
  };

  // call theme switch on clicking buttons
  themeSwitcher.addEventListener('click', () => {
      themeSwitch();
  });

  // invoke theme check on initial load
  themeCheck();
}
