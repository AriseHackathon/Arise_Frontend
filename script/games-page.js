document.addEventListener('DOMContentLoaded', () => {
   const tabs = document.querySelectorAll('.game');
   const section = document.querySelector('.section');

   const tabContents = {};
   tabs.forEach(tab => {
      const type = tab.dataset.type;
      const content = document.getElementById(`${type}-games`);
      if (content) {
         tabContents[type] = content.innerHTML;
      }
   });

   if (tabContents['ongoing']) {
      section.innerHTML = tabContents['ongoing'];
      tabs.forEach(tab => tab.classList.remove('active'));
      const defaultTab = document.querySelector('.game[data-type="ongoing"]');
      if (defaultTab) defaultTab.classList.add('active');
   }

   tabs.forEach(tab => {
      tab.addEventListener('click', () => {
         const type = tab.dataset.type;

         if (tabContents[type]) {
            section.innerHTML = tabContents[type];
         }

         tabs.forEach(t => t.classList.remove('active'));
         tab.classList.add('active');
      });
   });
});


function checkAuthentication() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    
    if (isLoggedIn !== 'true') {
        alert('Please log in to access the Game Organizer Dashboard');
        window.location.href = './login.html';
        return false;
    }
    
    return true;
}


async function verifyTokenWithServer(token) {
    try {
        const response = await fetch(`${API_BASE}/verify-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
           
            localStorage.removeItem('authToken');
            alert('Your session has expired. Please log in again.');
            window.location.href = './login.html';
        }
    } catch (error) {
        console.error('Error verifying token:', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    if (checkAuthentication()) {
        loadStats();
        loadGames();
    }
});
