<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collaboration Project Management</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="bg-dark text-white text-center py-3">
        <h1>Collaboration Project Management</h1>
    </header>
    <div class="container mt-4">
        <h2>Team Members</h2>
        <input type="text" id="search-bar" class="form-control mb-3" placeholder="Search members..." oninput="searchUsers()">
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Name</th>
                    <th>Skills</th>
                    <th>Needs</th>
                    <th>Portfolio</th>
                    <th>Contact</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="team-list"></tbody>
        </table>

        <h3>Add New Member</h3>
        <form id="add-member-form" class="mb-4">
            <input type="text" id="new-name" class="form-control mb-2" placeholder="Name" required>
            <input type="text" id="new-skills" class="form-control mb-2" placeholder="Skills" required>
            <input type="text" id="new-needs" class="form-control mb-2" placeholder="Needs" required>
            <input type="text" id="new-portfolio" class="form-control mb-2" placeholder="Portfolio URL" required>
            <input type="email" id="new-contact" class="form-control mb-2" placeholder="Contact Email" required>
            <button type="submit" class="btn btn-primary">Add Member</button>
        </form>

        <h2>Tasks</h2>
        <ul id="task-list" class="list-group mb-4"></ul>

        <h3>Add New Task</h3>
        <form id="add-task-form" class="mb-4">
            <input type="text" id="task-title" class="form-control mb-2" placeholder="Task Title" required>
            <input type="text" id="task-description" class="form-control mb-2" placeholder="Task Description" required>
            <input type="text" id="task-requester" class="form-control mb-2" placeholder="Requested by" required>
            <input type="email" id="task-contact" class="form-control mb-2" placeholder="Contact Email" required>
            <button type="submit" class="btn btn-primary">Add Task</button>
        </form>

        <h2>Collaboration Projects</h2>
        <ul id="collab-list" class="list-group mb-4"></ul>

        <h3>Add New Collaboration Project</h3>
        <form id="add-collab-form" class="mb-4">
            <input type="text" id="collab-title" class="form-control mb-2" placeholder="Project Title" required>
            <input type="text" id="collab-description" class="form-control mb-2" placeholder="Project Description" required>
            <input type="text" id="collab-positions" class="form-control mb-2" placeholder="Positions Needed (comma separated)" required>
            <button type="submit" class="btn btn-primary">Add Project</button>
        </form>
    </div>
    <footer class="bg-dark text-white text-center py-3">
        <p>&copy; 2023 Collaboration Project Management</p>
    </footer>
    <script src="script.js"></script>
</body>
</html>
