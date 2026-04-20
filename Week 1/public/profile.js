let nameDisplay = document.getElementById('userNameDisplay');
let emailDisplay = document.getElementById('userEmailDisplay');
let logoutButton = document.getElementById('logoutBtn');
let deleteButton = document.getElementById('deleteAccBtn');
let chPassButton = document.getElementById('changePassBtn');
let chButtonDiv = document.getElementById('changeButtonDiv');
let chButton = document.getElementById('changePasswordButton');
let newpassField = document.getElementById('newPassword');
let passField = document.getElementById('passwordField');
let confirmPass = document.getElementById('confirmPasswordField');
let confirmPassDiv = document.getElementById('confirmPasswordDiv');
let lengthRules = document.getElementById('lengthRule');
let upperRules = document.getElementById('upperRule');
let lowerRules = document.getElementById('lowerRule');
let numericRules = document.getElementById('numberRule');
let specialRules = document.getElementById('specialRule');
let passSuggestions = document.getElementById('passwordSuggestions');
let lengthIcons = document.getElementById('lengthIcon');
let upperIcons = document.getElementById('upperIcon');
let lowerIcons = document.getElementById('lowerIcon');
let numericIcons = document.getElementById('numericIcon');
let specialIcons = document.getElementById('specialIcon');
let strengthIcons = document.getElementById('strengthIcon');
let matchIcons = document.getElementById('matchIcon');
let passMatch =  document.getElementById('passwordMatchDiv');
let passMatchStatus = document.getElementById('passwordMatch');
let strong = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
let newPasswordForm = document.getElementById('passwordForm');

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



if (deleteButton) {
    deleteButton.addEventListener('click', async () => {
        const confirmed = confirm("Are you sure you want to delete your account? This action cannot be undone.");
        
        if (confirmed) {
            try {
                const response = await fetch('/delete-account', { method: 'DELETE' });

                if (response.ok) {
                    alert("Account deleted successfully.");
                    window.location.href = '/Signup.html';
                } else {
                    const errorData = await response.json();
                    alert("Error: " + errorData.message);
                }
            } catch (error) {
                console.error("Delete Error:", error);
                alert("Could not connect to server.");
            }
        }
    });
}

chPassButton.addEventListener("click",function(){
    newpassField.classList.remove("hiddenTag");
    chButtonDiv.classList.remove("hiddenTag");
    chButton.classList.remove("hiddenTag")
});

passField.addEventListener("click",function(){
    passSuggestions.style.display = "block";
});
passField.addEventListener("",function(){
    passSuggestions.style.display = "block";
});
confirmPass.addEventListener("click",function(){
    passSuggestions.style.display = "none";
    
});
confirmPass.addEventListener("keyup",function(){
    
    confirmPassDiv.style.marginBottom = 'clamp(1rem,1.5vh,4rem)';
    passMatch.classList.remove("hiddenTag");
    matchCheck( passField.value , confirmPass.value);
});
passField.addEventListener("keyup",function(){
    
    showSuggestion(passField.value);
});

function showSuggestion(userPassword)
{   

    if( userPassword.length >= 8 )
    {
        lengthRules.classList.remove("invalid");
        lengthRules.classList.add("valid");
        lengthIcons.setAttribute( "src" , "./Assets/tick-circle.svg");

    }
    else
    {
        lengthIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
        lengthRules.classList.remove("valid");
        lengthRules.classList.add("invalid");   
    } 
    if(/[A-Z]/.test(userPassword) === true)
    {
       upperRules.classList.remove("invalid");
       upperRules.classList.add("valid");
       upperIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
    }
    else
    {
        upperRules.classList.remove("valid");
        upperRules.classList.add("invalid");   
        upperIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    } 
    if(/[a-z]/.test(userPassword) === true)
    {
       lowerRules.classList.remove("invalid");
       lowerRules.classList.add("valid");
       lowerIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
    }
    else
    {
        lowerRules.classList.remove("valid");
        lowerRules.classList.add("invalid");   
        lowerIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    } 
    if(/[0-9]/.test(userPassword) === true)
    {
        numericRules.classList.remove("invalid");
        numericRules.classList.add("valid");
        numericIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
    }
    else
    {
        numericRules.classList.remove("valid");
        numericRules.classList.add("invalid");   
        numericIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    } 
    if(/[!@#$%^&*]/.test(userPassword) === true)
    {
        specialRules.classList.remove("invalid");
        specialRules.classList.add("valid");
        specialIcons.setAttribute( "src" , "./Assets/tick-circle.svg");

    }
    else
    {
        specialRules.classList.remove("valid");
        specialRules.classList.add("invalid");   
        specialIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    } 

    if (strong.test(userPassword))
    {
        document.getElementById('strengthDiv').classList.remove("easy");
        document.getElementById('strengthDiv').classList.remove("medium");
        document.getElementById('strengthDiv').classList.add("strong");
        strengthIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
        document.getElementById("passwordStrength").textContent = "Strong Password ";
        confirmPassDiv.classList.remove("hiddenTag");

    }
    else
    {
        document.getElementById('strengthDiv').classList.remove("strong");
        document.getElementById('strengthDiv').classList.add("weak");
        strengthIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
        document.getElementById("passwordStrength").textContent = "Weak Password";
        confirmPassDiv.classList.add("hiddenTag");
    }
}

function matchCheck(userPassword, confirmPassword)
{
  if (userPassword === confirmPassword)
  {
    passMatch.classList.remove("invalid");
    passMatch.classList.add("valid");
    matchIcons.setAttribute( "src" , "./Assets/tick-circle.svg");
    passMatchStatus.textContent = "Password is matched";
  }
  else
  {
    passMatch.classList.remove("valid");
    passMatch.classList.add("invalid");
    matchIcons.setAttribute( "src" , "./Assets/cross-circle.svg");
    passMatchStatus.textContent = "Password is not matched";
  }
}

newPasswordForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newPassword = passField.value;
    const confirmPassword = confirmPass.value;

    if (!strong.test(newPassword)) {
        alert("Password does not meet strength requirements.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

   
    try {
        const response = await fetch('/change-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newPassword: newPassword })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Password updated successfully!");
            
           
            newPasswordForm.reset();
            newpassField.classList.add("hiddenTag");
            chButtonDiv.classList.add("hiddenTag");
            passSuggestions.style.display = "none";
        } else {
            alert("Error: " + result.message);
        }
    } catch (error) {
        console.error("Update Error:", error);
        alert("Could not connect to server.");
    }
});


