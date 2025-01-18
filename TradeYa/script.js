import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCr7wxWHJyv4C9pGOJ0Juf7latDmceTew",
    authDomain: "tradeya-45ede.firebaseapp.com",
    projectId: "tradeya-45ede",
    storageBucket: "tradeya-45ede.firebasestorage.app",
    messagingSenderId: "476911238747",
    appId: "1:476911238747:web:e9b73b157f3fa63ba4897e",
    measurementId: "G-XNL1Y7CZWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initial team members data
const initialTeamMembers = [
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

// Function to save initial data to Firestore
async function saveInitialData() {
    try {
        const docRef = doc(db, 'teamMembers', 'data');
        await setDoc(docRef, { teamMembers: initialTeamMembers });
        console.log('Initial team members data saved to Firestore');
    } catch (error) {
        console.error('Error saving initial data: ', error);
    }
}

// Call this function once to save the initial data
saveInitialData();

// Fetch Data from Firestore
async function fetchData(collectionName) {
    try {
        const docRef = doc(db, collectionName, 'data');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().teamMembers;
        } else {
            console.log("No such document!");
            return [];
        }
    } catch (error) {
        console.error('Error fetching data: ', error);
        return [];
    }
}

// Load Data
async function loadTeamMembers() {
    const teamMembers = await fetchData('teamMembers');
    populateTeamTable(teamMembers);
}

async function loadTasks() {
    const tasks = await fetchData('tasks');
    populateTaskList(tasks);
}

async function loadCollabProjects() {
    const collabProjects = await fetchData('collabProjects');
    populateCollabList(collabProjects);
    populateCompletedCollabList(collabProjects);
}

// Populate Team Members
function populateTeamTable(teamMembers) {
    const teamList = document.getElementById("team-list");
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

// Add Data to Firestore
async function addTeamMember(member) {
    try {
        const docRef = doc(db, 'teamMembers', 'data');
        const docSnap = await getDoc(docRef);
        let teamMembers = [];
        if (docSnap.exists()) {
            teamMembers = docSnap.data().teamMembers;
        }
        teamMembers.push(member);
        await setDoc(docRef, { teamMembers });
        loadTeamMembers();
    } catch (error) {
        console.error('Error adding team member: ', error);
    }
}

async function addTask(task) {
    try {
        const docRef = doc(db, 'tasks', 'data');
        const docSnap = await getDoc(docRef);
        let tasks = [];
        if (docSnap.exists()) {
            tasks = docSnap.data().tasks;
        }
        tasks.push(task);
        await setDoc(docRef, { tasks });
        loadTasks();
    } catch (error) {
        console.error('Error adding task: ', error);
    }
}

async function addCollabProject(project) {
    try {
        const docRef = doc(db, 'collabProjects', 'data');
        const docSnap = await getDoc(docRef);
        let collabProjects = [];
        if (docSnap.exists()) {
            collabProjects = docSnap.data().collabProjects;
        }
        collabProjects.push(project);
        await setDoc(docRef, { collabProjects });
        loadCollabProjects();
    } catch (error) {
        console.error('Error adding collaboration project: ', error);
    }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    loadTeamMembers();
    loadTasks();
    loadCollabProjects();
});

document.getElementById('add-member-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const member = {
        name: document.getElementById('new-name').value,
        skills: document.getElementById('new-skills').value,
        needs: document.getElementById('new-needs').value,
        portfolio: document.getElementById('new-portfolio').value,
        contact: document.getElementById('new-contact').value
    };
    await addTeamMember(member);
});

document.getElementById('add-task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        requester: document.getElementById('task-requester').value,
        contact: document.getElementById('task-contact').value,
        completed: false
    };
    await addTask(task);
});

document.getElementById('add-collab-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const project = {
        title: document.getElementById('collab-title').value,
        description: document.getElementById('collab-description').value,
        positions: document.getElementById('collab-positions').value.split(',').map(pos => ({ name: pos.trim(), member: null })),
        steps: [],
        progress: 0,
        completed: false
    };
    await addCollabProject(project);
});

document.getElementById('add-task-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const task = {
        title: document.getElementById('task-title').value,
        description: document.getElementById('task-description').value,
        requester: document.getElementById('task-requester').value,
        contact: document.getElementById('task-contact').value,
        completed: false
    };
    await addTask(task);
});

document.getElementById('add-collab-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const project = {
        title: document.getElementById('collab-title').value,
        description: document.getElementById('collab-description').value,
        positions: document.getElementById('collab-positions').value.split(',').map(pos => ({ name: pos.trim(), member: null })),
        steps: [],
        progress: 0,
        completed: false
    };
    await addCollabProject(project);
});

const teamList = document.getElementById("team-list");
const taskList = document.getElementById("task-list");
const collabList = document.getElementById("collab-list");

// User feedback function
async function showAlert(message, type = 'success') {
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
async function validateForm(form) {
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
async function validateEmail(email) {
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

// Collaboration Projects Display

async function populateCollabList(collabProjects) {
    const collabList = document.getElementById("collab-list");
    collabList.innerHTML = ""; // Clear existing projects
    collabProjects.forEach((project, index) => {
        if (!project.completed) {
            const projectItem = document.createElement("li");
            projectItem.className = "list-group-item";
            projectItem.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <p>Positions Needed: ${project.positions.map((pos, posIndex) => `
                    <span>${pos.name} ${pos.member ? `(Assigned to: ${pos.member})` : ''}</span>
                    ${!pos.member ? `<button class="btn btn-sm btn-primary" onclick="signUpForPosition(${index}, ${posIndex})">Sign Up</button>` : ''}
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
                <button class="btn btn-sm btn-secondary" onclick="editCollab(${index})">Edit</button>
                <button class="btn btn-sm btn-success" onclick="saveCollab(${index})" style="display:none;">Save</button>
                <button class="btn btn-sm btn-danger" onclick="deleteCollab(${index})">Delete</button>
                <button class="btn btn-sm btn-warning" onclick="markCollabCompleted(${index})">Mark as Completed</button>
            `;
            collabList.appendChild(projectItem);
        }
    });
}

async function contactMember(contact) {
    const subject = encodeURIComponent("Collaboration Opportunity");
    const body = encodeURIComponent("Hi, I would like to discuss a potential collaboration with you.");
    window.location.href = `mailto:${contact}?subject=${subject}&body=${body}`;
}

async function editMember(index) {
    const row = teamList.rows[index];
    for (let i = 0; i < 5; i++) {
        row.cells[i].contentEditable = "true";
    }
    row.cells[5].querySelector('button[onclick^="editMember"]').style.display = "none";
    row.cells[5].querySelector('button[onclick^="saveMember"]').style.display = "inline";
}

async function saveMember(index) {
    const row = teamList.rows[index];
    const name = row.cells[0].innerText;
    const skills = row.cells[1].innerText;
    const needs = row.cells[2].innerText;
    const portfolio = row.cells[3].querySelector('a').innerText;
    const contact = row.cells[4].innerText;

    const docRef = doc(db, 'teamMembers', 'data');
    const docSnap = await getDoc(docRef);
    let teamMembers = [];
    if (docSnap.exists()) {
        teamMembers = docSnap.data().teamMembers;
    }
    teamMembers[index] = { name, skills, needs, portfolio, contact };

    await setDoc(docRef, { teamMembers });
    loadTeamMembers();
    showAlert('Member saved successfully!');
}

async function deleteMember(index) {
    const docRef = doc(db, 'teamMembers', 'data');
    const docSnap = await getDoc(docRef);
    let teamMembers = [];
    if (docSnap.exists()) {
        teamMembers = docSnap.data().teamMembers;
    }
    teamMembers.splice(index, 1);

    await setDoc(docRef, { teamMembers });
    loadTeamMembers();
    showAlert('Member deleted successfully!', 'danger');
}

async function addMember() {
    const name = document.getElementById('new-name').value;
    const skills = document.getElementById('new-skills').value;
    const needs = document.getElementById('new-needs').value;
    const portfolio = document.getElementById('new-portfolio').value;
    const contact = document.getElementById('new-contact').value;

    const docRef = doc(db, 'teamMembers', 'data');
    const docSnap = await getDoc(docRef);
    let teamMembers = [];
    if (docSnap.exists()) {
        teamMembers = docSnap.data().teamMembers;
    }
    teamMembers.push({ name, skills, needs, portfolio, contact });

    await setDoc(docRef, { teamMembers });
    loadTeamMembers();
    showAlert('Member added successfully!');
}

async function searchUsers() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const docRef = doc(db, 'teamMembers', 'data');
    const docSnap = await getDoc(docRef);
    let teamMembers = [];
    if (docSnap.exists()) {
        teamMembers = docSnap.data().teamMembers;
    }
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

// Task Management

async function populateTaskList(tasks) {
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

async function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const requester = document.getElementById('task-requester').value;
    const contact = document.getElementById('task-contact').value;

    const docRef = doc(db, 'tasks', 'data');
    const docSnap = await getDoc(docRef);
    let tasks = [];
    if (docSnap.exists()) {
        tasks = docSnap.data().tasks;
    }
    tasks.push({ title, description, requester, contact, completed: false });

    await setDoc(docRef, { tasks });
    loadTasks();
    showAlert('Task added successfully!');
}

async function editTask(index) {
    const taskItem = taskList.children[index];
    taskItem.querySelector('h3').contentEditable = "true";
    taskItem.querySelector('p').contentEditable = "true";
    taskItem.querySelector('button[onclick^="editTask"]').style.display = "none";
    taskItem.querySelector('button[onclick^="saveTask"]').style.display = "inline";
}

async function saveTask(index) {
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
    showAlert('Task saved successfully!');
}

async function markCollabCompleted(index) {
    collabProjects[index].completed = true;
    populateCollabList();
    populateCompletedCollabList();
    showAlert('Collaboration project marked as completed!');
}

async function deleteTask(index) {
    tasks.splice(index, 1);
    populateTaskList();
    showAlert('Task deleted successfully!', 'danger');
}

document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(e.target)) {
        addTask();
    }
});

// Collab Projects Management

async function populateCollabList() {
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

async function signUpForPosition(projectIndex, positionIndex){ 
    const memberName = prompt("Enter your name to sign up for this position:");
    if (memberName) {
        collabProjects[projectIndex].positions[positionIndex].member = memberName;
        populateCollabList();
        showAlert('Signed up for position successfully!');
}}

async function addCollab() {
    const title = document.getElementById('collab-title').value;
    const description = document.getElementById('collab-description').value;
    const positions = document.getElementById('collab-positions').value.split(',').map(pos => ({ name: pos.trim(), member: null }));

    collabProjects.push({ title, description, positions, steps: [], progress: 0 });
    populateCollabList();
    showAlert('Collaboration project added successfully!');
}

async function editCollab(index) {
    const projectItem = collabList.children[index];
    projectItem.querySelector('h3').contentEditable = "true";
    projectItem.querySelector('p').contentEditable = "true";
    projectItem.querySelector('button[onclick^="editCollab"]').style.display = "none";
    projectItem.querySelector('button[onclick^="saveCollab"]').style.display = "inline";
}

async function saveCollab(index) {
    const projectItem = collabList.children[index];
    const title = projectItem.querySelector('h3').innerText;
    const description = projectItem.querySelector('p').innerText;

    collabProjects[index].title = title;
    collabProjects[index].description = description;

    projectItem.querySelector('h3').contentEditable = "false";
    projectItem.querySelector('p').contentEditable = "false";
    projectItem.querySelector('button[onclick^="editCollab"]').style.display = "inline";
    projectItem.querySelector('button[onclick^="saveCollab"]').style.display = "none";
    showAlert('Collaboration project saved successfully!');
}

async function deleteCollab(index) {
    collabProjects.splice(index, 1);
    populateCollabList();
    showAlert('Collaboration project deleted successfully!', 'danger');
}

async function toggleStep(projectIndex, stepIndex) {
    collabProjects[projectIndex].steps[stepIndex].completed = !collabProjects[projectIndex].steps[stepIndex].completed;
    updateProgress(projectIndex);
    populateCollabList();
    showAlert('Step status updated!');
}

async function updateProgress(projectIndex) {
    const project = collabProjects[projectIndex];
    const completedSteps = project.steps.filter(step => step.completed).length;
    project.progress = (completedSteps / project.steps.length) * 100;
}

async function signUpForPosition(projectIndex, positionIndex) {
    const memberName = prompt("Enter your name to sign up for this position:");
    if (memberName) {
        collabProjects[projectIndex].positions[positionIndex].member = memberName;
        populateCollabList();
        showAlert('Signed up for position successfully!');
    }
}

async function editPosition(projectIndex, positionIndex) {
    const projectItem = collabList.children[projectIndex];
    const positionSpan = projectItem.querySelectorAll('span')[positionIndex];
    positionSpan.contentEditable = "true";
    projectItem.querySelectorAll('button[onclick^="editPosition"]')[positionIndex].style.display = "none";
    projectItem.querySelectorAll('button[onclick^="savePosition"]')[positionIndex].style.display = "inline";
}

async function savePosition(projectIndex, positionIndex) {
    const projectItem = collabList.children[projectIndex];
    const positionSpan = projectItem.querySelectorAll('span')[positionIndex];
    const positionName = positionSpan.innerText.split(' (')[0]; 
    
    // Remove any assigned member text
    collabProjects[projectIndex].positions[positionIndex].name = positionName;

    positionSpan.contentEditable = "false";
    projectItem.querySelectorAll('button[onclick^="editPosition"]')[positionIndex].style.display = "inline";
    projectItem.querySelectorAll('button[onclick^="savePosition"]')[positionIndex].style.display = "none";
    showAlert('Position saved successfully!');
}

async function markCollabCompleted(index) {
    collabProjects[index].completed = true;
    populateCollabList();
    populateCompletedCollabList();
    showAlert('Collaboration project marked as completed!');
}

async function populateCompletedCollabList() {
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

// Event Listeners 
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

document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelectorAll('table').forEach(table => table.classList.toggle('dark-mode'));
    document.querySelectorAll('th').forEach(th => th.classList.toggle('dark-mode'));
    document.querySelectorAll('td').forEach(td => td.classList.toggle('dark-mode'));
    document.querySelectorAll('button').forEach(button => button.classList.toggle('dark-mode'));
});

// Dark Mode Toggle Functionality
document.getElementById('dark-mode-toggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    document.querySelectorAll('table').forEach(table => table.classList.toggle('dark-mode'));
    document.querySelectorAll('th').forEach(th => th.classList.toggle('dark-mode'));
    document.querySelectorAll('td').forEach(td => td.classList.toggle('dark-mode'));
    document.querySelectorAll('button').forEach(button => button.classList.toggle('dark-mode'));
});
