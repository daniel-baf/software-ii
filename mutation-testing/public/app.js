const API_URL = '/api/comments';

async function fetchComments() {
    const response = await fetch(API_URL);
    const comments = await response.json();
    renderComments(comments, document.getElementById('comments-list'));
}

function renderComments(comments, container) {
    container.innerHTML = '';
    comments.forEach(comment => {
        const div = document.createElement('div');
        div.className = 'comment';
        div.innerHTML = `
            <p>${comment.content}</p>
            <small>ID: ${comment.id}</small>
            <button onclick="showReplyForm(${comment.id})">Responder</button>
            <div id="reply-form-${comment.id}"></div>
            <div class="replies"></div>
        `;

        if (comment.children && comment.children.length > 0) {
            renderComments(comment.children, div.querySelector('.replies'));
        }

        container.appendChild(div);
    });
}

function showReplyForm(parentId) {
    const existingForm = document.getElementById(`reply-form-${parentId}`);
    if (existingForm.innerHTML) {
        existingForm.innerHTML = '';
        return;
    }

    existingForm.innerHTML = `
        <form onsubmit="postComment(event, ${parentId})">
            <input type="text" placeholder="Responder..." required>
            <button type="submit">Enviar</button>
        </form>
    `;
}

async function postComment(event, parentId = null) {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const content = input.value;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, parent_id: parentId })
    });

    input.value = '';
    if (parentId) {
        document.getElementById(`reply-form-${parentId}`).innerHTML = '';
    }
    fetchComments();
}

fetchComments();
