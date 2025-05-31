const gamesData = {
  ongoing: [
     { title: 'VOLLEYBALL', location: 'Bengaluru', date: '12-10-2025', fee: '450', status: 'ongoing', icon: 'volleyball-ball', description: 'Beach volleyball tournament with exciting prizes! All skill levels welcome.' },
     { title: 'BASKETBALL', location: 'Mumbai', date: '15-10-2025', fee: '300', status: 'ongoing', icon: 'basketball-ball', description: '3v3 streetball competition. Fast-paced action guaranteed!' },
     { title: 'FOOTBALL', location: 'Delhi', date: '18-10-2025', fee: '200', status: 'ongoing', icon: 'futbol', description: '11v11 football match. Professional referees and equipment provided.' },
     { title: 'TENNIS', location: 'Bengaluru', date: '20-10-2025', fee: '500', status: 'ongoing', icon: 'table-tennis', description: 'Singles and doubles tournaments. Premium courts and facilities.' },
     { title: 'CRICKET', location: 'Mumbai', date: '22-10-2025', fee: '350', status: 'ongoing', icon: 'baseball-ball', description: 'T20 format cricket match. Professional ground and equipment.' },
     { title: 'BADMINTON', location: 'Delhi', date: '25-10-2025', fee: '250', status: 'ongoing', icon: 'table-tennis', description: 'Indoor badminton tournament with air-conditioned courts.' },
     { title: 'SWIMMING', location: 'Bengaluru', date: '28-10-2025', fee: '400', status: 'ongoing', icon: 'swimmer', description: 'Swimming competition with multiple categories and age groups.' },
     { title: 'HOCKEY', location: 'Mumbai', date: '30-10-2025', fee: '300', status: 'ongoing', icon: 'hockey-puck', description: 'Field hockey match with professional equipment provided.' },
     { title: 'GOLF', location: 'Delhi', date: '02-11-2025', fee: '800', status: 'ongoing', icon: 'golf-ball', description: '18-hole golf tournament at premium golf course.' },
     { title: 'RUGBY', location: 'Bengaluru', date: '05-11-2025', fee: '450', status: 'ongoing', icon: 'football-ball', description: 'Rugby sevens tournament with experienced coaches.' },
     { title: 'ARCHERY', location: 'Mumbai', date: '08-11-2025', fee: '350', status: 'ongoing', icon: 'bullseye', description: 'Target archery competition with professional equipment.' }
  ],
  upcoming: [
     { title: 'VOLLEYBALL', location: 'Bengaluru', date: 'Not Announced', status: 'upcoming', icon: 'volleyball-ball', description: 'Upcoming volleyball tournament. Stay tuned for dates!' },
     { title: 'BASKETBALL', location: 'Mumbai', date: 'Not Announced', status: 'upcoming', icon: 'basketball-ball', description: 'Next basketball championship coming soon.' },
     { title: 'FOOTBALL', location: 'Delhi', date: 'Not Announced', status: 'upcoming', icon: 'futbol', description: 'Football league registration opening soon.' },
     { title: 'TENNIS', location: 'Bengaluru', date: 'Not Announced', status: 'upcoming', icon: 'table-tennis', description: 'Tennis championship with exciting prizes.' },
     { title: 'CRICKET', location: 'Mumbai', date: 'Not Announced', status: 'upcoming', icon: 'baseball-ball', description: 'Cricket tournament preparations underway.' },
     { title: 'BADMINTON', location: 'Delhi', date: 'Not Announced', status: 'upcoming', icon: 'table-tennis', description: 'Badminton championship coming next month.' },
     { title: 'SWIMMING', location: 'Bengaluru', date: 'Not Announced', status: 'upcoming', icon: 'swimmer', description: 'Swimming competition details to be announced.' },
     { title: 'HOCKEY', location: 'Mumbai', date: 'Not Announced', status: 'upcoming', icon: 'hockey-puck', description: 'Hockey league starting soon.' },
     { title: 'GOLF', location: 'Delhi', date: 'Not Announced', status: 'upcoming', icon: 'golf-ball', description: 'Golf tournament registration opening.' },
     { title: 'RUGBY', location: 'Bengaluru', date: 'Not Announced', status: 'upcoming', icon: 'football-ball', description: 'Rugby championship preparations in progress.' },
     { title: 'ARCHERY', location: 'Mumbai', date: 'Not Announced', status: 'upcoming', icon: 'bullseye', description: 'Archery competition details coming soon.' }
  ],
  past: [
     { title: 'VOLLEYBALL', location: 'Bengaluru', date: 'Ended', status: 'ended', icon: 'volleyball-ball', description: 'Amazing volleyball tournament completed successfully!' },
     { title: 'BASKETBALL', location: 'Mumbai', date: 'Ended', status: 'ended', icon: 'basketball-ball', description: 'Thrilling basketball championship concluded.' },
     { title: 'FOOTBALL', location: 'Delhi', date: 'Ended', status: 'ended', icon: 'futbol', description: 'Spectacular football match with great participation.' },
     { title: 'TENNIS', location: 'Bengaluru', date: 'Ended', status: 'ended', icon: 'table-tennis', description: 'Tennis tournament completed with exciting matches.' },
     { title: 'CRICKET', location: 'Mumbai', date: 'Ended', status: 'ended', icon: 'baseball-ball', description: 'Cricket championship finished with nail-biting finale.' },
     { title: 'BADMINTON', location: 'Delhi', date: 'Ended', status: 'ended', icon: 'table-tennis', description: 'Badminton tournament concluded successfully.' },
     { title: 'SWIMMING', location: 'Bengaluru', date: 'Ended', status: 'ended', icon: 'swimmer', description: 'Swimming competition completed with record times.' },
     { title: 'HOCKEY', location: 'Mumbai', date: 'Ended', status: 'ended', icon: 'hockey-puck', description: 'Hockey match ended with great sportsmanship.' },
     { title: 'GOLF', location: 'Delhi', date: 'Ended', status: 'ended', icon: 'golf-ball', description: 'Golf tournament concluded at premium course.' },
     { title: 'RUGBY', location: 'Bengaluru', date: 'Ended', status: 'ended', icon: 'football-ball', description: 'Rugby championship completed successfully.' },
     { title: 'ARCHERY', location: 'Mumbai', date: 'Ended', status: 'ended', icon: 'bullseye', description: 'Archery competition finished with perfect scores.' }
  ]
};

let currentFilter = 'ongoing';
let searchTerm = '';
let locationFilter = '';

const tabs = document.querySelectorAll('.game-tab');
const sections = document.querySelectorAll('.section');
const searchInput = document.getElementById('searchInput');
const locationSelect = document.getElementById('locationFilter');
const loadingState = document.getElementById('loadingState');
const emptyState = document.getElementById('emptyState');
const modal = document.getElementById('gameModal');

document.addEventListener('DOMContentLoaded', function () {
  renderGames();
  setupEventListeners();
});

function setupEventListeners() {
  tabs.forEach(tab => {
     tab.addEventListener('click', () => {
        const type = tab.dataset.type;
        switchTab(type);
     });
  });

  searchInput.addEventListener('input', (e) => {
     searchTerm = e.target.value.toLowerCase();
     filterAndRenderGames();
  });

  locationSelect.addEventListener('change', (e) => {
     locationFilter = e.target.value;
     filterAndRenderGames();
  });

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
     if (e.target === modal) {
        closeModal();
     }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
     if (e.key === 'Escape') {
        closeModal();
     }
  });
}

function switchTab(type) {
  tabs.forEach(tab => {
     tab.classList.toggle('active', tab.dataset.type === type);
  });

  sections.forEach(section => {
     section.style.display = section.id === `${type}-games` ? 'block' : 'none';
  });

  currentFilter = type;
  renderGames();
}

function createGameCard(game) {
  return `
     <div class="card" onclick="showGameDetails('${game.title}', '${game.location}')">
        <div class="card-image">
           <div class="sport-icon">
              <i class="fas fa-${game.icon}"></i>
           </div>
        </div>
        <div class="card-content">
           <h3 class="card-title">${game.title}</h3>
           <div class="card-details">
              <div class="card-info">
                 <div class="info-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${game.location}</span>
                 </div>
                 <div class="info-item">
                    <i class="fas fa-calendar-alt"></i>
                    <span>${game.date}</span>
                 </div>
                 ${game.fee ? `
                 <div class="info-item">
                    <i class="fas fa-rupee-sign"></i>
                    <span>${game.fee}/-</span>
                 </div>
                 ` : ''}
              </div>
              <div class="card-action">
                 <button class="action-btn" onclick{} title="View Details">

                    <i class="fas fa-arrow-right"></i>
                 </button>
                 <span class="status-badge status-${game.status}">
                    ${game.status}
                 </span>
              </div>
           </div>
        </div>
     </div>
  `;
}

function filterGames(games) {
  return games.filter(game => {
     const matchesSearch = !searchTerm ||
        game.title.toLowerCase().includes(searchTerm) ||
        game.location.toLowerCase().includes(searchTerm);

     const matchesLocation = !locationFilter || game.location === locationFilter;

     return matchesSearch && matchesLocation;
  });
}

function renderGames() {
  const games = gamesData[currentFilter];
  const filteredGames = filterGames(games);
  const container = document.getElementById(`${currentFilter}Container`);

  if (filteredGames.length === 0) {
     container.innerHTML = '';
     emptyState.style.display = 'block';
     return;
  }

  emptyState.style.display = 'none';
  container.innerHTML = filteredGames.map(createGameCard).join('');

  const countElement = document.querySelector(`#${currentFilter}-games .game-count`);
  if (countElement) {
     countElement.textContent = `${filteredGames.length} games ${currentFilter === 'ongoing' ? 'available' :
        currentFilter === 'upcoming' ? 'scheduled' : 'completed'}`;
  }
}

function filterAndRenderGames() {
  loadingState.style.display = 'block';
  document.querySelector(`#${currentFilter}-games .card-container`).style.display = 'none';

  setTimeout(() => {
     renderGames();
     loadingState.style.display = 'none';
     document.querySelector(`#${currentFilter}-games .card-container`).style.display = 'grid';
  }, 300);
}

function handleCardClick(title, location) {
  event.currentTarget.style.transform = 'scale(0.95)';
  setTimeout(() => {
     event.currentTarget.style.transform = '';
  }, 150);

  alert(`Opening details for ${title} in ${location}.\n\nThis would typically navigate to a detailed game page.`);
}

document.documentElement.style.scrollBehavior = 'smooth';

document.getElementById('ongoingContainer').innerHTML = '';
document.getElementById('upcomingContainer').innerHTML = '';
document.getElementById('pastContainer').innerHTML = '';


async function handleStartOrganizing() {
try {
 console.log('Checking authentication...');
 
 const isAuthenticated = await verifyUserToken();
 
 console.log('Authentication result:', isAuthenticated);
 
 if (isAuthenticated) {
     console.log('User authenticated, redirecting to games_org.html');
     window.location.href = './games_org.html';
 } else {
     console.log('User not authenticated, redirecting to login');
     window.location.href = './login.html';
 }
} catch (error) {
 console.error('Authentication check failed:', error);
 window.location.href = './login.html';
}
}

async function verifyUserToken() {
try {
 const authToken = sessionStorage.getItem('authToken');
 
 console.log('Checking sessionStorage for authToken...');
 console.log('Token found:', !!authToken);
 
 if (!authToken) {
     console.log('No auth token found in sessionStorage');
     return false;
 }

 console.log('Token found, verifying with backend...');
 console.log('Token starts with:', authToken.substring(0, 20) + '...');

 const response = await fetch('https://arise-backend-m9zz.onrender.com/users/verify-token', {
     method: 'GET',
     headers: {
         'Authorization': `Bearer ${authToken}`,
         'Content-Type': 'application/json'
     }
 });

 console.log('Backend response status:', response.status);
 
 if (response.ok) {
     const data = await response.json();
     console.log('Backend response data:', data);
     return data.success === true;
 } else {
     const errorData = await response.text();
     console.log('Backend error response:', errorData);
 }
 
 if (response.status === 401) {
     console.log('Token expired or invalid, removing from sessionStorage');
     sessionStorage.removeItem('authToken');
 }
 
 console.log('Token verification failed');
 return false;
 
} catch (error) {
 console.error('Token verification error:', error);
 return false;
}
}
