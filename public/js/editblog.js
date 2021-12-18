const newFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-name').value.trim();
    const content = document.querySelector('#blog-desc').value.trim();
    const id = event.target.getAttribute("data-id")


    if (title && content) {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to create blog post');
      }
    }
  };

  
  

  document
    .querySelector('.edit-blog-form')
    .addEventListener('submit', newFormHandler);