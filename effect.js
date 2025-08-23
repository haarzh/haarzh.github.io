// Custom cursor
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";

  setTimeout(() => {
    cursorFollower.style.left = e.clientX + "px";
    cursorFollower.style.top = e.clientY + "px";
  }, 50);
});

// ...rest of your JS...
      

      // Loading sequence
      window.addEventListener("load", () => {
        setTimeout(() => {
          document.getElementById("breathLoading").classList.add("fade-out");
        }, 4000);
      });

      // Pigeon guide (not related to cursor)
      const pigeon = document.getElementById("pigeonGuide");
      let currentSection = 0;
      const sections = [
        "genesis",
        "realm1",
        "realm2",
        "realm3",
        "sanctuary",
        "cosmos",
      ];

      function updatePigeonPosition() {
        const scrollProgress =
          window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const sectionIndex = Math.floor(scrollProgress * (sections.length - 1));

        if (sectionIndex !== currentSection) {
          currentSection = sectionIndex;

          // Calculate pigeon position based on scroll
          const sectionElement = document.getElementById(
            sections[currentSection]
          );
          if (sectionElement) {
            const rect = sectionElement.getBoundingClientRect();
            const pigeonX = 100 + scrollProgress * (window.innerWidth - 200);
            const pigeonY = Math.max(
              100,
              Math.min(window.innerHeight - 100, 200 + scrollProgress * 300)
            );

            pigeon.style.left = pigeonX + "px";
            pigeon.style.top = pigeonY + "px";
            pigeon.style.transform = `rotate(${scrollProgress * 360}deg)`;
          }
        }
      }

      // Scroll-triggered animations
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("manifest");
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -100px 0px",
        }
      );

      // Observe reveal elements
      document.querySelectorAll(".reveal-element").forEach((el) => {
        observer.observe(el);
      });

      // Scroll listeners
      let ticking = false;

      function onScroll() {
        if (!ticking) {
          requestAnimationFrame(() => {
            updatePigeonPosition();
            ticking = false;
          });
          ticking = true;
        }
      }

      window.addEventListener("scroll", onScroll);

      // Smooth scrolling
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Interactive elements
      document.querySelectorAll(".portal").forEach((portal) => {
        portal.addEventListener("mouseenter", () => {
          cursor.style.transform = "scale(2)";
          pigeon.style.transform += " scale(1.5)";
        });

        portal.addEventListener("mouseleave", () => {
          cursor.style.transform = "scale(1)";
          pigeon.style.transform = pigeon.style.transform.replace(
            " scale(1.5)",
            ""
          );
        });
      });

      // Initialize
      setTimeout(() => {
        updatePigeonPosition();
      }, 5000);
