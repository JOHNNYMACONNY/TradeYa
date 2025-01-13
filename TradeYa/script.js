body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
}

header, footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px 0;
}

header h1, footer p {
    margin: 0;
}

.container {
    padding: 20px;
}

h1, h2, h3 {
    color: #333;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #f2f2f2;
}

tr:nth-child(even) {
    background-color: #f9f9f9;
}

tr:hover {
    background-color: #f1f1f1;
}

input[type="text"], input[type="email"] {
    width: calc(100% - 22px);
    padding: 10px;
    margin: 5px 0 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
}

button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    margin: 5px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

form {
    margin-bottom: 20px;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #fff;
    margin: 10px 0;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.progress-bar {
    width: 100%;
    background-color: #f3f3f3;
    border-radius: 4px;
    overflow: hidden;
    margin-top: 10px;
}

.progress-bar-fill {
    height: 20px;
    background-color: #4CAF50;
    width: 0;
    transition: width 0.5s;
}

/* Responsive Design */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }

    table, th, td {
        display: block;
        width: 100%;
    }

    th, td {
        padding: 10px;
        text-align: right;
    }

    th {
        background-color: #f2f2f2;
        text-align: left;
    }

    td {
        border: none;
        border-bottom: 1px solid #ddd;
    }

    td:before {
        content: attr(data-label);
        float: left;
        font-weight: bold;
    }

    input[type="text"], input[type="email"] {
        width: 100%;
    }

    button {
        width: 100%;
        padding: 15px;
    }
}
