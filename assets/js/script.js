/***********************
 * script.js
 ***********************/

$(document).ready(function () {
    // Toggle navbar on mobile
    $("#menu").click(function () {
      $(this).toggleClass("fa-times");
      $(".navbar").toggleClass("nav-toggle");
    });
  
    $(window).on("scroll load", function () {
      $("#menu").removeClass("fa-times");
      $(".navbar").removeClass("nav-toggle");
  
      if (window.scrollY > 60) {
        document.querySelector("#scroll-top").classList.add("active");
      } else {
        document.querySelector("#scroll-top").classList.remove("active");
      }
  
      // scroll spy
      $("section").each(function () {
        let height = $(this).height();
        let offset = $(this).offset().top - 200;
        let top = $(window).scrollTop();
        let id = $(this).attr("id");
  
        if (top > offset && top < offset + height) {
          $(".navbar ul li a").removeClass("active");
          $(".navbar").find(`[href="#${id}"]`).addClass("active");
        }
      });
    });
  
    // smooth scrolling
    $('a[href*="#"]').on("click", function (e) {
      e.preventDefault();
      $("html, body").animate(
        {
          scrollTop: $($(this).attr("href")).offset().top,
        },
        500,
        "linear"
      );
    });
  
    // emailjs to mail contact form data
    $("#contact-form").submit(function (event) {
      // Initialize with your user ID
      emailjs.init("user_TTDmetQLYgWCLzHTDgqxm"); 
      emailjs.sendForm("contact_service", "template_contact", "#contact-form").then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          document.getElementById("contact-form").reset();
          alert("Form Submitted Successfully");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Form Submission Failed! Try Again");
        }
      );
      event.preventDefault();
    });
  
    // Change document title & favicon on visibility change
    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "visible") {
        document.title = "Portfolio | Manisha Vaswani";
        $("#favicon").attr("href", "assets/images/favicon.png");
      } else {
        document.title = "Return to Portfolio";
        $("#favicon").attr("href", "assets/images/favicon.png");
      }
    });
  
    // typed js effect starts
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }
  
    const stringsArray = [
    "I am a researcher, professor, and entrepreneur driven by a passion for innovation and impact.",
    "I teach courses in entrepreneurship, strategy, international business, and family business.",
    "I explore how entrepreneurial storytelling and mindset shape business outcomes across cultures.",
    "I research the digital transformation of businesses and how immigrant entrepreneurs navigate systems.",
    "I create learning tools and simulations that connect academic theory to real-world decision-making.",
    "I aim to bridge scholarship and practice to inspire bold, globally minded entrepreneurs."
    ];
  
    // Shuffle the strings array
    shuffleArray(stringsArray);
  
    // Initialize Typed with the shuffled array
    var typed = new Typed(".typing-text", {
      strings: stringsArray,
      loop: true,
      typeSpeed: 20,
      backSpeed: 25,
      backDelay: 800,
    });
    // typed js effect ends
  
    // Fetch and display skills/projects
    async function fetchData(type = "skills") {
      let response;
      if (type === "skills") {
        response = await fetch("skills.json");
      } else {
        response = await fetch("./projects/projects.json");
      }
      const data = await response.json();
      return data;
    }
  
    function showSkills(skills) {
      let skillsContainer = document.getElementById("skillsContainer");
      let skillHTML = "";
      skills.forEach((skill) => {
        skillHTML += `
          <div class="bar">
            <div class="info">
              <img src="${skill.icon}" alt="skill" />
              <span>${skill.name}</span>
            </div>
          </div>`;
      });
      skillsContainer.innerHTML = skillHTML;
    }
    let allProjects = [];

// 2) Fetch & display projects on page load
fetchData("projects").then((data) => {
  allProjects = data;
  // Default to category 1
  showProjects(allProjects, "cat1");
});

// 3) Listen for clicks on any category button
document.getElementById("project-filters").addEventListener("click", function (e) {
  // Only handle .filter-btn clicks
  if (!e.target.classList.contains("filter-btn")) return;

  // Remove .active from all filter buttons
  document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));

  // Mark the clicked button as active
  e.target.classList.add("active");

  // Get the filter value from the button's data-filter attribute
  const filterValue = e.target.getAttribute("data-filter");
  showProjects(allProjects, filterValue);
});

// 4) Update showProjects to filter by customCategory
function showProjects(projects, filter) {
  let projectsContainer = document.querySelector("#work .box-container");
  let projectHTML = "";

  // Filter only projects that match the chosen customCategory
  const filteredProjects = projects.filter((p) => p.customCategory === filter);

  // Build the HTML for the filtered set
  filteredProjects.forEach((project) => {
    projectHTML += `
      <div class="box tilt">
        <img draggable="false" src="./assets/images/${project.image}" alt="project" />
        <div class="content">
          <div class="tag">
            <h3>${project.name}</h3>
          </div>
          <div class="desc">
            <p>${project.desc}</p>
            <div class="btns" style="margin-left:140px">
              <a href="${project.links.code}" class="btn" target="_blank">View</a>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  projectsContainer.innerHTML = projectHTML;

  // Re-initialize tilt and scroll animations after re-rendering
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
  });

  const srtop = ScrollReveal({
    origin: "top",
    distance: "80px",
    duration: 1000,
    reset: true,
  });
  srtop.reveal(".work .box", { interval: 200 });
}

document.getElementById("project-filters").addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;
  
    // Remove 'active' from all
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    
    // Add 'active' to the clicked one
    e.target.classList.add("active");
  
    // Get the filter category and display projects
    const filterValue = e.target.getAttribute("data-filter");
    showProjects(allProjects, filterValue);
  });
    // function showProjects(projects) {
    //   let projectsContainer = document.querySelector("#work .box-container");
    //   let projectHTML = "";
    //   projects
    //     .slice(0, 10)
    //     .filter((project) => project.category != "android")
    //     .forEach((project) => {
    //       projectHTML += `
    //         <div class="box tilt">
    //           <img draggable="false" src="./assets/images/projects/${project.image}" alt="project" />
    //           <div class="content">
    //             <div class="tag">
    //               <h3>${project.name}</h3>
    //             </div>
    //             <div class="desc">
    //               <p>${project.desc}</p>
    //               <div class="btns" style="margin-left:140px">
    //                 <a href="${project.links.code}" class="btn" target="_blank">View</a>
    //               </div>
    //             </div>
    //           </div>
    //         </div>`;
    //     });
    //   projectsContainer.innerHTML = projectHTML;
  
    //   // tilt js effect starts
    //   VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 15,
    //   });
    //   // tilt js effect ends
  
    //   /* ===== SCROLL REVEAL ANIMATION ===== */
    //   const srtop = ScrollReveal({
    //     origin: "top",
    //     distance: "80px",
    //     duration: 1000,
    //     reset: true,
    //   });
  
    //   // SCROLL PROJECTS
    //   srtop.reveal(".work .box", { interval: 200 });
    // }
  
    // Fetch and render Skills
    fetchData().then((data) => {
      showSkills(data);
    });
  
  
    // Vanilla tilt for any .tilt elements present initially
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
      max: 15,
    });
  
    
    // Disable developer mode
    document.onkeydown = function (e) {
      if (e.keyCode == 123) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
      }
      if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        return false;
      }
    };
  
    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
      origin: "top",
      distance: "80px",
      duration: 1000,
      reset: true,
    });
  
    // SCROLL HOME
    srtop.reveal(".home .content h2", { delay: 200 });
    srtop.reveal(".home .content p", { delay: 200 });
    srtop.reveal(".home .content .btn", { delay: 200 });
    srtop.reveal(".home .image", { delay: 400 });
    srtop.reveal(".home .linkedin", { interval: 600 });
    srtop.reveal(".home .github", { interval: 800 });
    srtop.reveal(".home .telegram", { interval: 600 });
    srtop.reveal(".home .instagram", { interval: 600 });
    srtop.reveal(".home .dev", { interval: 600 });
  
    // SCROLL ABOUT
    srtop.reveal(".about .content h3", { delay: 200 });
    srtop.reveal(".about .content .tag", { delay: 200 });
    srtop.reveal(".about .content p", { delay: 200 });
    srtop.reveal(".about .content .box-container", { delay: 200 });
    srtop.reveal(".about .content .resumebtn", { delay: 200 });
  
    // SCROLL SKILLS
    srtop.reveal(".skills .container", { interval: 200 });
    srtop.reveal(".skills .container .bar", { delay: 400 });
  
    // SCROLL EDUCATION
    srtop.reveal(".education .box", { interval: 200 });
  
    // SCROLL PROJECTS
    srtop.reveal(".work .box", { interval: 200 });
  
    // SCROLL EXPERIENCE
    srtop.reveal(".experience .timeline", { delay: 200 });
    srtop.reveal(".experience .timeline .container", { interval: 200 });
  
    // SCROLL CONTACT
    srtop.reveal(".contact .container", { delay: 400 });
    srtop.reveal(".contact .container .form-group", { delay: 400 });
  
    // ==============================
    //  VIEW MORE/LESS Logic
    // ==============================
  
    // 1) EXPERIENCE Section Toggle
    // const experienceContainers = $("#experience .timeline .container");
    // const showItemCount = 4; // Number of items to show initially
    
    // if (experienceContainers.length > showItemCount) {
    //   // Hide everything after the first 4
    //   experienceContainers.slice(showItemCount).hide();
    //   // Show the "View More" button
    //   $("#experience-toggle-btn").show();
  
    //   $("#experience-toggle-btn").on("click", function () {
    //     const hiddenItems = experienceContainers.slice(showItemCount);
    //     const btnText = $(this).find("span");
    //     const btnIcon = $(this).find("i");
    //     const timeline = $("#experience .timeline");
        
    //     if (hiddenItems.first().is(":visible")) {
    //       // If items are visible, hide them
    //       timeline.addClass("transitioning");
          
    //       hiddenItems.fadeOut(300, function() {
    //         btnText.text("View More");
    //         btnIcon.removeClass("fa-arrow-left").addClass("fa-arrow-right");
            
    //         // Scroll back to the experience section
    //         $('html, body').animate({
    //           scrollTop: $("#experience").offset().top
    //         }, 300);
            
    //         timeline.removeClass("transitioning");
    //       });
    //     } else {
    //       // If items are hidden, show them
    //       timeline.addClass("transitioning");
          
    //       hiddenItems.fadeIn(300, function() {
    //         btnText.text("View Less");
    //         btnIcon.removeClass("fa-arrow-right").addClass("fa-arrow-left");
    //         timeline.removeClass("transitioning");
    //       });
    //     }
        
    //     // Re-initialize scroll reveal for the newly visible items
    //     setTimeout(() => {
    //       if (typeof srtop !== 'undefined') {
    //         srtop.reveal(".experience .timeline .container", { interval: 200 });
    //       }
    //     }, 400);
    //   });
    // }
  
    // // 2) EDUCATION Section Toggle
    // const educationBoxes = $("#education .box-container .box");
    // if (educationBoxes.length > 4) {
    //   // Hide everything after the first 4
    //   educationBoxes.slice(4).hide();
    //   // Show the "View More" button
    //   $("#education-toggle-btn").show();
  
    //   $("#education-toggle-btn").on("click", function () {
    //     const hiddenBoxes = educationBoxes.slice(4);
    //     if (hiddenBoxes.is(":visible")) {
    //       hiddenBoxes.slideUp(400, () => {
    //         $(this).find("span").text("View More");
    //         ScrollReveal().sync();
    //       });
    //     } else {
    //       hiddenBoxes.slideDown(400, () => {
    //         $(this).find("span").text("View Less");
    //         ScrollReveal().sync();
    //       });
    //     }
    //   });
    // }
  });
  