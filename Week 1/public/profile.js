let nameDisplay = document.getElementById('userNameDisplay');
let emailDisplay = document.getElementById('userEmailDisplay');
let logoutButton = document.getElementById('logoutBtn');


document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('/get-profile');
        const data = await response.json();

        if (response.ok) {
            nameDisplay.textContent = data.username;
            emailDisplay.textContent = data.email;
        } else {
            window.location.href = '/Login.html';
        }
    } catch (error) {
        console.error("Error loading profile:", error);
    }
});

document.getElementById('logoutBtn').addEventListener('click', async () => {
    const response = await fetch('/logout', { method: 'POST' });
    if (response.ok) {
        alert("You have been logged out.");
        window.location.href = '/Login.html';
    }
});


document.addEventListener('DOMContentLoaded', async () => {
    let profilePic = document.getElementById('profilePic');
    let nameDisplay = document.getElementById('userNameDisplay');
    let emailDisplay = document.getElementById('userEmailDisplay');

    try {
        const response = await fetch('/api/auth/get-profile');
        const data = await response.json();

        if (response.ok) {
            profilePic.src = data.profilePic;

            nameDisplay.textContent = data.username;
            emailDisplay.textContent = data.email;
        } else {
            window.location.href = "/login.html";
        }
    } catch (error) {
        console.error("Error fetching profile:", error);
    }
});
