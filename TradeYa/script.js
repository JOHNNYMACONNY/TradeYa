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
    teamMembers.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.skills}</td>
            <td>${member.needs}</td>
            <td><a href="${member.portfolio}" target="_blank">View Portfolio</a></td>
            <td><button onclick="contactMember('${member.name}')">Contact</button></td>
        `;
        teamList.appendChild(row);
    });
}

function contactMember(name) {
    alert(`Contacting ${name}`);
}

function searchUsers() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredMembers = teamMembers.filter(member =>
        member.skills.toLowerCase().includes(query) ||
        member.needs.toLowerCase().includes(query) ||
        member.name.toLowerCase().includes(query)
    );

    teamList.innerHTML = ""; // Clear existing rows
    filteredMembers.forEach(member => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.skills}</td>
            <td>${member.needs}</td>
            <td><a href="${member.portfolio}" target="_blank">View Portfolio</a></td>
            <td><button onclick="contactMember('${member.name}')">Contact</button></td>
        `;
        teamList.appendChild(row);
    });
}

document.addEventListener("DOMContentLoaded", populateTeamTable);
  