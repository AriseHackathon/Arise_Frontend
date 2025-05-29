

const API_BASE_URL = 'https://arise-backend-m9zz.onrender.com'; 

async function fetchPosts() {
    try {
        const response = await fetch(`${API_BASE_URL}/posts`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function renderPosts(posts) {
    const updatesContainer = document.querySelector('.updates');
    
    if (!posts || posts.length === 0) {
        updatesContainer.innerHTML = '<p>No posts available at the moment.</p>';
        return;
    }
    
    updatesContainer.innerHTML = posts.map(post => `
        <article class="update-card">
            <h3 class="update-title">${post.title}</h3>
            <time class="update-date" datetime="${post.dataCreated}">${formatDate(post.dataCreated)}</time>
            <p class="update-content">${post.description}</p>
            ${post.content ? `<div class="post-content">${post.content}</div>` : ''}
        </article>
    `).join('');
}

async function initializeBlog() {
    const updatesContainer = document.querySelector('.updates');
    updatesContainer.innerHTML = '<p>Loading posts...</p>';
    
    const posts = await fetchPosts();
    renderPosts(posts);
}

document.addEventListener('DOMContentLoaded', initializeBlog);

setInterval(async () => {
    const posts = await fetchPosts();
    renderPosts(posts);
}, 30000);


async function createPost(postData) {
  try {
      const response = await fetch(`${API_BASE_URL}/posts`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
  } catch (error) {
      console.error('Error creating post:', error);
      throw error;
  }
}

function showFormMessage(message, type = 'success') {
  const messageDiv = document.getElementById('form-message');
  messageDiv.textContent = message;
  messageDiv.className = `form-message ${type}`;
  messageDiv.style.display = 'block';
  
  setTimeout(() => {
      messageDiv.style.display = 'none';
  }, 5000);
}

function resetForm() {
  document.getElementById('blog-form').reset();
  document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
}

function toggleLoading(isLoading) {
  const submitBtn = document.querySelector('.submit-btn');
  const btnText = document.querySelector('.btn-text');
  const btnLoading = document.querySelector('.btn-loading');
  
  if (isLoading) {
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      btnLoading.style.display = 'inline';
  } else {
      submitBtn.disabled = false;
      btnText.style.display = 'inline';
      btnLoading.style.display = 'none';
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const postData = {
      title: formData.get('title'),
      description: formData.get('description'),
      content: formData.get('content'),
      dataCreated: formData.get('dataCreated')
  };
  
  if (!postData.title.trim() || !postData.description.trim()) {
      showFormMessage('Please fill in all required fields', 'error');
      return;
  }
  
  toggleLoading(true);
  
  try {
      await createPost(postData);
      showFormMessage('Post created successfully!', 'success');
      resetForm();
      
      const posts = await fetchPosts();
      renderPosts(posts);
      
  } catch (error) {
      showFormMessage('Error creating post. Please try again.', 'error');
  } finally {
      toggleLoading(false);
  }
}

async function initializeBlog() {
  const updatesContainer = document.querySelector('.updates');
  updatesContainer.innerHTML = '<p>Loading posts...</p>';
  
  const posts = await fetchPosts();
  renderPosts(posts);
  
  const blogForm = document.getElementById('blog-form');
  if (blogForm) {
      blogForm.addEventListener('submit', handleFormSubmit);
      
      // Set today's date as default
      document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
  }
}