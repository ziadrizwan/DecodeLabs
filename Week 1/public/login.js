let form = document.getElementById('LoginForm');
let errorDiv = document.getElementById('error-message');
let userEmail = document.getElementById('emailField');
let passField = document.getElementById('passwordField');
let loginForm =document.getElementById('formInner');

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    errorDiv.textContent = "";

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            alert(result.message);
            window.location.href = '/profile.html'; 
        } else {
            errorDiv.textContent = result.message;
            errorDiv.classList.remove("errorPop");
            errorDiv.classList.add("errorPopActive");
        }
    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
});
