export default function () {
  const primaryNav = document.querySelector(".primary-navigation");
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".primary-navigation a");
  const header = document.querySelector("header");

  function toggleMenu() {
    const visibility = primaryNav.getAttribute("data-visible");

    if (visibility === "false") {
      primaryNav.setAttribute("data-visible", true);
      menuToggle.setAttribute("aria-expanded", true);
      return;
    }
    primaryNav.setAttribute("data-visible", false);
    menuToggle.setAttribute("aria-expanded", false);
  }

  function closeMenu() {
    primaryNav.setAttribute("data-visible", false);
    menuToggle.setAttribute("aria-expanded", false);
    menuToggle.checked = false;
  }

  menuToggle.addEventListener("click", toggleMenu);
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  const sections = [
    "intro",
    "what-i-do",
    "my-tools",
    "portfolio",
    "about",
    "contact",
  ];

  function toggleHeaderVisibility() {
    if (window.scrollY > 20) {
      header.classList.add("show");
    } else {
      header.classList.remove("show");
    }
  }

  function handleNavLinks() {
    sections.forEach((section) => {
      let diffrence = 5;
      if (section === "intro") diffrence = 0;

      if (
        section === "contact" &&
        window.scrollY +
          50 +
          window.innerHeight -
          document.querySelector("main").offsetHeight >=
          0
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`.primary-navigation a[href*=${section}]`)
          .classList.add("active");
        return;
      }

      if (
        window.scrollY >=
        document.getElementById(section).offsetTop - diffrence
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        document
          .querySelector(`.primary-navigation a[href*=${section}]`)
          .classList.add("active");
      }
    });
  }

  window.onscroll = () => {
    toggleHeaderVisibility();
    handleNavLinks();
  };
}
