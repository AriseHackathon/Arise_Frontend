const API_BASE_URL = 'https://arise-backend-m9zz.onrender.com';

async function verifyToken() {
  const token = sessionStorage.getItem('authToken');
  
  if (!token) {
    console.log('No token found');
    return false;
  }

  try {

    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    
    if (payload.exp && payload.exp < currentTime) {
      console.log('Token expired');
      clearAuthData();
      return false;
    }
    
    console.log('Token is valid');
    return true;
  } catch (error) {
    console.error('Token verification failed:', error);
    clearAuthData();
    return false;
  }
}

async function verifyTokenWithServer() {
  const token = sessionStorage.getItem('authToken');
  
  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/users/verify-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.json();
      return result.success;
    } else {
      console.log('Token verification failed with server');
      clearAuthData();
      return false;
    }
  } catch (error) {
    console.error('Server token verification error:', error);
    return await verifyToken();
  }
}

function clearAuthData() {
  sessionStorage.removeItem('isLoggedIn');
  sessionStorage.removeItem('authToken');
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('userName');
  sessionStorage.removeItem('userEmail');
}

async function checkAuth() {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn');
  const token = sessionStorage.getItem('authToken');
  
  if (!isLoggedIn || !token) {
    console.log('No auth data found, redirecting to login');
    window.location.href = 'login.html';
    return false;
  }

\  const isTokenValid = await verifyToken();
  
  if (!isTokenValid) {
    console.log('Invalid token, redirecting to login');
    window.location.href = 'login.html';
    return false;
  }

  console.log('Authentication successful');
  return true;
}

document.addEventListener('DOMContentLoaded', async () => {
  const isAuthenticated = await checkAuth();
  
  if (!isAuthenticated) {
    return; 
  }

  initializeGamesPage();
});

function initializeGamesPage() {
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

  console.log('Games page initialized successfully');
}

function logout() {
  clearAuthData();
  window.location.href = 'login.html';
}

setInterval(async () => {
  const isValid = await verifyToken();
  if (!isValid) {
    alert('Your session has expired. Please log in again.');
    logout();
  }
}, 5 * 60 * 1000); 