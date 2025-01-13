// Member Data (Dynamic Addition)
const teamMembers = [
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

const teamList = document.getElementById("team-list");

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
    const contact = document.getElementById('new-contact').value;

    teamMembers.push({ name, skills, needs, portfolio, contact });
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
    addMember();
});
