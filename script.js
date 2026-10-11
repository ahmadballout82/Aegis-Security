// =========================
// AEGIS SECURITY
// MAIN JAVASCRIPT
// =========================

document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ELEMENTS
  // =========================

  const header = document.getElementById("header");
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const backToTop = document.getElementById("backToTop");
  const quoteForm = document.getElementById("quoteForm");
  const formMessage = document.getElementById("formMessage");
  const currentYear = document.getElementById("currentYear");


  // =========================
  // CURRENT YEAR
  // =========================

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  // =========================
  // MOBILE MENU
  // =========================

  if (menuToggle && navbar) {

    menuToggle.addEventListener("click", () => {

      navbar.classList.toggle("open");
      document.body.classList.toggle("menu-open");

      const icon = menuToggle.querySelector("i");

      if (navbar.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
      } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
      }

    });

  }


  // =========================
  // CLOSE MOBILE MENU
  // =========================

  navLinks.forEach((link) => {

    link.addEventListener("click", () => {

      if (!navbar || !menuToggle) return;

      navbar.classList.remove("open");
      document.body.classList.remove("menu-open");

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }

      menuToggle.setAttribute("aria-label", "Open navigation menu");

    });

  });


  const navQuote = document.querySelector(".nav-quote");

  if (navQuote) {

    navQuote.addEventListener("click", () => {

      if (!navbar || !menuToggle) return;

      navbar.classList.remove("open");
      document.body.classList.remove("menu-open");

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }

    });

  }


  // =========================
  // CLOSE MENU OUTSIDE
  // =========================

  document.addEventListener("click", (event) => {

    if (!navbar || !menuToggle) return;

    const clickedInsideMenu = navbar.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (
      navbar.classList.contains("open") &&
      !clickedInsideMenu &&
      !clickedMenuButton
    ) {

      navbar.classList.remove("open");
      document.body.classList.remove("menu-open");

      const icon = menuToggle.querySelector("i");

      if (icon) {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
      }

    }

  });


  // =========================
  // HEADER ON SCROLL
  // =========================

  const handleHeader = () => {

    if (!header) return;

    if (window.scrollY > 70) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  };


  // =========================
  // BACK TO TOP
  // =========================

  const handleBackToTop = () => {

    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  };


  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  // =========================
  // ACTIVE NAVIGATION LINK
  // =========================

  const sections = document.querySelectorAll("main section[id]");

  const updateActiveNavigation = () => {

    let currentSection = "";

    sections.forEach((section) => {

      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = section.getAttribute("id");
      }

    });


    navLinks.forEach((link) => {

      link.classList.remove("active");

      const href = link.getAttribute("href");

      if (href === `#${currentSection}`) {
        link.classList.add("active");
      }

    });

  };


  // =========================
  // SMOOTH INTERNAL LINKS
  // =========================

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetPosition =
        target.getBoundingClientRect().top +
        window.pageYOffset -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

    });

  });


  // =========================
  // QUOTE FORM
  // =========================

  if (quoteForm && formMessage) {

    quoteForm.addEventListener("submit", (event) => {

      event.preventDefault();


      const nameInput =
        quoteForm.querySelector("#name");

      const emailInput =
        quoteForm.querySelector("#email");

      const phoneInput =
        quoteForm.querySelector("#phone");

      const serviceInput =
        quoteForm.querySelector("#service");

      const messageInput =
        quoteForm.querySelector("#message");


      const name =
        nameInput ? nameInput.value.trim() : "";

      const email =
        emailInput ? emailInput.value.trim() : "";

      const phone =
        phoneInput ? phoneInput.value.trim() : "";

      const service =
        serviceInput ? serviceInput.value.trim() : "";

      const message =
        messageInput ? messageInput.value.trim() : "";


      if (
        !name ||
        !email ||
        !phone ||
        !service ||
        !message
      ) {

        formMessage.textContent =
          "Please complete all required fields.";

        formMessage.style.color = "#e0a84e";

        return;

      }


      const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (!emailPattern.test(email)) {

        formMessage.textContent =
          "Please enter a valid email address.";

        formMessage.style.color = "#e0a84e";

        return;

      }


      formMessage.textContent =
        "Thank you. Your security request has been received.";

      formMessage.style.color = "#6fcf97";


      quoteForm.reset();


      setTimeout(() => {

        formMessage.textContent = "";

      }, 6000);

    });

  }


  // =========================
  // REVEAL ON SCROLL
  // =========================

  const revealElements =
    document.querySelectorAll(
      ".service-card, .why-card, .industry-card, .testimonial-card, .contact-card, .process-step"
    );


  revealElements.forEach((element) => {

    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition =
      "opacity 0.7s ease, transform 0.7s ease";

  });


  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            observer.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12
      }

    );


  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });


  // =========================
  // HERO STATS COUNTER
  // =========================

  const stats =
    document.querySelectorAll(".hero-stat strong");


  const animateCounter = (element) => {

    const originalText =
      element.textContent.trim();


    if (originalText === "24/7") {
      return;
    }


    const numericValue =
      parseInt(originalText.replace(/\D/g, ""), 10);


    if (Number.isNaN(numericValue)) {
      return;
    }


    const suffix =
      originalText.includes("+")
        ? "+"
        : originalText.includes("%")
          ? "%"
          : "";


    let current = 0;

    const duration = 1400;

    const steps = 50;

    const increment =
      numericValue / steps;

    const intervalTime =
      duration / steps;


    const counter =
      setInterval(() => {

        current += increment;


        if (current >= numericValue) {

          element.textContent =
            `${numericValue}${suffix}`;

          clearInterval(counter);

          return;

        }


        element.textContent =
          `${Math.floor(current)}${suffix}`;

      }, intervalTime);

  };


  const statsContainer =
    document.querySelector(".hero-stats");


  if (statsContainer) {

    let countersStarted = false;


    const statsObserver =
      new IntersectionObserver(

        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting &&
              !countersStarted
            ) {

              countersStarted = true;

              stats.forEach((stat) => {
                animateCounter(stat);
              });

            }

          });

        },

        {
          threshold: 0.4
        }

      );


    statsObserver.observe(statsContainer);

  }


  // =========================
  // CARD MOUSE EFFECT
  // =========================

  const interactiveCards =
    document.querySelectorAll(
      ".service-card, .why-card, .testimonial-card"
    );


  interactiveCards.forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const x =
          event.clientX - rect.left;

        const y =
          event.clientY - rect.top;

        card.style.backgroundImage =
          `radial-gradient(
            circle at ${x}px ${y}px,
            rgba(212, 168, 79, 0.08),
            transparent 180px
          )`;

      }
    );


    card.addEventListener(
      "mouseleave",
      () => {

        card.style.backgroundImage = "";

      }
    );

  });


  // =========================
  // ESCAPE KEY CLOSE MENU
  // =========================

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        navbar &&
        navbar.classList.contains("open")
      ) {

        navbar.classList.remove("open");

        document.body.classList.remove(
          "menu-open"
        );


        if (menuToggle) {

          const icon =
            menuToggle.querySelector("i");

          if (icon) {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
          }

        }

      }

    }
  );


  // =========================
  // WINDOW EVENTS
  // =========================

  const handleScroll = () => {

    handleHeader();

    handleBackToTop();

    updateActiveNavigation();

  };


  window.addEventListener(
    "scroll",
    handleScroll,
    {
      passive: true
    }
  );


  handleScroll();

});