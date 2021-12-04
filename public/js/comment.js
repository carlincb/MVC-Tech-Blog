const newFormHandler = async (event) => {
    event.preventDefault();
    
    const comment = document.querySelector('#comment-field').value;

    if (comment) {
        const response = await fetch('/api/post/comment', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.querySelector('#comment-field').value = "";
            document.location.reload();
        } else {
            alert('Failed to create comment')
        }
    };
};

const editButtonHandler = async (event) => {
    event.preventDefault();

    if (event.target.getAttribute('data-edit')) {
        const id = event.target.getAttribute('data-edit')
    
        const post = await fetch(`/edit/${id}`)
    
        const parsedPost = await post.json();
        if (post.ok) {
          document.querySelector('#edit-title-field').value = parsedPost.title;
          document.querySelector('#edit-post-field').value = parsedPost.post;
          postEdit.classList.add('is-active');
        } else {
          alert('Unable to edit comment')
        }
      }
  };
  
const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/post/comment/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to delete comment');
      }
    }
  };

document
    .querySelector('#add-comment')
    .addEventListener('submit', newFormHandler)

document
    .querySelector('#edit-comment')
    .addEventListener('click', editButtonHandler);

document
  .querySelector('#delete-comment')
  .addEventListener('click', delButtonHandler);