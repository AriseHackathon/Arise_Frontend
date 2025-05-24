document.addEventListener('DOMContentLoaded', () => {
   const tabs = document.querySelectorAll('.game');
   const section = document.querySelector('.section');

   // Store original content for each tab
   const tabContents = {};
   tabs.forEach(tab => {
      const type = tab.dataset.type;
      const content = document.getElementById(`${type}-games`);
      if (content) {
         tabContents[type] = content.innerHTML;
      }
   });

   // Show default content (ongoing-games) and mark default active
   if (tabContents['ongoing']) {
      section.innerHTML = tabContents['ongoing'];
      tabs.forEach(tab => tab.classList.remove('active'));
      const defaultTab = document.querySelector('.game[data-type="ongoing"]');
      if (defaultTab) defaultTab.classList.add('active');
   }

   tabs.forEach(tab => {
      tab.addEventListener('click', () => {
         const type = tab.dataset.type;

         // Show the selected content
         if (tabContents[type]) {
            section.innerHTML = tabContents[type];
         }

         // Update active class
         tabs.forEach(t => t.classList.remove('active'));
         tab.classList.add('active');
      });
   });
});