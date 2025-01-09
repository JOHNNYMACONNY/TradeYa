// Member Data (Dynamic Addition)
const teamMembers = [
    { name: "Adrian", skills: "Logistics, Performing Music", needs: "Promotion, Event Coordination", portfolio: "#" },
    { name: "Izzy", skills: "Clothing Brand, Merch", needs: "Graphic Design", portfolio: "#" },
    { name: "TLOK", skills: "Engineering, Producing, Audio Edit", needs: "Mixing Mastering", portfolio: "#" },
    { name: "RJ", skills: "Setup, House Engineer, DJ", needs: "Event Planning", portfolio: "#" },
    { name: "Johnny Maconny", skills: "Audio Engineering, Podcast Editing", needs: "Web Development", portfolio: "#" },
    { name: "Benny", skills: "Filming, Editing, Radio Connections", needs: "Collaborative Projects", portfolio: "#" },
    { name: "Jaylon", skills: "Beatmaking, Admin, Promo", needs: "Marketing Assistance", portfolio: "#" },
    { name: "Greg", skills: "Music Production, Instrumentalist", needs: "Studio Space", portfolio: "#" },
    { name: "Juan", skills: "Accounting, Brand Development", needs: "Music Marketing", portfolio: "#" },
    { name: "Mike", skills: "Songwriting, Vlog Editing", needs: "Distribution Channels", portfolio: "#" },
    { name: "Thalita", skills: "Styling, Marketing Strategy", needs: "Portfolio Shoots", portfolio: "#" }
];

const teamList = document.getElementById("team-list");

function populateTeamTable() {
    teamList.innerHTML = ""; // Clear existing rows
    teamMembers.forEach((member, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td contenteditable="true">${member.name}</td>
            <td contenteditable="true">${member.skills}</td>
            <td contenteditable="true">${member.needs}</td>
            <td contenteditable="true"><a href="${member.portfolio}" target="_blank">View Portfolio</a></td>
            <td>
                <button onclick="contactMember('${member.name}')">Contact</button>
                <button onclick="editMember(${index})">Edit</button>
                <button onclick="deleteMember(${index})">Delete</button>
            </td>
        `;
        teamList.appendChild(row);
    });
}

function contactMember(name) {
    alert(`Contacting ${name}`);
}

function editMember(index) {
    const row = teamList.rows[index];
    const name = row.cells[0].innerText;
    const skills = row.cells[1].innerText;
    const needs = row.cells[2].innerText;
    const portfolio = row.cells[3].innerText;

    teamMembers[index] = { name, skills, needs, portfolio };
    populateTeamTable();
}

function deleteMember(index) {
    teamMembers.splice(index, 1);
    populateTeamTable();
}

function addMember() {
    const name = document.getElementById('new-name').value;
    const skills = document.getElementById('new-skills').value;
    const needs = document.getElementById('new-needs').value;
    const portfolio = document.getElementById('new-portfolio').value;

    teamMembers.push({ name, skills, needs, portfolio });
    populateTeamTable();
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
            <td contenteditable="true">${member.name}</td>
            <td contenteditable="true">${member.skills}</td>
            <td contenteditable="true">${member.needs}</td>
            <td contenteditable="true"><a href="${member.portfolio}" target="_blank">View Portfolio</a></td>
            <td>
                <button onclick="contactMember('${member.name}')">Contact</button>
                <button onclick="editMember(${index})">Edit</button>
                <button onclick="deleteMember(${index})">Delete</button>
            </td>
        `;
        teamList.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", populateTeamTable);

document.getElementById('add-member-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addMember();
});

// Task Management
const taskList = document.getElementById("task-list");

function populateTaskList() {
    taskList.innerHTML = ""; // Clear existing tasks
    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <h3 contenteditable="true">${task.title}</h3>
            <p contenteditable="true">${task.description}</p>
            <button onclick="markTaskCompleted(${index})">Mark as Completed</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    tasks.push({ title, description, completed: false });
    populateTaskList();
}

function markTaskCompleted(index) {
    tasks[index].completed = true;
    populateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    populateTaskList();
}

document.getElementById('add-task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addTask();
});

const tasks = [];
  
