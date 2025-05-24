 // Panel switching functionality
 const container = document.getElementById('container');
 const signUpButton = document.getElementById('signUp');
 const signInButton = document.getElementById('signIn');

 signUpButton.addEventListener('click', () => {
   container.classList.add('right-panel-active');
   clearMessages();
 });

 signInButton.addEventListener('click', () => {
   container.classList.remove('right-panel-active');
   clearMessages();
 });

 // API Configuration
 const API_BASE_URL = 'https://arise-backend-m9zz.onrender.com';

 // Utility functions
 function showMessage(elementId, message, type) {
   const messageEl = document.getElementById(elementId);
   messageEl.textContent = message;
   messageEl.className = `status-message ${type}`;
   messageEl.style.display = 'block';
   
   // Auto-hide success messages after 3 seconds
   if (type === 'success') {
     setTimeout(() => {
       messageEl.style.display = 'none';
     }, 3000);
   }
 }

 function clearMessages() {
   document.getElementById('signUpMessage').style.display = 'none';
   document.getElementById('signInMessage').style.display = 'none';
 }

 function setFormLoading(form, isLoading) {
   if (isLoading) {
     form.classList.add('loading');
     form.querySelector('button').textContent = 'Processing...';
   } else {
     form.classList.remove('loading');
     const isSignUp = form.id === 'signUpForm';
     form.querySelector('button').textContent = isSignUp ? 'Sign Up' : 'Sign In';
   }
 }

 // Sign Up functionality
 const signUpForm = document.getElementById('signUpForm');
 signUpForm.addEventListener('submit', async (e) => {
   e.preventDefault();
   
   const formData = new FormData(signUpForm);
   const name = formData.get('name').trim();
   const email = formData.get('email').trim();
   const password = formData.get('password');

   // Client-side validation
   if (!name || !email || !password) {
     showMessage('signUpMessage', 'Please fill in all fields', 'error');
     return;
   }

   if (password.length < 6) {
     showMessage('signUpMessage', 'Password must be at least 6 characters long', 'error');
     return;
   }

   // Email format validation
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!emailRegex.test(email)) {
     showMessage('signUpMessage', 'Please enter a valid email address', 'error');
     return;
   }

   setFormLoading(signUpForm, true);
   clearMessages();

   try {
     const response = await fetch(`${API_BASE_URL}/users`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         name: name,
         email: email,
         password: password
       })
     });

     const result = await response.json();

     if (result.success) {
       showMessage('signUpMessage', 'Account created successfully! Please sign in.', 'success');
       setTimeout(() => {
         container.classList.remove('right-panel-active');
         signUpForm.reset();
       }, 2000);
     } else {
       showMessage('signUpMessage', result.message || 'Failed to create account', 'error');
     }
   } catch (error) {
     console.error('Sign up error:', error);
     showMessage('signUpMessage', 'Network error. Please check if the server is running.', 'error');
   } finally {
     setFormLoading(signUpForm, false);
   }
 });

 // Sign In functionality
 const signInForm = document.getElementById('signInForm');
 signInForm.addEventListener('submit', async (e) => {
   e.preventDefault();

   const formData = new FormData(signInForm);
   const email = formData.get('email').trim();
   const password = formData.get('password');

   if (!email || !password) {
     showMessage('signInMessage', 'Please fill in all fields', 'error');
     return;
   }

   setFormLoading(signInForm, true);
   clearMessages();

   try {
     const response = await fetch(`${API_BASE_URL}/users/login`, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         email: email,
         password: password
       })
     });

     const result = await response.json();

     if (result.success) {
       // Store user information
       sessionStorage.setItem('isLoggedIn', 'true');
       sessionStorage.setItem('userId', result.user.id);
       sessionStorage.setItem('userName', result.user.name);
       sessionStorage.setItem('userEmail', result.user.email);
       
       showMessage('signInMessage', 'Login successful! Redirecting...', 'success');
       
       // Redirect to index.html after successful login
       setTimeout(() => {
         window.location.href = 'index.html';
       }, 1500);
       
     
     } else {
       showMessage('signInMessage', result.message || 'Login failed', 'error');
     }
   } catch (error) {
     console.error('Sign in error:', error);
     showMessage('signInMessage', 'Network error. Please check if the server is running.', 'error');
   } finally {
     setFormLoading(signInForm, false);
   }
 });

 // Authentication utility functions
 function isLoggedIn() {
   return sessionStorage.getItem('isLoggedIn') === 'true';
 }

 function logout() {
   sessionStorage.removeItem('isLoggedIn');
   sessionStorage.removeItem('userId');
   sessionStorage.removeItem('userName');
   sessionStorage.removeItem('userEmail');
   showMessage('signInMessage', 'Logged out successfully', 'success');
 }

 function getCurrentUser() {
   if (!isLoggedIn()) return null;
   return {
     id: sessionStorage.getItem('userId'),
     name: sessionStorage.getItem('userName'),
     email: sessionStorage.getItem('userEmail')
   };
 }

 // Simple fetch utility (no authentication needed)
 async function simpleFetch(url, options = {}) {
   const response = await fetch(url, {
     headers: {
       'Content-Type': 'application/json',
       ...options.headers
     },
     ...options
   });

   return response;
 }

 // Check login status on page load
 window.addEventListener('load', () => {
   if (isLoggedIn()) {
     const user = getCurrentUser();
     showMessage('signInMessage', `Welcome back, ${user.name}!`, 'success');
   }
   
 });

 // Expose functions globally for debugging/testing
 window.authUtils = {
   isLoggedIn,
   logout,
   getCurrentUser,
   simpleFetch
 };