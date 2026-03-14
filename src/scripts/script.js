document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("open");
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("open");
        navLinks.classList.remove("open");
      });
    });
  }

  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach((item) => {
          item.classList.remove("active");
          if (item.getAttribute("href") === "#" + id) {
            item.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  const skillBars = document.querySelectorAll(".skill-bar-fill");
  let skillsAnimated = false;

  function animateSkillBars() {
    if (skillsAnimated) return;
    const skillsSection = document.getElementById("habilidades");
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      skillsAnimated = true;
      skillBars.forEach((bar) => {
        const width = bar.getAttribute("data-width");
        bar.style.width = width + "%";
      });
    }
  }

  window.addEventListener("scroll", animateSkillBars);
  animateSkillBars();

  const fadeElements = document.querySelectorAll(".fade-up");

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((el) => fadeObserver.observe(el));

  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector(".btn-submit");
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;

      const serviceID = "service_qr6cvaf";
      const templateID = "template_l46zkiv";

      emailjs.sendForm(serviceID, templateID, contactForm)
        .then(() => {
          contactForm.reset();
          if (formSuccess) {
            formSuccess.classList.add("show");
            formSuccess.textContent = "¡Mensaje enviado con éxito!";
            formSuccess.style.color = "var(--neon-teal)";
            setTimeout(() => formSuccess.classList.remove("show"), 4000);
          }
        }, (err) => {
          alert("Ocurrió un error al enviar el correo. Por favor intenta de nuevo.");
          console.error("Error de EmailJS:", err);
        })
        .finally(() => {
          submitBtn.textContent = originalBtnText;
          submitBtn.disabled = false;
        });
    });
  }

  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = "0 4px 20px rgba(180, 0, 255, 0.2)";
    } else {
      header.style.boxShadow = "none";
    }
  });
});