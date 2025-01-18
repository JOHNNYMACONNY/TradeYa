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

// Populate Task List
function populateTaskList(tasks) {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = ""; // Clear existing tasks
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.className = "list-group-item";
        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Requested by: ${task.requester}</p>
            <p>Contact: ${task.contact}</p>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="saveTask(${index})" style="display:none;">Save</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Populate Collaboration Projects List
function populateCollabList(collabProjects) {
    const collabList = document.getElementById("collab-list");
    collabList.innerHTML = ""; // Clear existing projects
    collabProjects.forEach((project, index) => {
        const projectItem = document.createElement("li");
        projectItem.className = "list-group-item";
        projectItem.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p>Positions Needed: ${project.positions.map(pos => pos.name).join(', ')}</p>
            <button onclick="editCollab(${index})">Edit</button>
            <button onclick="saveCollab(${index})" style="display:none;">Save</button>
            <button onclick="deleteCollab(${index})">Delete</button>
        `;
        collabList.appendChild(projectItem);
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

// Define searchUsers function
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

    const teamList = document.getElementById("team-list");
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
