document.addEventListener("DOMContentLoaded", () => {
   const cards = document.querySelectorAll(".card");
   const sections = document.querySelectorAll(".card-content");

   const sectionMap = {
      events: document.getElementById("events-section"),
      users: document.getElementById("users-section"),
      approvals: document.getElementById("approvals-section"),
      training: document.getElementById("training-section")
   };

   // Initially show only events
   sections.forEach(section => section.style.display = "none");
   sectionMap.events.style.display = "block";

   cards.forEach(card => {
      card.addEventListener("click", () => {
         const type = card.getAttribute("data-type");
         sections.forEach(section => section.style.display = "none");
         sectionMap[type].style.display = "block";
      });
   });
});
