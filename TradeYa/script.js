// Load data from local storage or use default data
const teamMembers = JSON.parse(localStorage.getItem('teamMembers')) || [
    { name: "Adrian", skills: "Logistics, Performing Music", needs: "Promotion, Event Coordination", portfolio: "#", contact: "adrian@example.com" },
    { name: "Izzy", skills: "Clothing Brand, Merch", needs: "Graphic Design", portfolio: "#", contact: "izzy@example.com" },
    { name: "TLOK", skills: "Engineering, Producing, Audio Edit", needs: "Mixing Mastering", portfolio: "#", contact: "tlok@example.com" },
    { name: "RJ", skills: "Setup, House Engineer, DJ", needs: "Event Planning", portfolio: "#", contact: "rj@example.com" },
    { name: "Johnny Maconny", skills: "Audio Engineering, Podcast Editing", needs: "Web Development", portfolio: "#", contact: "johnny@example.com" },
    { name: "Benny", skills: "Filming, Editing, Radio Connections", needs: "Collaborative Projects", portfolio: "#", contact: "benny@example.com" },
    { name: "Jaylon", skills: "Beatmaking, Admin, Promo", needs: "Marketing Assistance", portfolio: "#", contact: "jaylon@example.com" },
    { name: "Greg", skills: "Music Production, Instrumentalist", needs: "Studio Space", portfolio: "#", contact: "greg@example.com" },
    { name: "Juan", skills: "Accounting, Brand Development", needs: "Music Marketing", portfolio: "#", contact: "juan@example.com" },
    { name: "Mike", skills: "Songwriting, Vlog Editing", needs: "Distribution Channels", portfolio: "#", contact: "mike@example.com" },
    { name: "Thalita", skills: "Styling, Marketing Strategy", needs: "Portfolio Shoots", portfolio: "#", contact: "thalita@example.com" }
];

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const collabProjects = JSON.parse(localStorage.getItem('collabProjects')) || [];

const teamList = document.getElementById("team-list");
const taskList = document.getElementById("task-list");
const collabList = document.getElementById("collab-list");

function saveToLocalStorage() {
    localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('collabProjects', JSON.stringify(collabProjects));
}

// User feedback function
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        <strong>${type === 'success' ? 'Success!' : 'Error!'}</strong> ${message}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    `;
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.classList.remove('show');
        alert.classList.add('hide');
        setTimeout(() => {
            alert.remove();
        }, 500);
    }, 3000);
}

// Form validation function
function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required]');
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = 'red';
            isValid = false;
        } else {
            input.style.borderColor = '';
        }
    });
    return isValid;
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// User feedback function
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    document.body.appendChild(alert);
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

function populateTeamTable() {
    teamList.innerHTML = ""; // Clear existing rows
    teamMembers.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="false">${member.name}</td>
            <td contenteditable="false">${member.skills}</td>
            <td contenteditable="false">${member.needs}</td>
            <td contenteditable="false"><a href="${member.portfolio}" target="_blank">${member.portfolio}</a></td>
            <td contenteditable="false">${member.contact}</td>
            <td>
                <button onclick="contactMember('${member.contact}')">Contact</button>
                <button onclick="editMember(${index})">Edit</button>
                <button onclick="saveMember(${index})" style="display:none;">Save</button>
                <button onclick="deleteMember(${index})">Delete</button>
            </td>
        `;
        teamList.appendChild(row);
    });
}

function contactMember(contact) {
    const subject = encodeURIComponent("Collaboration Opportunity");
    const body = encodeURIComponent("Hi, I would like to discuss a potential collaboration with you.");
    window.location.href = `mailto:${contact}?subject=${subject}&body=${body}`;
}

function editMember(index) {
    const row = teamList.rows[index];
    for (let i = 0; i < 5; i++) {
        row.cells[i].contentEditable = "true";
    }
    row.cells[5].querySelector('button[onclick^="editMember"]').style.display = "none";
    row.cells[5].querySelector('button[onclick^="saveMember"]').style.display = "inline";
}

function saveMember(index) {
    const row = teamList.rows[index];
    const name = row.cells[0].innerText;
    const skills = row.cells[1].innerText;
    const needs = row.cells[2].innerText;
    const portfolio = row.cells[3].querySelector('a').innerText;
    const contact = row.cells[4].innerText;

    teamMembers[index] = { name, skills, needs, portfolio, contact };

    for (let i = 0; i < 5; i++) {
        row.cells[i].contentEditable = "false";
    }
    row.cells[5].querySelector('button[onclick^="editMember"]').style.display = "inline";
    row.cells[5].querySelector('button[onclick^="saveMember"]').style.display = "none";
    saveToLocalStorage();
    showAlert('Member saved successfully!');
}

function deleteMember(index) {
    teamMembers.splice(index, 1);
    populateTeamTable();
    saveToLocalStorage();
    showAlert('Member deleted successfully!', 'danger');
}

function addMember() {
    const name = document.getElementById('new-name').value;
    const skills = document.getElementById('new-skills').value;
    const needs = document.getElementById('new-needs').value;
    const portfolio = document.getElementById('new-portfolio').value;
    const contact = document.getElementById('new-contact').value;

    teamMembers.push({ name, skills, needs, portfolio, contact });
    populateTeamTable();
    saveToLocalStorage();
    showAlert('Member added successfully!');
}

function searchUsers() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredMembers = teamMembers.filter(member =>
        member.skills.toLowerCase().includes(query) ||
        member.needs.toLowerCase().includes(query) ||
        member.name.toLowerCase().includes(query)
    );

    teamList.innerHTML = ""; // Clear existing rows
    filteredMembers.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="false">${member.name}</td>
            <td contenteditable="false">${member.skills}</td>
            <td contenteditable="false">${member.needs}</td>
            <td contenteditable="false"><a href="${member.portfolio}" target="_blank">${member.portfolio}</a></td>
            <td contenteditable="false">${member.contact}</td>
            <td>
                <button onclick="contactMember('${member.contact}')">Contact</button>
                <button onclick="editMember(${index})">Edit</button>
                <button onclick="saveMember(${index})" style="display:none;">Save</button>
                <button onclick="deleteMember(${index})">Delete</button>
            </td>
        `;
        teamList.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", populateTeamTable);

document.getElementById('add-member-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(e.target)) {
        addMember();
    }
});

document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(e.target)) {
        addTask();
    }
});

document.getElementById('add-collab-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(e.target)) {
        addCollab();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    populateTeamTable();
    populateTaskList();
    populateCollabList();
    populateCompletedCollabList();
});

// Task Management

function populateTaskList() {
    taskList.innerHTML = ""; // Clear existing tasks
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <h3 contenteditable="true">${task.title}</h3>
            <p contenteditable="true">${task.description}</p>
            <p contenteditable="true">Requested by: ${task.requester}</p>
            <p contenteditable="true">Contact: ${task.contact}</p>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="saveTask(${index})" style="display:none;">Save</button>
            <button onclick="markTaskCompleted(${index})">Mark as Completed</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const requester = document.getElementById('task-requester').value;
    const contact = document.getElementById('task-contact').value;

    tasks.push({ title, description, requester, contact, completed: false });
    populateTaskList();
    saveToLocalStorage();
    showAlert('Task added successfully!');
}

function editTask(index) {
    const taskItem = taskList.children[index];
    taskItem.querySelector('h3').contentEditable = "true";
    taskItem.querySelector('p').contentEditable = "true";
    taskItem.querySelector('button[onclick^="editTask"]').style.display = "none";
    taskItem.querySelector('button[onclick^="saveTask"]').style.display = "inline";
}

function saveTask(index) {
    const taskItem = taskList.children[index];
    const title = taskItem.querySelector('h3').innerText;
    const description = taskItem.querySelector('p').innerText;
    const requester = taskItem.querySelector('p:nth-of-type(2)').innerText.replace('Requested by: ', '');
    const contact = taskItem.querySelector('p:nth-of-type(3)').innerText.replace('Contact: ', '');

    tasks[index] = { title, description, requester, contact, completed: tasks[index].completed };

    taskItem.querySelector('h3').contentEditable = "false";
    taskItem.querySelector('p').contentEditable = "false";
    taskItem.querySelector('button[onclick^="editTask"]').style.display = "inline";
    taskItem.querySelector('button[onclick^="saveTask"]').style.display = "none";
    saveToLocalStorage();
    showAlert('Task saved successfully!');
}

function markTaskCompleted(index) {
    tasks[index].completed = true;
    populateTaskList();
    saveToLocalStorage();
    showAlert('Task marked as completed!');
}

function deleteTask(index) {
    tasks.splice(index, 1);
    populateTaskList();
    saveToLocalStorage();
    showAlert('Task deleted successfully!', 'danger');
}

document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(e.target)) {
        addTask();
    }
});

// Collab Projects Management

function populateCollabList() {
    collabList.innerHTML = ""; // Clear existing projects
    collabProjects.forEach((project, index) => {
        if (!project.completed) {
            const projectItem = document.createElement("li");
            projectItem.innerHTML = `
                <h3 contenteditable="true">${project.title}</h3>
                <p contenteditable="true">${project.description}</p>
                <p>Positions Needed: ${project.positions.map((pos, posIndex) => `
                    <span contenteditable="true">${pos.name} ${pos.member ? `(Assigned to: ${pos.member})` : ''}</span>
                    ${!pos.member ? `<button onclick="signUpForPosition(${index}, ${posIndex})">Sign Up</button>` : ''}
                    <button onclick="editPosition(${index}, ${posIndex})">Edit</button>
                    <button onclick="savePosition(${index}, ${posIndex})" style="display:none;">Save</button>
                `).join(', ')}</p>
                <ul>
                    ${project.steps.map((step, stepIndex) => `
                        <li>
                            <input type="checkbox" ${step.completed ? 'checked' : ''} onclick="toggleStep(${index}, ${stepIndex})">
                            ${step.description}
                        </li>
                    `).join('')}
                </ul>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${project.progress}%"></div>
                </div>
                <button onclick="editCollab(${index})">Edit</button>
                <button onclick="saveCollab(${index})" style="display:none;">Save</button>
                <button onclick="deleteCollab(${index})">Delete</button>
                <button onclick="markCollabCompleted(${index})">Mark as Completed</button>
            `;
            collabList.appendChild(projectItem);
        }
    });
}

function addCollab() {
    const title = document.getElementById('collab-title').value;
    const description = document.getElementById('collab-description').value;
    const positions = document.getElementById('collab-positions').value.split(',').map(pos => ({ name: pos.trim(), member: null }));

    collabProjects.push({ title, description, positions, steps: [], progress: 0 });
    populateCollabList();
    saveToLocalStorage();
    showAlert('Collaboration project added successfully!');
}

function editCollab(index) {
    const projectItem = collabList.children[index];
    projectItem.querySelector('h3').contentEditable = "true";
    projectItem.querySelector('p').contentEditable = "true";
    projectItem.querySelector('button[onclick^="editCollab"]').style.display = "none";
    projectItem.querySelector('button[onclick^="saveCollab"]').style.display = "inline";
}

function saveCollab(index) {
    const projectItem = collabList.children[index];
    const title = projectItem.querySelector('h3').innerText;
    const description = projectItem.querySelector('p').innerText;

    collabProjects[index].title = title;
    collabProjects[index].description = description;

    projectItem.querySelector('h3').contentEditable = "false";
    projectItem.querySelector('p').contentEditable = "false";
    projectItem.querySelector('button[onclick^="editCollab"]').style.display = "inline";
    projectItem.querySelector('button[onclick^="saveCollab"]').style.display = "none";
    saveToLocalStorage();
    showAlert('Collaboration project saved successfully!');
}

function deleteCollab(index) {
    collabProjects.splice(index, 1);
    populateCollabList();
    saveToLocalStorage();
    showAlert('Collaboration project deleted successfully!', 'danger');
}

function toggleStep(projectIndex, stepIndex) {
    collabProjects[projectIndex].steps[stepIndex].completed = !collabProjects[projectIndex].steps[stepIndex].completed;
    updateProgress(projectIndex);
    populateCollabList();
    saveToLocalStorage();
    showAlert('Step status updated!');
}

function updateProgress(projectIndex) {
    const project = collabProjects[projectIndex];
    const completedSteps = project.steps.filter(step => step.completed).length;
    project.progress = (completedSteps / project.steps.length) * 100;
}

function signUpForPosition(projectIndex, positionIndex) {
    const memberName = prompt("Enter your name to sign up for this position:");
    if (memberName) {
        collabProjects[projectIndex].positions[positionIndex].member = memberName;
        populateCollabList();
        saveToLocalStorage();
        showAlert('Signed up for position successfully!');
    }
}

function editPosition(projectIndex, positionIndex) {
    const projectItem = collabList.children[projectIndex];
    const positionSpan = projectItem.querySelectorAll('span')[positionIndex];
    positionSpan.contentEditable = "true";
    projectItem.querySelectorAll('button[onclick^="editPosition"]')[positionIndex].style.display = "none";
    projectItem.querySelectorAll('button[onclick^="savePosition"]')[positionIndex].style.display = "inline";
}

function savePosition(projectIndex, positionIndex) {
    const projectItem = collabList.children[projectIndex];
    const positionSpan = projectItem.querySelectorAll('span')[positionIndex];
    const positionName = positionSpan.innerText.split(' (')[0]; // Remove any assigned member text
    collabProjects[projectIndex].positions[positionIndex].name = positionName;

    positionSpan.contentEditable = "false";
    projectItem.querySelectorAll('button[onclick^="editPosition"]')[positionIndex].style.display = "inline";
    projectItem.querySelectorAll('button[onclick^="savePosition"]')[positionIndex].style.display = "none";
    saveToLocalStorage();
    showAlert('Position saved successfully!');
}

function markCollabCompleted(index) {
    collabProjects[index].completed = true;
    populateCollabList();
    populateCompletedCollabList();
    saveToLocalStorage();
    showAlert('Collaboration project marked as completed!');
}

function populateCompletedCollabList() {
    const completedCollabList = document.getElementById("completed-collab-list");
    completedCollabList.innerHTML = ""; // Clear existing projects
    collabProjects.forEach((project, index) => {
        if (project.completed) {
            const projectItem = document.createElement("li");
            projectItem.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p>Positions: ${project.positions.map(pos => `
                    <span>${pos.name} ${pos.member ? `(Assigned to: ${pos.member})` : ''}</span>
                `).join(', ')}</p>
                <a href="${project.link}" target="_blank">View Project</a>
            `;
            completedCollabList.appendChild(projectItem);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateTeamTable();
    populateTaskList();
    populateCollabList();
});
