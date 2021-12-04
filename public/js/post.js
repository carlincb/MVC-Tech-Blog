
const newFormHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#post-field').value;
    const title = document.querySelector('#title-field').value;
    
    if (comment && title) {

        const response = await fetch('api/post/', {
            method: 'POST',
            body: JSON.stringify({ comment, title }),
            headers: { 'Content-type': 'application/json' }
        });
        if (response.ok) {
            document.querySelector('#post-field').value = "";
            document.querySelector('#title-field').value = "";
            document.location.reload();
        } else {
            alert('Failed to create post')
        };
    };
};

const editButtonHandler = async (event) => {
    event.preventDefault();

      if (post && title && id) {
        const id = document.querySelector('#edit-button').getAttribute('data-edit');
        const post = document.querySelector('#edit-post-field').value;
        const title = document.querySelector('#edit-title-field').value;

        const response = await fetch(`api/post/edit/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ post, title }),
          headers: { 'Content-type': 'application/json' }
        });
        
        if (response.ok) {
          document.location.reload()
        } else {
          alert('Unable to edit post')
        }
      }
  };

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete post');
      }
    }
  };

document
    .querySelector('#add-post')
    .addEventListener('submit', newFormHandler)

document
    .querySelector('#edit-post')
    .addEventListener('click', editButtonHandler);

document
    .querySelector('#delete-post')
    .addEventListener('click', delButtonHandler);