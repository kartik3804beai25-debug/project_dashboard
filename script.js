const questionsList = document.getElementById('questions-list');
const displayArea = document.getElementById('display-area');
const questionForm = document.getElementById('question-form');
const newQuestionBtn = document.getElementById('new-question-btn');

let questions = []; // Array to store question objects

// User Story 2: Submit New Question
questionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newQ = {
        id: Date.now(),
        title: document.getElementById('subject').value,
        text: document.getElementById('question-text').value,
        responses: []
    };
    questions.push(newQ);
    renderQuestionList();
    questionForm.reset();
});

// Render the list in the Left Pane
function renderQuestionList() {
    questionsList.innerHTML = '';
    questions.forEach(q => {
        const div = document.createElement('div');
        div.className = 'question-item';
        div.innerHTML = `<h3>${q.title}</h3><p>${q.text}</p>`;
        div.onclick = () => showQuestionDetail(q);
        questionsList.appendChild(div);
    });
}

// User Story 3 & 4: Display Question and Responses in Right Pane
function showQuestionDetail(q) {
    displayArea.innerHTML = `
        <div class="detail-view">
            <h2>Question</h2>
            <div style="background:#f9f9f9; padding:15px;">
                <h3>${q.title}</h3>
                <p>${q.text}</p>
            </div>
            <button class="resolve-btn" onclick="resolveQuestion(${q.id})">Resolve</button>
            
            <h3>Responses</h3>
            <div id="responses-section">
                ${q.responses.map(r => `<div class="response-item"><b>${r.name}</b><p>${r.comment}</p></div>`).join('')}
            </div>

            <hr>
            <h3>Add Response</h3>
            <form id="response-form">
                <input type="text" id="resp-name" placeholder="Enter Name" required>
                <textarea id="resp-comment" placeholder="Enter Comment" required></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    // Handle Response Submission (User Story 5)
    document.getElementById('response-form').onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById('resp-name').value;
        const comment = document.getElementById('resp-comment').value;
        
        q.responses.push({ name, comment });
        showQuestionDetail(q); // Re-render detail view
    };
}

// Resolve functionality (removes question)
function resolveQuestion(id) {
    questions = questions.filter(q => q.id !== id);
    renderQuestionList();
    displayArea.innerHTML = '<h2>Question Resolved</h2>';
}

// Switch back to "New Question" form
newQuestionBtn.onclick = () => {
    location.reload(); // Simplest way to reset to initial state
};